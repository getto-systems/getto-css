import { VNode } from "preact"
import { html } from "htm/preact"

import {
    TableDataColumnRow,
    TableDataHeaderRow,
    TableStructure,
} from "../../../../../z_vendor/getto-table/preact/core"
import { TableDataSticky } from "../../../../../z_vendor/getto-table/preact/style"
import { tableStructure } from "../../../../../z_vendor/getto-table/preact/cell/structure"
import { tableCell } from "../../../../../z_vendor/getto-table/preact/cell/simple"
import { tableAlign, tableClassName } from "../../../../../z_vendor/getto-table/preact/decorator"

import {
    SortLink,
    table,
    tableColumn,
    tableHeader,
    tbody,
    thead,
} from "../../../../../z_vendor/getto-css/preact/design/data"
import {
    fieldSection,
    fieldSection_error,
} from "../../../../../z_vendor/getto-css/preact/design/form"
import {
    label_gray,
    label_warning,
    linky,
} from "../../../../../z_vendor/getto-css/preact/design/highlight"
import { small } from "../../../../../z_vendor/getto-css/preact/design/alignment"

import { Model, Row } from "./data"
import { icon } from "../../../../../x_preact/design/icon"

type Props = Readonly<{
    content: Readonly<{
        sticky: TableDataSticky
        header: TableDataHeaderRow
    }>
    rows: Row[]
    column: { (row: Row): TableDataColumnRow }
}>
export function DataTableComponent({ content, column, rows }: Props): VNode {
    return table(content.sticky, [
        thead(tableHeader(content)),
        tbody(rows.flatMap((row) => tableColumn({ ...content, column: column(row) }))),
    ])
}

export const buildDataStructure = (sort: SortLink) => (): TableStructure<Model, Row> => {
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

        tableCell("formalName", (_key) => ({
            label: "正式名称",
            header: linky,
            column: formalName,
        })),

        tableCell("tel", (_key) => ({
            label: "問い合わせ電話番号",
            header: linky,
            column: tel,
        })),

        tableCell("edit", (_key) => ({
            label: "",
            header: linky,
            column: editLink,
        }))
            .alwaysVisible()
            .border(["left"]),
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
    function name(_row: Row): VNode {
        return fieldSection_error({
            body: html`<input type="text" value="" />`,
            help: ["識別のための作業名"],
            notice: ["作業名は必須です"],
        })
    }
    function email(_row: Row): VNode {
        return fieldSection({
            body: html`<input type="email" value="" />`,
            help: ["連絡先メールアドレス"],
        })
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
    function formalName(_row: Row): string {
        return "名称"
    }
    function tel(_row: Row): string {
        return "tel"
    }
    function editLink(_row: Row): VNode {
        return html`<a href="#">${icon("pencil")} 編集</a>`
    }
}

function formatPrice(price: number): string {
    return Intl.NumberFormat("ja-JP").format(price)
}
