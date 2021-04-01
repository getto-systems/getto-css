import { VNode } from "preact"
import { useMemo } from "preact/hooks"
import { html } from "htm/preact"

import { visibleAll } from "../../../../../z_vendor/getto-table/preact/core"
import { tableStructure } from "../../../../../z_vendor/getto-table/preact/cell/structure"
import { tableCell } from "../../../../../z_vendor/getto-table/preact/cell/simple"
import { tableAlign, tableClassName } from "../../../../../z_vendor/getto-table/preact/decorator"

import {
    table,
    tableHeader,
    tableColumn,
    thead,
    tbody,
    sortLink,
    SortLink,
} from "../../../../../z_vendor/getto-css/preact/design/data"
import {
    label_gray,
    label_warning,
    linky,
} from "../../../../../z_vendor/getto-css/preact/design/highlight"
import { small } from "../../../../../z_vendor/getto-css/preact/design/alignment"
import { sortSign } from "../../../../../x_preact/design/table"
import { icon } from "../../../../../x_preact/design/icon"

type Props = {
    // no props
}
export function SidebarTableComponent(_: Props): VNode {
    const structure = useMemo(
        () =>
            buildStructure(
                sortLink({
                    key: "id",
                    order: "normal",
                    href: (query) => `?sort=${query.key}.${query.order}`,
                    sign: sortSign,
                }),
            )(),
        [],
    )

    const model: Model = {
        rows: generateRows(),
    }

    const params = { visibleKeys: visibleAll, model }

    const content = {
        sticky: structure.sticky(),
        header: structure.header(params),
    }

    return table(content.sticky, [
        thead(tableHeader(content)),
        tbody(
            model.rows.flatMap((row) =>
                tableColumn({ ...content, column: structure.column(params, row) }),
            ),
        ),
    ])
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

const buildStructure = (sort: SortLink) => () => {
    return tableStructure(key, [
        tableCell("id", (key) => ({
            label: "ID",
            header: sort(key),
            column: id,
        })).border(["rightDouble"]),

        tableCell("name", (key) => ({
            label: "名前",
            header: sort(key),
            column: name,
        })),

        tableCell("state", (key) => ({
            label: "状態",
            header: sort(key),
            column: state,
        })).decorateColumn(tableAlign(["center"])),

        tableCell("email", (key) => ({
            label: "メールアドレス",
            header: sort(key),
            column: email,
        })),

        tableCell("price", (key) => ({
            label: "価格",
            header: sort(key),
            column: price,
        })).decorateColumn(tableAlign(["numeric"])),

        tableCell("updatedAt", (key) => ({
            label: "更新日時",
            header: sort(key),
            column: updatedAt,
        })),

        tableCell("memo", (_key) => ({
            label: "メモ",
            header: linky,
            column: memo,
        })),

        tableCell("edit", (_key) => ({
            label: "",
            header: linky,
            column: editLink,
        })).border(["left"]),
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
    function memo(row: Row): string {
        return row.memo
    }
    function state(row: Row): VNode {
        switch (row.state) {
            case "仮":
                return label_gray(row.state)

            default:
                return label_warning(row.state)
        }
    }
    function price(row: Row): string {
        return formatPrice(row.price)
    }
    function updatedAt(row: Row): VNode {
        return small(row.updatedAt)
    }
    function editLink(_row: Row): VNode {
        return html`<a href="#">${icon("pencil")} 編集</a>`
    }
}

function generateRows(): Row[] {
    return repeatedRows(10)

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

function formatPrice(price: number) {
    return Intl.NumberFormat("ja-JP").format(price)
}
