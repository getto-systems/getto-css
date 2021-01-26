import { html } from "htm/preact"

import { VNodeContent } from "../common"
import { checkbox } from "./form"

import { tableRow } from "./data/table/cell/row"
import { tableData } from "./data/table/cell/single"
import { tableData_extract } from "./data/table/cell/extract"
import { tableData_group } from "./data/table/cell/group"
import { tableData_multipart } from "./data/table/cell/multipart"
import { tableData_tree } from "./data/table/cell/tree"
import { decorateNone, tableAlign, tableClassName } from "./data/table/decorator"

// 以下テストコード

const rows: Row[] = []

const visibleKeys = ["id", "union"]

type Summary = Readonly<{
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

const cells = tableRow({
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
                        length: (summary: Summary) => summary.maxEmailCount,
                    }
                }).border(["left"]),

                tableData_multipart({
                    data: (summary: Summary): string[] => summary.allParts,
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
    .horizontalBorderRelated((row: Row) => (row.id > 0 ? ["bottom"] : []))
    .decorateRowRelated(() => tableClassName(["additional_class"]))
    .freeze()

viewColumns(
    tableView(cells, visibleKeys).map(({ isVisible, label, key }) =>
        checkbox({ isChecked: isVisible, input, key })
    )
)

function table(cells, visibleKeys, rows) {
    return html`<table>
        <thead>
            ${tableHeader(cells, visibleKeys)}
        </thead>
        <tbody>
            ${tableBody(cells, visibleKeys, rows)}
        </tbody>
    </table>`

    function tableBody(cells, visibleKeys, rows) {
        html`${tableSummary(cells, visibleKeys)} ${rows.map((row) => tableRow(cells, visibleKeys, row))}`
    }
}

function linky(content: VNodeContent): VNodeContent {
    return html`<span class="linky">${content}</span>`
}
