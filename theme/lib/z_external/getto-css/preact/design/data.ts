import { VNode } from "preact"
import { html } from "htm/preact"

import { VNodeContent, VNodeKey } from "../../../preact/common"
import { checkbox } from "./form"

import { tableStructure } from "../../../getto-table/preact/cell/structure"
import { tableData } from "../../../getto-table/preact/cell/single"
import { tableData_expansion } from "../../../getto-table/preact/cell/expansion"
import { tableData_group } from "../../../getto-table/preact/cell/group"
import { tableData_multipart } from "../../../getto-table/preact/cell/multipart"
import { tableData_tree } from "../../../getto-table/preact/cell/tree"
import { decorateNone, tableAlign, tableClassName } from "../../../getto-table/preact/decorator"
import {
    TableDataColumn,
    TableDataColumnRow,
    TableDataLeafColumn,
    TableDataFooterRow,
    TableDataHeader,
    TableDataHeaderRow,
    TableDataSummary,
    TableDataSummaryRow,
    tableDataTreePadding,
    TableDataColumnTree,
} from "../../../getto-table/preact/core"
import {
    TableDataAlign,
    TableDataAlignStyle,
    TableDataBorderClass,
    TableDataBorderStyle,
    TableDataClassName,
    TableDataFullStyle,
    TableDataSticky,
} from "../../../getto-table/preact/style"

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

