import { VNode } from "preact"
import { useEffect, useState } from "preact/hooks"
import { html } from "htm/preact"

import { VNodeKey } from "../../../../z_external/preact/common"

import {
    reportFolio,
    reportFooter,
    reportHeader,
    reportTitle,
    reportTitle_small,
    reportTitle_xSmall,
    report_a4_portrait,
} from "../../../../z_external/getto-css/preact/design/print"
import {
    TableDataColumnRow,
    TableDataFooterRow,
    TableDataHeaderRow,
    TableDataSummaryRow,
    TableStructure,
} from "../../../../z_external/getto-table/preact/core"
import { tableStructure } from "../../../../z_external/getto-table/preact/cell/structure"
import { tableCell } from "../../../../z_external/getto-table/preact/cell/simple"
import { tableAlign, tableClassName } from "../../../../z_external/getto-table/preact/decorator"
import { TableDataSticky } from "../../../../z_external/getto-table/preact/style"

import {
    linky,
    tableColumn,
    tableFooter,
    tableHeader,
    tableSummary,
    table_small_fill,
    tbody,
    tfoot,
    thead,
} from "../../../../z_external/getto-css/preact/design/data"
import { small } from "../../../../z_external/getto-css/preact/design/alignment"

import { Model, Row } from "./data"

type Props = {
    content: Readonly<{
        sticky: TableDataSticky
        header: TableDataHeaderRow
        summary: TableDataSummaryRow
        footer: TableDataFooterRow
    }>
    rows: Row[]
    column: { (row: Row): TableDataColumnRow }
}
export function Content({ content, column, rows }: Props): VNode {
    type ReportComposition = Readonly<{
        pagedRows: Row[][]
        composeIndex: number
    }>

    const [data, setData] = useState<ReportComposition>({ pagedRows: [rows], composeIndex: 0 })
    useEffect(() => {
        const nextComposition = compose()
        if (nextComposition.hasNext) {
            setData(nextComposition.data)
        }

        type ComposeInfo = Readonly<{ rowChanged: number; currentKey: CurrentKey }>
        type CurrentKey =
            | Readonly<{ type: "initial" }>
            | Readonly<{ type: "focused"; key: VNodeKey }>
            | Readonly<{ type: "notFound" }>
        type NextComposition =
            | Readonly<{ hasNext: false }>
            | Readonly<{ hasNext: true; data: ReportComposition }>

        function compose(): NextComposition {
            type MarkerOffset = Readonly<{ found: false }> | Readonly<{ found: true; offset: number }>

            // composeIndex のページの tr を検査
            const page = document.getElementById(`__css__print__report_${data.composeIndex}`)
            if (!page) {
                return { hasNext: false }
            }

            let info: ComposeInfo = { rowChanged: 0, currentKey: { type: "initial" } }

            const marker = findMarker(page)
            if (!marker.found) {
                return { hasNext: false }
            }

            let headerHeight = 0
            const tableHeaders = page.getElementsByTagName("tfoot")
            for (const element of tableHeaders) {
                headerHeight += element.offsetHeight
            }

            let footerHeight = 0
            const tableFooters = page.getElementsByTagName("tfoot")
            for (const element of tableFooters) {
                footerHeight += element.offsetHeight
            }

            const tableBodies = page.getElementsByTagName("tbody")
            for (const body of tableBodies) {
                const tableRows = body.getElementsByTagName("tr")
                for (const tr of tableRows) {
                    // tr の data-root-key を取り出してそれが変更されたら rowChanged をインクリメント
                    const key = tr.getAttribute("data-root-key")
                    if (!key) {
                        info = { rowChanged: info.rowChanged, currentKey: { type: "notFound" } }
                    } else {
                        switch (info.currentKey.type) {
                            case "initial":
                                info = {
                                    rowChanged: info.rowChanged,
                                    currentKey: { type: "focused", key },
                                }
                                break

                            case "notFound":
                                info = {
                                    rowChanged: info.rowChanged + 1,
                                    currentKey: { type: "focused", key },
                                }
                                break

                            case "focused":
                                if (key !== info.currentKey.key) {
                                    info = {
                                        rowChanged: info.rowChanged + 1,
                                        currentKey: { type: "focused", key },
                                    }
                                }
                                break
                        }
                    }

                    if (
                        footerHeight + body.offsetTop + tr.offsetTop + tr.offsetHeight - headerHeight >
                        marker.offset
                    ) {
                        // tr 全体が収まっていなかった場合、
                        // pagedRows を分割して composeIndex に rowChanged をセット
                        return {
                            hasNext: true,
                            data: {
                                pagedRows: [
                                    ...data.pagedRows.slice(0, -1),
                                    ...splitRows(data.pagedRows[data.pagedRows.length - 1]),
                                ],
                                composeIndex: data.composeIndex + 1,
                            },
                        }
                    }
                }
            }

            return { hasNext: false }

            function findMarker(page: HTMLElement): MarkerOffset {
                const markers = page.getElementsByClassName("report__contentLimit__mark")
                for (const marker of markers) {
                    if (marker instanceof HTMLElement) {
                        return {
                            found: true,
                            offset: marker.offsetHeight - headerHeight(),
                        }
                    }
                }
                return { found: false }

                function headerHeight() {
                    const reportHeader = document.getElementById(
                        `__css__print__reportHeader_${data.composeIndex}`
                    )
                    if (!reportHeader) {
                        return 0
                    }
                    return reportHeader.offsetHeight
                }
            }

            function splitRows(rows: Row[]): Row[][] {
                // ただし、rowChanged が 0 の場合は少なくとも 1行を pagedRows に含める
                const index = sliceIndex()
                return [rows.slice(0, index), rows.slice(index)]

                function sliceIndex(): number {
                    return Math.max(1, info.rowChanged)
                }
            }
        }
    }, [data])

    return html`${data.pagedRows.map(reportPage)}`

    function reportPage(pagedRows: Row[], index: number): VNode {
        const dataLength = pagedRows.length
        return report_a4_portrait({
            index: index,
            header: reportHeader(title()),
            body: table_small_fill(content.sticky, [
                thead([
                    ...tableHeader({ ...content, singleLastBorderBottom: hasSummary() }),
                    ...summary(),
                ]),
                tbody(
                    pagedRows.flatMap((row, index) =>
                        tableColumn({
                            ...content,
                            column: column(row),
                            noLastBorderBottom: index === dataLength - 1,
                        })
                    )
                ),
                tfoot(tableFooter(content)),
            ]),
            footer: footer(index),
        })

        function title() {
            switch (index) {
                case 0:
                    return [
                        reportTitle({ style: "center", title: "作業申請書" }),
                        html`<section>追加のヘッダ要素</section>`,
                        html`<section>追加のヘッダ要素</section>`,
                        html`<section>追加のヘッダ要素</section>`,
                        html`<section>追加のヘッダ要素</section>`,
                        html`<section>追加のヘッダ要素</section>`,
                        html`<section>追加のヘッダ要素</section>`,
                        html`<section>追加のヘッダ要素</section>`,
                        html`<section>追加のヘッダ要素</section>`,
                    ]

                case 1:
                    return reportTitle_small({ style: "center", title: "作業申請書" })

                default:
                    return reportTitle_xSmall({ style: "left", title: "作業申請書" })
            }
        }

        function hasSummary() {
            return index === 0
        }
        function summary() {
            if (!hasSummary()) {
                return []
            }
            return tableSummary(content)
        }
    }

    function footer(index: number) {
        return reportFooter({
            left: reportFolio("作成日: 2020/06/19"),
            right: reportFolio(`${index + 1} / ${data.pagedRows.length}ページ`),
        })
    }
}

