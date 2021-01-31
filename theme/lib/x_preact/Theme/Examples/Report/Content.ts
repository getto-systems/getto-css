import { VNode } from "preact"
import { html } from "htm/preact"

import { useReportRowsComposition } from "../../../../z_external/getto-css/preact/design/hooks/print/compose"

import {
    reportFolio,
    reportFolios,
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
import { TableCell } from "../../../../z_external/getto-table/preact/cell"
import { tableCell_tree } from "../../../../z_external/getto-table/preact/cell/tree"

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
    const pageID = (index: number) => `__css__print__report_${index}`

    const data = useReportRowsComposition(rows, {
        root: (index: number) => document.getElementById(pageID(index)),
        rowKey: (tr: HTMLTableRowElement) => tr.getAttribute("data-root-key"),
    })

    return html`${data.pagedRows.map(reportPage)}`

    function reportPage(pagedRows: Row[], index: number): VNode {
        const dataLength = pagedRows.length
        return report_a4_portrait({
            id: pageID(index),
            header: title(),
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
            footer: reportFolios({
                left: reportFolio("作成日: 2020/06/19"),
                right: reportFolio(`${index + 1} / ${data.pagedRows.length}ページ`),
            }),
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
}

type Cells<R> = TableCell<Model, R>
export const buildStructure = (): TableStructure<Model, Row> =>
    tableStructure({
        key: (row: Row) => row.id,
        cells: <Cells<Row>[]>[
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

            tableCell_tree({
                data: (row: Row) => row.price,
                key: (price: number) => price,                
                cells: <Cells<number>[]>[
                    tableCell("price", (_key) => {
                        return {
                            label: () => "価格",
                            header: linky,
                            column: (price: number) => formatPrice(price),
                            summary: (model: Model) => formatPrice(model.sumPrice),
                            footer: (model: Model) => formatPrice(model.sumPrice),
                        }
                    })
                        .decorateSummary(tableAlign(["numeric"]))
                        .decorateFooter(tableAlign(["numeric"]))
                        .decorateColumn(tableAlign(["numeric"])),
                ],
            }),

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
