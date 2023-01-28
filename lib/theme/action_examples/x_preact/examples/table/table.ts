import { VNode } from "preact"

import {
    TableDataColumnRow,
    TableDataFooterRow,
    TableDataHeaderRow,
    TableDataSummaryRow,
    TableStructure,
} from "../../../../../z_vendor/getto-table/preact/core"
import { tableStructure } from "../../../../../z_vendor/getto-table/preact/cell/structure"
import { TableDataSticky } from "../../../../../z_vendor/getto-table/preact/style"
import { tableCell } from "../../../../../z_vendor/getto-table/preact/cell/simple"
import { tableCell_group } from "../../../../../z_vendor/getto-table/preact/cell/group"
import { tableAlign, tableClassName } from "../../../../../z_vendor/getto-table/preact/decorator"

import {
    table,
    tableHeader,
    tableColumn,
    thead,
    tbody,
    SortLink,
    tableSummary,
    tfoot,
    tableFooter,
} from "../../../../../z_vendor/getto-css/preact/design/table"
import {
    label_gray,
    label_success,
    label_warning,
    linky,
} from "../../../../../z_vendor/getto-css/preact/design/highlight"
import { small } from "../../../../../z_vendor/getto-css/preact/design/alignment"

import { Article, ArticleComment, Log, Model, Row, TemperatureType } from "./data"
import { tableCell_expansion } from "../../../../../z_vendor/getto-table/preact/cell/expansion"
import { tableCell_multipart } from "../../../../../z_vendor/getto-table/preact/cell/multipart"
import { tableCell_tree } from "../../../../../z_vendor/getto-table/preact/cell/tree"
import { TableCell } from "../../../../../z_vendor/getto-table/preact/cell"

type Props = Readonly<{
    content: Readonly<{
        sticky: TableDataSticky
        header: TableDataHeaderRow
        summary: TableDataSummaryRow
        footer: TableDataFooterRow
    }>
    rows: Row[]
    column: { (row: Row): TableDataColumnRow }
}>
export function TableTableComponent({ content, column, rows }: Props): VNode {
    const dataLength = rows.length
    return table(content.sticky, [
        thead([
            ...tableHeader({ ...content, singleLastBorderBottom: true }),
            ...tableSummary(content),
        ]),
        tbody(
            rows.flatMap((row, index) =>
                tableColumn({
                    sticky: content.sticky,
                    column: column(row),
                    noLastBorderBottom: index === dataLength - 1,
                }),
            ),
        ),
        tfoot(tableFooter(content)),
    ])
}

type Cells<R> = TableCell<Model, R>[]