export const buildStructure = (): TableStructure<Model, Row> =>
    tableStructure({
        key: (row: Row) => row.id,
        cells: [
            tableCell("id", (_key) => {
                return {
                    label: () => "ID",
                    header: linky,
                    column: (row: Row) => row.id,
                }
            }).border(["rightDouble"]),

            tableCell("name", (_key) => {
                return {
                    label: () => "名前",
                    header: linky,
                    column: (row: Row) => row.name,
                }
            }),

            tableCell("email", (_key) => {
                return {
                    label: () => "メールアドレス",
                    header: linky,
                    column: (row: Row) => row.email,
                }
            }),

            tableCell("price", (_key) => {
                return {
                    label: () => "価格",
                    header: linky,
                    column: (row: Row) => formatPrice(row.price),
                    summary: (model: Model) => formatPrice(model.sumPrice),
                    footer: (model: Model) => formatPrice(model.sumPrice),
                }
            })
                .decorateSummary(tableAlign(["numeric"]))
                .decorateFooter(tableAlign(["numeric"]))
                .decorateColumn(tableAlign(["numeric"])),

            tableCell("updatedAt", (_key) => {
                return {
                    label: () => "更新日時",
                    header: linky,
                    column: (row: Row) => small(row.updatedAt),
                }
            }),
        ],
    })
        .decorateRow(tableClassName(["row_hover"]))
        .stickyCross(1)
        .freeze()

function formatPrice(price: number) {
    return Intl.NumberFormat("ja-JP").format(price)
}
