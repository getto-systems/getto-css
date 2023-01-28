import { VNode } from "preact"
import { html } from "htm/preact"

import { useReportRowsComposition } from "../../../../../z_vendor/getto-css/preact/design/hooks/print/compose"

import {
    reportFolio,
    reportFolios,
    reportTitle,
    reportTitle_small,
    reportTitle_xSmall,
    report_a4_portrait,
} from "../../../../../z_vendor/getto-css/preact/design/print"
import {
    TableDataColumnRow,
    TableDataFooterRow,
    TableDataHeaderRow,
    TableDataSummaryRow,
    TableStructure,
} from "../../../../../z_vendor/getto-table/preact/core"
import { tableStructure } from "../../../../../z_vendor/getto-table/preact/cell/structure"
import { tableCell } from "../../../../../z_vendor/getto-table/preact/cell/simple"
import { tableAlign, tableClassName } from "../../../../../z_vendor/getto-table/preact/decorator"
import { TableDataSticky } from "../../../../../z_vendor/getto-table/preact/style"

import {
    tableColumn,
    tableFooter,
    tableHeader,
    tableSummary,
    table_small_fill,
    tbody,
    tfoot,
    thead,
} from "../../../../../z_vendor/getto-css/preact/design/table"
import { small } from "../../../../../z_vendor/getto-css/preact/design/alignment"

import { Model, Row } from "./data"
import { TableCell } from "../../../../../z_vendor/getto-table/preact/cell"
import { tableCell_tree } from "../../../../../z_vendor/getto-table/preact/cell/tree"
import { linky } from "../../../../../z_vendor/getto-css/preact/design/highlight"

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
export function ReportContentComponent({ content, column, rows }: Props): VNode {
    const pageID = (index: number) => `__css__print__report_${index}`

    const data = useReportRowsComposition(rows, {
        root: (index: number) => document.getElementById(pageID(index)),
        rowKey: (tr: HTMLTableRowElement) => tr.getAttribute("data-root-key"),
    })

    return html`${data.pagedRows.map((rows, index) => reportPage(rows, index))}`

    function reportPage(pagedRows: readonly Row[], index: number): VNode {
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
                        }),
                    ),
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
export const buildReportStructure = (): TableStructure<Model, Row> => {
    return tableStructure(key, <Cells<Row>[]>[
        tableCell("id", (_key) => ({
            label: "ID",
            header: linky,
            column: id,
        })).border(["rightDouble"]),

        tableCell("name", (_key) => ({
            label: "名前",
            header: linky,
            column: name,
        })),

        tableCell("email", (_key) => ({
            label: "メールアドレス",
            header: linky,
            column: email,
        })),

        tableCell_tree({
            data: (row: Row) => row.price,
            key: (price: number) => price,
            cells: <Cells<number>[]>[
                tableCell("price", (_key) => ({
                    label: "価格",
                    header: linky,
                    column: price,
                    summary: sumPrice,
                    footer: sumPrice,
                }))
                    .decorateSummary(tableAlign(["numeric"]))
                    .decorateFooter(tableAlign(["numeric"]))
                    .decorateColumn(tableAlign(["numeric"])),
            ],
        }),

        tableCell("updatedAt", (_key) => ({
            label: "更新日時",
            header: linky,
            column: updatedAt,
        })),
    ])
        .decorateRow(tableClassName(["row_hover"]))
        .stickyCross(1)
        .freeze()

    function key(row: Row): number {
        return row.id
    }

    function id(row: Row): number {
        return row.id
    }
    function name(row: Row): string {
        return row.name
    }
    function email(row: Row): string {
        return row.email
    }
    function updatedAt(row: Row): VNode {
        return small(row.updatedAt)
    }

    function price(price: number): string {
        return formatPrice(price)
    }

    function sumPrice(model: Model): string {
        return formatPrice(model.sumPrice)
    }
}

function formatPrice(price: number): string {
    return Intl.NumberFormat("ja-JP").format(price)
}
