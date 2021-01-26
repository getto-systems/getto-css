import { VNode } from "preact"
import { html } from "htm/preact"

import { VNodeContent } from "../common"
import { checkbox } from "./form"

import { tableSpec } from "./data/table/cell/row"
import { tableData } from "./data/table/cell/single"
import { tableData_extract } from "./data/table/cell/extract"
import { tableData_group } from "./data/table/cell/group"
import { tableData_multipart } from "./data/table/cell/multipart"
import { tableData_tree } from "./data/table/cell/tree"
import { decorateNone, tableAlign, tableClassName } from "./data/table/decorator"
import { TableDataCellKey, TableDataView, TableSpec } from "./data/table/cell"

export function linky(content: VNodeContent): VNode {
    return html`<span class="linky">${content}</span>`
}

export type TableContent = Readonly<{
    thead: VNodeContent
    tbody: VNodeContent
    tfoot: VNodeContent
}>
// TODO table のクラスバリエーションがいろいろある
export function table({ thead, tbody, tfoot }: TableContent): VNode {
    return html`<table class="table">
        ${thead}${tbody}${tfoot}
    </table>`
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

export type TableViewContent<M, R> = Readonly<{
    spec: TableSpec<M, R>
    model: M
    visibleKeys: TableDataCellKey[]
}>
export function tableViewColumns<M, R>(
    params: TableViewContent<M, R>,
    content: { (view: TableDataView): VNodeContent }
): VNode {
    // TODO    search__columns を view__columns に変える
    return html`<section class="search__columns">${params.spec.view(params).map(content)}</section>`
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

const params = { spec, visibleKeys, model, rows }

tableViewColumns(params, ({ isVisible, content, key }) =>
    checkbox({ isChecked: isVisible, input: html`${input}${content}`, key })
)

const content = tableContent(params)

table({
    thead: thead(content.header),
    tbody: tbody(content.body),
    tfoot: tfoot(content.footer),
})