export function table(sticky: TableDataSticky, content: VNodeContent): VNode {
    return tableContent("normal", sticky, content)
}
export function table_small(sticky: TableDataSticky, content: VNodeContent): VNode {
    return tableContent("small", sticky, content)
}
export function table_fill(sticky: TableDataSticky, content: VNodeContent): VNode {
    return tableContent("fill", sticky, content)
}
export function table_small_fill(sticky: TableDataSticky, content: VNodeContent): VNode {
    return tableContent("smallFill", sticky, content)
}
function tableContent(type: TableType, sticky: TableDataSticky, content: VNodeContent): VNode {
    return html`<table class="table ${tableClass(type)} ${stickyTableClass(sticky)}">
        ${content}
    </table>`
}
function stickyTableClass(sticky: TableDataSticky): string {
    switch (sticky.type) {
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

export type TableHeaderContent = Readonly<{
    sticky: TableDataSticky
    header: TableDataHeaderRow
}>
export function tableHeader({
    sticky,
    header: { key, className, headers },
}: TableHeaderContent): VNode[] {
    type HeaderCollection = Readonly<{
        index: number
        headers: TableDataHeader[]
    }>
    type HeaderContainer = Readonly<{
        index: number
        header: TableDataHeader
    }>
    return header(0, [{ index: 0, headers }])

    function header(level: number, collections: HeaderCollection[]): VNode[] {
        const height = headerHeight(collections)

        return [
            tr(key(level), className, gatherHeader(collections).map(headerTh)),
            ...header(level + 1, gatherChildren(collections)),
        ]

        function gatherHeader(collections: HeaderCollection[]): HeaderContainer[] {
            type GatherResult = Readonly<{
                index: number
                headers: HeaderContainer[]
            }>
            return collections.flatMap(
                ({ headers, index }) =>
                    headers.reduce((acc, header) => {
                        return {
                            index: acc.index + header.length,
                            headers: [
                                ...acc.headers,
                                {
                                    index: acc.index,
                                    header,
                                },
                            ],
                        }
                    }, initialGatherResult(index)).headers
            )
            function initialGatherResult(index: number): GatherResult {
                return {
                    index,
                    headers: [],
                }
            }
        }
        function gatherChildren(collections: HeaderCollection[]): HeaderCollection[] {
            return collections.flatMap((collection) =>
                collection.headers.flatMap((header, index) => {
                    switch (header.type) {
                        case "single":
                        case "expansion":
                            return []

                        case "group":
                            return {
                                index: collection.index + index,
                                headers: header.children,
                            }
                    }
                })
            )
        }

        function headerTh({ index, header }: HeaderContainer): VNode {
            return html`<th
                class="${className()}"
                colspan=${header.length}
                rowspan=${rowspan()}
                key=${header.key}
            >
                ${header.content}
            </th>`

            function rowspan() {
                switch (header.type) {
                    case "single":
                    case "expansion":
                        return height - level

                    case "group":
                        return 1
                }
            }
            function className() {
                return [
                    styleClass(header.style),
                    stickyColumnClass(sticky, index), // group はうれしくないかもだけど設定しちゃう
                    stickyHeaderClass(sticky, level),
                ].join(" ")
            }
        }
    }

    function headerHeight(collections: HeaderCollection[]): number {
        return Math.max(
            0,
            ...collections.flatMap((collection) => collection.headers.map((header) => header.height))
        )
    }
}

export type TableSummaryContent = Readonly<{
    sticky: TableDataSticky
    summary: TableDataSummaryRow
}>
export function tableSummary({
    sticky,
    summary: { key, className, summaries },
}: TableSummaryContent): VNode[] {
    return [tr(key, className, summaries.map(summaryTh(sticky)))]
}

export type TableColumnContent = Readonly<{
    sticky: TableDataSticky
    header: TableDataHeaderRow
    column: TableDataColumnRow
}>
export function tableColumn({ sticky, header: { headers }, column }: TableColumnContent): VNode[] {
    type ColumnCollection = Readonly<{
        index: number
        rows: TableDataColumnRow[]
    }>
    type ColumnEntry =
        | Readonly<{ type: "column"; column: ColumnContainer }>
        | Readonly<{ type: "rows"; rows: ColumnRow[] }>
    type ColumnRow = Readonly<{
        key: VNodeKey[]
        className: TableDataClassName
        columns: ColumnContainer[]
    }>
    type ColumnContainer = Readonly<{
        index: number
        column: TableDataLeafColumn
    }>

    const collection = { index: 0, rows: [column] }
    const height = columnHeight(column.columns)

    return toColumnRows(collection).map((row) =>
        tr(row.key.join("_"), row.className, row.columns.map(columnTd))
    )

    function toColumnRows({ rows, index }: ColumnCollection): ColumnRow[] {
        return rows.flatMap((row) => buildRow(row, toColumnEntries(row, index)))
    }
    function buildRow(row: TableDataColumnRow, columns: ColumnEntry[]): ColumnRow[] {
        return columns.reduce((acc, entry): ColumnRow[] => {
            switch (entry.type) {
                case "column":
                    return pushRow(acc, entry.column)

                case "rows":
                    return mergeRows({ acc, rows: entry.rows })
            }
        }, <ColumnRow[]>[])

        function pushRow(acc: ColumnRow[], column: ColumnContainer): ColumnRow[] {
            return insertColumnRow(acc, 0, (row) => {
                return { ...row, columns: [...row.columns, column] }
            })
        }
        function mergeRows({
            acc,
            rows,
        }: Readonly<{ acc: ColumnRow[]; rows: ColumnRow[] }>): ColumnRow[] {
            return rows.reduce((acc, row, index) => {
                return insertColumnRow(acc, index, (base) => mergeRow({ base: base, row }))
            }, acc)
        }
        function mergeRow({ base, row }: Readonly<{ base: ColumnRow; row: ColumnRow }>): ColumnRow {
            return {
                key: [...base.key, ...row.key],
                className: [...base.className, ...row.className],
                columns: [...base.columns, ...row.columns],
            }
        }
        function insertColumnRow(
            rows: ColumnRow[],
            index: number,
            map: { (row: ColumnRow): ColumnRow }
        ): ColumnRow[] {
            if (rows.length === index) {
                rows.push({
                    key: [row.key],
                    className: [...row.className],
                    columns: [],
                })
            }
            rows[index] = map(rows[index])
            return rows
        }
    }
    function toColumnEntries(row: TableDataColumnRow, index: number): ColumnEntry[] {
        type GatherResult = Readonly<{
            index: number
            columns: ColumnEntry[]
        }>

        return row.columns.reduce((acc, column): GatherResult => {
            switch (column.type) {
                case "single":
                case "empty":
                    return {
                        index: acc.index + column.length,
                        columns: [
                            ...acc.columns,
                            { type: "column", column: { index: acc.index, column } },
                        ],
                    }

                case "tree":
                    return {
                        index: acc.index + column.length,
                        columns: [
                            ...acc.columns,
                            {
                                type: "rows",
                                rows: [
                                    ...toColumnRows({
                                        index: acc.index,
                                        rows: column.children,
                                    }),
                                    ...padding(column, acc.index),
                                ],
                            },
                        ],
                    }
            }

            function padding(column: TableDataColumnTree, index: number): ColumnRow[] {
                return tableDataTreePadding(`__empty_${index}`, height, column, headers).map(
                    (column) => {
                        return {
                            key: [],
                            className: [],
                            columns: [{ index, column }],
                        }
                    }
                )
            }
        }, initialGatherResult(index)).columns

        function initialGatherResult(index: number): GatherResult {
            return {
                index,
                columns: [],
            }
        }
    }

    function columnTd({ index, column }: ColumnContainer): VNode {
        return html`<td
            class="${className()}"
            colspan=${column.length}
            rowspan=${height}
            key=${column.key}
        >
            ${content()}
        </td>`

        function className() {
            return [styleClass(column.style), stickyColumnClass(sticky, index)].join(" ")
        }
        function content() {
            switch (column.type) {
                case "single":
                    return column.content

                case "empty":
                    return EMPTY_CONTENT
            }
        }
    }

    function columnHeight(columns: TableDataColumn[]): number {
        return Math.max(1, ...columns.map((column) => column.height))
    }
}

export type TableFooterContent = Readonly<{
    sticky: TableDataSticky
    footer: TableDataFooterRow
}>
export function tableFooter({
    sticky,
    footer: { key, className, footers },
}: TableFooterContent): VNode[] {
    return [tr(key, className, footers.map(summaryTh(sticky)))]
}

function tr(key: VNodeKey, className: TableDataClassName, content: VNodeContent): VNode {
    return html`<tr class="${trClass(className)}" key=${key}>
        ${content}
    </tr>`
}

const summaryTh = (sticky: TableDataSticky): { (summary: TableDataSummary, index: number): VNode } => (
    summary,
    index
) => html`<th
    class="${styleClass(summary.style)} ${stickyColumnClass(sticky, index)}"
    key=${summary.key}
>
    ${summaryContent(summary)}
</th>`

function summaryContent(summary: TableDataSummary): VNodeContent {
    switch (summary.type) {
        case "empty":
            return EMPTY_CONTENT

        case "single":
        case "expansion":
            return summary.content
    }
}

function trClass(className: TableDataClassName): string {
    return className.join(" ")
}

function styleClass(style: TableDataFullStyle): string {
    return [...borderClass(style.border), ...alignClass(style.align), ...style.className].join(" ")

    function borderClass(border: TableDataBorderStyle): string[] {
        type TypedBorder =
            | Readonly<{ type: "t"; border: TableDataBorderClass }>
            | Readonly<{ type: "b"; border: TableDataBorderClass }>
            | Readonly<{ type: "l"; border: TableDataBorderClass }>
            | Readonly<{ type: "r"; border: TableDataBorderClass }>

        const borders: TypedBorder[] = [
            { type: "t", border: border.horizontal.top },
            { type: "b", border: border.horizontal.bottom },
            { type: "l", border: border.vertical.left },
            { type: "r", border: border.vertical.right },
        ]
        return borders.flatMap(({ type, border }: TypedBorder) => {
            switch (border) {
                case "none":
                case "inherit":
                    return []

                case "single":
                    return `cell_border_${type}`
                case "double":
                    return `cell_border_${type.repeat(2)}`
            }
        })
    }
    function alignClass(align: TableDataAlignStyle): string[] {
        return [align.horizontal, align.vertical].flatMap((type: TableDataAlign) => {
            switch (type) {
                case "inherit":
                    return []

                case "left":
                case "center":
                case "right":
                case "numeric":
                case "top":
                case "middle":
                case "baseline":
                case "bottom":
                    return `cell_${type}`
            }
        })
    }
}

function stickyHeaderClass(sticky: TableDataSticky, level: number): string {
    switch (sticky.type) {
        case "none":
        case "column":
            return ""

        case "header":
        case "cross":
            return `cell_sticky_top${indexToClass(level)}`
    }
}
function stickyColumnClass(sticky: TableDataSticky, index: number): string {
    switch (sticky.type) {
        case "none":
        case "header":
            return ""

        case "column":
        case "cross":
            if (index > sticky.column) {
                return ""
            }
            return `cell_sticky_left${indexToClass(index)}`
    }
}
function indexToClass(index: number): string {
    if (index === 0) {
        return ""
    }
    return (index + 1).toString()
}

const EMPTY_CONTENT = html``

// TODO 以下テストコードを x_preact に移す
export function __demo(): void {
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

    const structure = tableStructure({
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
                    tableData_expansion("expansion", (_key) => {
                        return {
                            label: () => "expansion",
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

    const content = {
        sticky: structure.sticky(),
        view: structure.view(params),
        header: structure.header(params),
        summary: structure.summary(params),
        footer: structure.footer(params),
    }

    tableViewColumns(
        content.view.map(({ isVisible, content, key }) =>
            checkbox({ isChecked: isVisible, input: html`<input type="checkbox" />${content}`, key })
        )
    )

    table(content.sticky, [
        thead([...tableHeader(content), ...tableSummary(content)]),
        tbody(rows.flatMap((row) => tableColumn({ ...content, column: structure.column(params, row) }))),
        tfoot(tableFooter(content)),
    ])
}
