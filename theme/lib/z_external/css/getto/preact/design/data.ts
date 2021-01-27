import { VNode } from "preact"
import { html } from "htm/preact"

import { VNodeContent } from "../common"
import { checkbox } from "./form"

import { tableSpec } from "./data/table/cell/spec"
import { tableData } from "./data/table/cell/single"
import { tableData_extract } from "./data/table/cell/extract"
import { tableData_group } from "./data/table/cell/group"
import { tableData_multipart } from "./data/table/cell/multipart"
import { tableData_tree } from "./data/table/cell/tree"
import { decorateNone, tableAlign, tableClassName } from "./data/table/decorator"
import { TableSpec } from "./data/table/cell"

export function linky(content: VNodeContent): VNode {
    return html`<span class="linky">${content}</span>`
}

export function tableViewColumns(content: VNodeContent): VNode {
    return html`<section class="table__viewColumns">${content}</section>`
}

type TableType = "normal" | "small" | "fill" | "smallFill"
function tableClass(type: TableType): string {
    switch (type) {
        case "normal":
            return ""

        case "smallFill":
            return "table_small table_fill"

        default:
            return `table_${type}`
    }
}

export function table<M, R>(spec: TableSpec<M, R>, content: VNodeContent): VNode {
    return tableContent("normal", spec, content)
}
export function table_small<M, R>(spec: TableSpec<M, R>, content: VNodeContent): VNode {
    return tableContent("small", spec, content)
}
export function table_fill<M, R>(spec: TableSpec<M, R>, content: VNodeContent): VNode {
    return tableContent("fill", spec, content)
}
export function table_small_fill<M, R>(spec: TableSpec<M, R>, content: VNodeContent): VNode {
    return tableContent("smallFill", spec, content)
}
function tableContent<M, R>(type: TableType, spec: TableSpec<M, R>, content: VNodeContent): VNode {
    return html`<table class="table ${tableClass(type)} ${stickyClass(spec)}">
        ${content}
    </table>`
}
function stickyClass<M, R>(spec: TableSpec<M, R>): string {
    switch (spec.sticky().type) {
        case "none":
            return ""

        case "header":
        case "column":
        case "cross":
            return "table_sticky"
    }
}

export function thead(content: VNodeContent): VNode {
    return html`<thead>
        ${content}
    </thead>`
}
export function tbody(content: VNodeContent): VNode {
    return html`<tbody>
        ${content}
    </tbody>`
}
export function tfoot(content: VNodeContent): VNode {
    return html`<tfoot>
        ${content}
    </tfoot>`
}

// TODO 以下テストコードを x_preact に移す

type Model = Readonly<{
    maxEmailCount: number
    allParts: string[]
}>
type Row = Readonly<{
    type: string
    id: number
    logs: Log[]
    emails: string[]
    parts: Record<string, Part>
}>
type Log = Readonly<{
    id: number
    date: string
}>
type RowLog = Readonly<{ row: Row; log: Log }>
type Part = Readonly<{
    name: string
}>

const spec = tableSpec({
    key: (row: Row) => row.id,
    cells: [
        tableData("id", (_key) => {
            return {
                label: () => "ID",
                header: linky,
                column: (row: Row) => html`${row.id}`,
            }
        })
            .border(["rightDouble"])
            .decorateColumnRelated((row) => {
                switch (row.type) {
                    case "summary":
                        return tableAlign(["middle"])

                    default:
                        return decorateNone
                }
            }),

        tableData_group({
            key: "group",
            header: () => linky("group"),
            cells: [
                tableData_extract("extract", (_key) => {
                    return {
                        label: () => "extract",
                        header: linky,
                        column: (row: Row) => row.emails.map((email) => html`${email}`),
                        length: (summary: Model) => summary.maxEmailCount,
                    }
                }).border(["left"]),

                tableData_multipart({
                    data: (summary: Model): string[] => summary.allParts,
                    cells: (part: string) => [
                        tableData(`part_${part}`, (_key) => {
                            return {
                                label: () => part,
                                header: linky,
                                column: (row: Row) => html`${row.parts[part]}`,
                            }
                        }),
                    ],
                }),
            ],
        }),

        tableData_tree({
            data: (row: Row): RowLog[] =>
                row.logs.map((log) => {
                    return { log, row }
                }),
            key: ({ log }: RowLog) => log.id,
            cells: [
                tableData("logDate", (_key) => {
                    return {
                        label: () => "log date",
                        header: linky,
                        column: ({ log, row }: RowLog) => html`${row.id} / ${log.date}`,
                    }
                }).border(["left"]),
            ],
        }),
    ],
})
    .horizontalBorderRelated((row) => (row.id > 0 ? ["bottom"] : []))
    .decorateRowRelated(() => tableClassName(["additional_class"]))
    .freeze()

const model: Model = {
    maxEmailCount: 0,
    allParts: ["part1"],
}
const rows: Row[] = []

const visibleKeys = ["id", "union"]

const params = { visibleKeys, model, rows }

tableViewColumns(
    spec
        .view(params)
        .map(({ isVisible, content, key }) =>
            checkbox({ isChecked: isVisible, input: html`${input}${content}`, key })
        )
)

table(spec, [thead(header()), tbody(body()), tfoot(footer())])

function header() {
    return [...tableHeader(spec.header(params)), ...tableSummary(spec.summary(params))]
}
function body() {
    return rows.map((row) => tableColumn(spec.column(params, row)))
}
function footer() {
    return tableFooter(spec.footer(params))
}
