import { VNode } from "preact"
import { useMemo } from "preact/hooks"
import { html } from "htm/preact"

import { TableStructure, visibleAll } from "../../../../z_external/getto-table/preact/core"
import { sidebarLargeElement } from "../../../../z_external/getto-css/preact/layout/app"
import { tableStructure } from "../../../../z_external/getto-table/preact/cell/structure"
import { tableCell } from "../../../../z_external/getto-table/preact/cell/single"
import {
    linky,
    table,
    tableHeader,
    tableColumn,
    thead,
    tbody,
    sortLink,
    Sort,
    SortLink,
} from "../../../../z_external/getto-css/preact/design/data"
import { label_gray, label_warning } from "../../../../z_external/getto-css/preact/design/highlight"
import { VNodeContent } from "../../../../z_external/preact/common"
import { small } from "../../../../z_external/getto-css/preact/design/alignment"
import { icon } from "../../../common/icon"
import { tableAlign, tableClassName } from "../../../../z_external/getto-table/preact/decorator"

type Props = {
    // no props
}
export function Table(_: Props): VNode {
    const sort: Sort = {
        key: "id",
        order: "normal",
        href: (query) => `?sort=${query.key}.${query.order}`,
    }
    const structure = useMemo(buildStructure(sortLink(sort)), [])

    const model: Model = {
        rows: generateRows(),
    }

    const params = { visibleKeys: visibleAll, model }

    const content = {
        sticky: structure.sticky(),
        header: structure.header(params),
    }

    return sidebarLargeElement(
        table(content.sticky, [
            thead(tableHeader(content)),
            tbody(
                model.rows.flatMap((row) =>
                    tableColumn({ ...content, column: structure.column(params, row) })
                )
            ),
        ])
    )
}

type Model = Readonly<{
    rows: Row[]
}>
type Row = Readonly<{
    id: number
    name: string
    state: string
    email: string
    price: number
    updatedAt: string
    memo: string
}>

const buildStructure = (sort: SortLink) => (): TableStructure<Model, Row> =>
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
            }).decorateColumn(tableAlign(["center"])),

            tableCell("email", (key) => {
                return {
                    label: () => "メールアドレス",
                    header: sort(key),
                    column: (row: Row) => row.email,
                }
            }),

            tableCell("price", (key) => {
                return {
                    label: () => "価格",
                    header: sort(key),
                    column: (row: Row) => formatPrice(row.price),
                }
            }).decorateColumn(tableAlign(["numeric"])),

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

            tableCell("edit", (_key) => {
                return {
                    label: () => "",
                    header: linky,
                    column: (_row: Row) => html`<a href="#">${icon("pencil")} 編集</a>`,
                }
            }).border(["left"]),
        ],
    })
        .decorateRow(tableClassName(["row_hover"]))
        .stickyCross(1)
        .freeze()

function generateRows(): Row[] {
    return repeatedRows(100)

    function repeatedRows(count: number) {
        const result: Row[] = []
        for (let i = 0; i < count; i++) {
            result.push(...rows())
        }
        return result
    }
    function rows(): Row[] {
        return [
            {
                id: 1234,
                name: "GETTO CSS",
                state: "仮",
                email: "admin@example.com",
                price: 1200,
                updatedAt: "2020/06/19 08:03",
                memo: "simple admin theme",
            },
            {
                id: 123,
                name: "GETTO",
                state: "作業中",
                email: "user@example.com",
                price: 13500,
                updatedAt: "2020/01/10",
                memo: "simple css theme",
            },
        ]
    }
}

function stateLabel(state: string): VNodeContent {
    switch (state) {
        case "仮":
            return label_gray(state)

        default:
            return label_warning(state)
    }
}

function formatPrice(price: number): string {
    return Intl.NumberFormat("ja-JP").format(price)
}