export const buildTableStructure = (sort: SortLink) => (): TableStructure<Model, Row> => {
    return tableStructure(key, <Cells<Row>>[
        tableCell("id", (key) => ({
            label: "ID",
            header: sort(key),
            column: id,
        })).border(["rightDouble"]),

        tableCell_group({
            key: "base",
            header: linky("基本情報"),
            cells: <Cells<Row>>[
                tableCell("name", (key) => ({
                    label: "名前",
                    header: sort(key),
                    column: name,
                })),

                tableCell("state", (key) => ({
                    label: "状態",
                    header: sort(key),
                    column: state,
                }))
                    .border(["rightDouble"])
                    .decorateColumn(tableAlign(["center"])),
            ],
        }),

        tableCell_group({
            key: "hostInfo",
            header: linky("ホスト情報"),
            cells: <Cells<Row>>[
                tableCell_group({
                    key: "accountInfo",
                    header: linky("アカウント情報"),
                    cells: <Cells<Row>>[
                        tableCell_group({
                            key: "accountInfo",
                            header: linky("基本情報"),
                            cells: <Cells<Row>>[
                                tableCell("host", (key) => ({
                                    label: "ホスト",
                                    header: sort(key),
                                    column: host,
                                })).border(["right"]),
                            ],
                        }),

                        tableCell("account", (key) => ({
                            label: "アカウント",
                            header: sort(key),
                            column: account,
                        })).border(["right"]),
                    ],
                }),

                tableCell_group({
                    key: "purchaseInfo",
                    header: linky("価格情報"),
                    cells: <Cells<Row>>[
                        tableCell("price", (key) => ({
                            label: "価格",
                            header: sort(key),
                            column: price,
                            summary: sumPrice,
                            footer: sumPrice,
                        }))
                            .border(["rightDouble"])
                            .decorateColumn(tableAlign(["numeric"]))
                            .decorateSummary(tableAlign(["numeric"])),
                    ],
                }),
            ],
        }),

        tableCell_expansion("alarms", (_key) => ({
            label: "アラーム",
            header: linky,
            column: alarms,
            length: alarmLength,
        })).border(["right"]),

        tableCell_multipart({
            data: (model: Model) => model.temperatureTypes,
            cells: (temperatureType: TemperatureType) =>
                <Cells<Row>>[
                    tableCell(`temperature_${temperatureType}`, (_key) => ({
                        label: temperatureLabel(temperatureType),
                        header: linky,
                        column: temperatureAmount(temperatureType),
                    })),
                ],
        }),

        tableCell_tree({
            data: (row: Row, model: Model) => model.logs.get(row.row_id) || [],
            key: logKey,
            cells: <Cells<Log>>[
                tableCell("log_id", (_key) => ({
                    label: "ログID",
                    header: linky,
                    column: logID,
                })).border(["left"]),

                tableCell("loggedAt", (_key) => ({
                    label: "ログ時刻",
                    header: linky,
                    column: loggedAt,
                })),
            ],
        }),

        tableCell_tree({
            data: (row: Row) => row.articles,
            key: articleKey,
            cells: <Cells<Article>>[
                tableCell("article", (_key) => ({
                    label: "記事",
                    header: linky,
                    column: articleTitle,
                })).border(["left"]),

                tableCell_tree({
                    data: (article: Article) => article.comments,
                    key: commentKey,
                    cells: <Cells<ArticleComment>>[
                        tableCell<Model, ArticleComment>("comment", (_key) => ({
                            label: "コメント",
                            header: linky,
                            column: comment,
                        }))
                            .border(["left"])
                            .horizontalBorder(["bottomNone"]),
                    ],
                }),
            ],
        }),

        tableCell("updatedAt", (key) => ({
            label: "更新日時",
            header: sort(key),
            column: updatedAt,
        })).border(["left"]),

        tableCell("memo", (_key) => ({
            label: "メモ",
            header: linky,
            column: memo,
        })),
    ])
        .decorateRow(tableClassName(["row_hover"]))
        .stickyCross(1)
        .freeze()

    function key(row: Row): number {
        return row.row_id
    }

    function id(row: Row): number {
        return row.row_id
    }
    function name(row: Row): string {
        return row.name
    }
    function host(row: Row): string {
        return row.host
    }
    function account(row: Row): string {
        return row.account
    }
    function memo(row: Row): string {
        return row.memo
    }
    function state(row: Row): VNode {
        switch (row.state) {
            case "仮":
                return label_gray(row.state)

            case "完了":
                return label_success(row.state)

            default:
                return label_warning(row.state)
        }
    }
    function price(row: Row): string {
        return formatPrice(row.price)
    }
    function alarms(row: Row): string[] {
        return row.alarms
    }
    function temperatureAmount(temperatureType: TemperatureType): { (row: Row): string } {
        return (row) => formatPrice(row.amounts.get(temperatureType) || 0)
    }
    function updatedAt(row: Row): VNode {
        return small(row.updatedAt)
    }

    function logKey(log: Log): number {
        return log.log_id
    }
    function logID(log: Log): number {
        return log.log_id
    }
    function loggedAt(log: Log): VNode {
        return small(log.loggedAt)
    }

    function articleKey(article: Article): string {
        return article.title
    }
    function articleTitle(article: Article): string {
        return article.title
    }

    function commentKey(comment: ArticleComment): string {
        return comment
    }
    function comment(comment: ArticleComment): string {
        return comment
    }

    function sumPrice(model: Model): string {
        return formatPrice(model.sumPrice)
    }
    function alarmLength(model: Model): number {
        return model.alarmMaxLength
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

function formatPrice(price: number): string {
    return Intl.NumberFormat("ja-JP").format(price)
}
