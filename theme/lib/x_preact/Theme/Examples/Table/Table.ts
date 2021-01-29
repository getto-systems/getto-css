import { VNode } from "preact"
import { html } from "htm/preact"

import { icon } from "../../../common/icon"

import {
    TableDataColumnRow,
    TableDataHeaderRow,
    TableStructure,
} from "../../../../z_external/getto-table/preact/core"
import { tableStructure } from "../../../../z_external/getto-table/preact/cell/structure"
import { tableCell } from "../../../../z_external/getto-table/preact/cell/single"
import { TableDataSticky } from "../../../../z_external/getto-table/preact/style"
import { tableAlign, tableClassName } from "../../../../z_external/getto-table/preact/decorator"

import {
    table,
    tableHeader,
    tableColumn,
    thead,
    tbody,
    linky,
    SortLink,
} from "../../../../z_external/getto-css/preact/design/data"
import { label_gray, label_warning } from "../../../../z_external/getto-css/preact/design/highlight"
import { small } from "../../../../z_external/getto-css/preact/design/alignment"

import { Model, Row } from "./data"
import { tableCell_group } from "../../../../z_external/getto-table/preact/cell/group"

type Props = Readonly<{
    content: Readonly<{
        sticky: TableDataSticky
        header: TableDataHeaderRow
    }>
    rows: Row[]
    column: { (row: Row): TableDataColumnRow }
}>
export function Table({ content, column, rows }: Props): VNode {
    return table(content.sticky, [
        thead(tableHeader(content)),
        tbody(rows.flatMap((row) => tableColumn({ ...content, column: column(row) }))),
    ])
}

export const buildStructure = (sort: SortLink) => (): TableStructure<Model, Row> =>
    tableStructure({
        key: (row: Row) => row.id,
        cells: [
            tableCell("id", (key) => {
                return {
                    label: () => "ID",
                    header: sort(key),
                    column: (row: Row) => row.id,
                }
            }).border(["rightDouble"]),

            tableCell_group({
                key: "base",
                header: () => linky("基本情報"),
                cells: [
                    tableCell_group({
                        key: "accountInfo",
                        header: () => linky("基本"),
                        cells: [
                            tableCell("name", (key) => {
                                return {
                                    label: () => "名前",
                                    header: sort(key),
                                    column: (row: Row) => row.name,
                                }
                            }).border(["right"]),
                        ],
                    }),

                    tableCell("state", (key) => {
                        return {
                            label: () => "状態",
                            header: sort(key),
                            column: (row: Row) => stateLabel(row.state),
                        }
                    })
                        .border(["right"])
                        .decorateColumn(tableAlign(["center"])),
                ],
            }),

            tableCell_group({
                key: "hostInfo",
                header: () => linky("ホスト情報"),
                cells: [
                    tableCell_group({
                        key: "accountInfo",
                        header: () => linky("アカウント情報"),
                        cells: [
                            tableCell_group({
                                key: "accountInfo",
                                header: () => linky("基本情報"),
                                cells: [
                                    tableCell("host", (key) => {
                                        return {
                                            label: () => "ホスト",
                                            header: sort(key),
                                            column: (row: Row) => row.host,
                                        }
                                    }).border(["right"]),
                                ],
                            }),

                            tableCell("account", (key) => {
                                return {
                                    label: () => "アカウント",
                                    header: sort(key),
                                    column: (row: Row) => row.account,
                                }
                            }).border(["right"]),
                        ],
                    }),

                    tableCell("price", (key) => {
                        return {
                            label: () => "価格",
                            header: sort(key),
                            column: (row: Row) => formatPrice(row.price),
                        }
                    })
                        .border(["rightDouble"])
                        .decorateColumn(tableAlign(["numeric"])),
                ],
            }),

            tableCell("updatedAt", (key) => {
                return {
                    label: () => "更新日時",
                    header: sort(key),
                    column: (row: Row) => small(row.updatedAt),
                }
            }),

            tableCell("memo", (_key) => {
                return {
                    label: () => "メモ",
                    header: linky,
                    column: (row: Row) => row.memo,
                }
            }),

            tableCell("formalName", (_key) => {
                return {
                    label: () => "正式名称",
                    header: linky,
                    column: (_row: Row) => "名称",
                }
            }),

            tableCell("tel", (_key) => {
                return {
                    label: () => "問い合わせ電話番号",
                    header: linky,
                    column: (_row: Row) => "tel",
                }
            }),

            tableCell("edit", (_key) => {
                return {
                    label: () => "",
                    header: linky,
                    column: (_row: Row) => html`<a href="#">${icon("pencil")} 編集</a>`,
                }
            })
                .alwaysVisible()
                .border(["left"]),
        ],
    })
        .decorateRow(tableClassName(["row_hover"]))
        .stickyCross(1)
        .freeze()

function stateLabel(state: string) {
    switch (state) {
        case "仮":
            return label_gray(state)

        default:
            return label_warning(state)
    }
}

function formatPrice(price: number) {
    return Intl.NumberFormat("ja-JP").format(price)
}
