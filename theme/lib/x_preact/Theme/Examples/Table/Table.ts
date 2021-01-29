import { VNode } from "preact"

import {
    tableCells,
    TableDataCellBuilder,
    TableDataColumnRow,
    TableDataHeaderRow,
    TableStructure,
} from "../../../../z_external/getto-table/preact/core"
import { tableStructure } from "../../../../z_external/getto-table/preact/cell/structure"
import { TableDataSticky } from "../../../../z_external/getto-table/preact/style"
import { tableCell } from "../../../../z_external/getto-table/preact/cell/single"
import { tableCell_group } from "../../../../z_external/getto-table/preact/cell/group"
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
import {
    label_gray,
    label_success,
    label_warning,
} from "../../../../z_external/getto-css/preact/design/highlight"
import { small } from "../../../../z_external/getto-css/preact/design/alignment"

import { Article, ArticleComment, Log, Model, Row, TemperatureType } from "./data"
import { tableCell_expansion } from "../../../../z_external/getto-table/preact/cell/expansion"
import { tableCell_multipart } from "../../../../z_external/getto-table/preact/cell/multipart"
import { tableCell_tree } from "../../../../z_external/getto-table/preact/cell/tree"

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
        tbody(rows.flatMap((row) => tableColumn({ sticky: content.sticky, column: column(row) }))),
    ])
}

const cells: TableDataCellBuilder<Model, Row> = tableCells
const logCells: TableDataCellBuilder<Model, Log> = tableCells
const articleCells: TableDataCellBuilder<Model, Article> = tableCells
const commentCells: TableDataCellBuilder<Model, ArticleComment> = tableCells
export const buildStructure = (sort: SortLink) => (): TableStructure<Model, Row> =>
    tableStructure({
        key: (row: Row) => row.row_id,
        cells: cells([
            tableCell("id", (key) => {
                return {
                    label: () => "ID",
                    header: sort(key),
                    column: (row: Row) => row.row_id,
                }
            }).border(["rightDouble"]),

            tableCell_group({
                key: "base",
                header: () => linky("基本情報"),
                cells: cells([
                    tableCell("name", (key) => {
                        return {
                            label: () => "名前",
                            header: sort(key),
                            column: (row: Row) => row.name,
                        }
                    }),

                    tableCell("state", (key) => {
                        return {
                            label: () => "状態",
                            header: sort(key),
                            column: (row: Row) => stateLabel(row.state),
                        }
                    })
                        .border(["rightDouble"])
                        .decorateColumn(tableAlign(["center"])),
                ]),
            }),

            tableCell_group({
                key: "hostInfo",
                header: () => linky("ホスト情報"),
                cells: cells([
                    tableCell_group({
                        key: "accountInfo",
                        header: () => linky("アカウント情報"),
                        cells: cells([
                            tableCell_group({
                                key: "accountInfo",
                                header: () => linky("基本情報"),
                                cells: cells([
                                    tableCell("host", (key) => {
                                        return {
                                            label: () => "ホスト",
                                            header: sort(key),
                                            column: (row: Row) => row.host,
                                        }
                                    }).border(["right"]),
                                ]),
                            }),

                            tableCell("account", (key) => {
                                return {
                                    label: () => "アカウント",
                                    header: sort(key),
                                    column: (row: Row) => row.account,
                                }
                            }).border(["right"]),
                        ]),
                    }),

                    tableCell_group({
                        key: "purchaseInfo",
                        header: () => linky("価格情報"),
                        cells: cells([
                            tableCell("price", (key) => {
                                return {
                                    label: () => "価格",
                                    header: sort(key),
                                    column: (row: Row) => formatPrice(row.price),
                                }
                            })
                                .border(["rightDouble"])
                                .decorateColumn(tableAlign(["numeric"])),
                        ]),
                    }),
                ]),
            }),

            tableCell_expansion("alarms", (_key) => {
                return {
                    label: () => "アラーム",
                    header: linky,
                    column: (row: Row) => row.alarms,
                    length: (model: Model) => model.alarmMaxLength,
                }
            }).border(["right"]),

            tableCell_multipart({
                data: (model: Model) => model.temperatureTypes,
                cells: (temperatureType: TemperatureType) =>
                    cells([
                        tableCell("updatedAt", (_key) => {
                            return {
                                label: () => temperatureLabel(temperatureType),
                                header: linky,
                                column: (row: Row) => formatPrice(row.amounts[temperatureType]),
                            }
                        }).decorateColumn(tableAlign(["numeric"])),
                    ]),
            }),

            tableCell_tree({
                data: (row: Row, model: Model) => model.logs[row.row_id],
                key: (log: Log) => log.log_id,
                cells: logCells([
                    tableCell("log_id", (_key) => {
                        return {
                            label: () => "ログID",
                            header: linky,
                            column: (log: Log) => log.log_id,
                        }
                    }).border(["left"]),

                    tableCell("loggedAt", (_key) => {
                        return {
                            label: () => "ログ時刻",
                            header: linky,
                            column: (log: Log) => small(log.loggedAt),
                        }
                    }),
                ]),
            }),

            tableCell_tree({
                data: (row: Row) => row.articles,
                key: (article: Article) => article.title,
                cells: articleCells([
                    tableCell("article", (_key) => {
                        return {
                            label: () => "記事",
                            header: linky,
                            column: (article: Article) => article.title,
                        }
                    }).border(["left"]),

                    tableCell_tree({
                        data: (article: Article) => article.comments,
                        key: (comment: ArticleComment) => comment,
                        cells: commentCells([
                            tableCell<Model, ArticleComment>("comment", (_key) => {
                                return {
                                    label: () => "コメント",
                                    header: linky,
                                    column: (comment: ArticleComment) => comment,
                                }
                            }).border(["left"]),
                        ]),
                    }),
                ]),
            }),

            tableCell("updatedAt", (key) => {
                return {
                    label: () => "更新日時",
                    header: sort(key),
                    column: (row: Row) => small(row.updatedAt),
                }
            }).border(["left"]),

            tableCell("memo", (_key) => {
                return {
                    label: () => "メモ",
                    header: linky,
                    column: (row: Row) => row.memo,
                }
            }),
        ]),
    })
        .decorateRow(tableClassName(["row_hover"]))
        .stickyCross(1)
        .freeze()

function stateLabel(state: string) {
    switch (state) {
        case "仮":
            return label_gray(state)

        case "完了":
            return label_success(state)

        default:
            return label_warning(state)
    }
}

function temperatureLabel(type: TemperatureType): string {
    switch (type) {
        case "high":
            return "常温"

        case "low":
            return "冷蔵"
    }
}

function formatPrice(price: number) {
    return Intl.NumberFormat("ja-JP").format(price)
}
