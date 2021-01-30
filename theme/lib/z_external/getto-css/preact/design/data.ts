import { VNode } from "preact"
import { html } from "htm/preact"

import { VNodeContent, VNodeKey } from "../../../preact/common"

import { checkbox } from "./form"

import { tableStructure } from "../../../getto-table/preact/cell/structure"
import { tableCell } from "../../../getto-table/preact/cell/single"
import { tableCell_expansion } from "../../../getto-table/preact/cell/expansion"
import { tableCell_group } from "../../../getto-table/preact/cell/group"
import { tableCell_multipart } from "../../../getto-table/preact/cell/multipart"
import { tableCell_tree } from "../../../getto-table/preact/cell/tree"
import { decorateNone, tableAlign, tableClassName } from "../../../getto-table/preact/decorator"

import {
    visibleKeys,
    TableDataColumnRow,
    TableDataFooterRow,
    TableDataHeader,
    TableDataHeaderRow,
    TableDataSummary,
    TableDataSummaryRow,
    TableDataColumnTree,
    TableDataColumn,
    TableDataColumnSingle,
    TableDataColumnExpansion,
} from "../../../getto-table/preact/core"
import {
    overrideBorderBottomToNone,
    TableDataAlign,
    TableDataAlignStyle,
    TableDataBorderClass,
    TableDataBorderStyle,
    TableDataClassName,
    TableDataFullStyle,
    TableDataSticky,
} from "../../../getto-table/preact/style"
import { TableDataCell } from "../../../getto-table/preact/cell"

export interface SortLink {
    (key: SortKey): { (content: VNodeContent): VNode }
}
export type Sort = Readonly<{
    key: SortKey
    order: SortOrder
    href: { (query: SortQuery): SortHref }
    sign: SortSign
}>
export type SortKey = VNodeKey
export type SortOrder = "normal" | "reverse"
export type SortQuery = Readonly<{
    key: SortKey
    order: SortOrder
}>
export type SortHref = string
export type SortSign = Readonly<{
    normal: VNodeContent
    reverse: VNodeContent
}>
export function sortLink(sort: Sort): SortLink {
    return (key) => (content) =>
        html`<a href=${sort.href(sortQuery(key))}>${content} ${sortSign(key)}</a>`

    function sortQuery(key: SortKey): SortQuery {
        return { key, order: sortQueryOrder() }

        function sortQueryOrder(): SortOrder {
            if (sort.key !== key) {
                return "normal"
            }
            switch (sort.order) {
                case "normal":
                    return "reverse"

                case "reverse":
                    return "normal"
            }
        }
    }

    function sortSign(key: SortKey) {
        if (sort.key !== key) {
            return ""
        }
        return sort.sign[sort.order]
    }
}

export function linky(content: VNodeContent): VNode {
    return html`<span class="linky">${content}</span>`
}

export function tableViewColumns(content: VNodeContent): VNode {
    return html`<section class="table__viewColumns">${content}</section>`
}

export type PagerOptionsContent = Readonly<{
    all: number
    step: number
    content: { (params: PagerOptionsContentParams): VNodeContent }
}>
export type PagerOptionsContentParams = Readonly<{ start: number; end: number }>
export function pagerOptions({ all, step, content }: PagerOptionsContent): VNode[] {
    const options: VNode[] = []
    for (let i = 0; i < Math.ceil(all / step); i++) {
        const offset = i * step
        const params = { start: offset + 1, end: end(offset) }
        options.push(html`<option value=${offset}>${content(params)}</option>`)
    }
    return options

    function end(offset: number) {
        if (all < offset + step) {
            return all
        }
        return offset + step
    }
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

        case "table":
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
    type HeaderRow = Readonly<{
        sticky: StickyHorizontalInfo
        containers: HeaderContainer[]
    }>
    type HeaderContainer = Readonly<{
        index: number
        colspan: number
        rowspan: number
        header: TableDataHeader
    }>

    type BuildInfo = Readonly<{
        sticky: StickyHorizontalInfo
        index: number
    }>

    const base: BuildInfo = {
        sticky: { level: 0, borderWidth: 0 },
        index: 0,
    }
    return buildHeaderRows(base, headers).map(headerTr)

    function headerTr({ sticky: info, containers }: HeaderRow): VNode {
        return tr(key(info.level), className, containers.map(headerTh(info)))
    }

    function headerTh(info: StickyHorizontalInfo): { (container: HeaderContainer): VNode } {
        return ({ index, colspan, rowspan, header }) => html`<th
            class="${className(index, header)}"
            colspan=${colspan}
            rowspan=${rowspan}
            key=${header.key}
        >
            ${header.content}
        </th>`

        function className(index: number, header: TableDataHeader) {
            return [...styleClass(header.style), ...stickyHeaderClass(sticky, { info, index })].join(" ")
        }
    }

    function buildHeaderRows(base: BuildInfo, headers: TableDataHeader[]): HeaderRow[] {
        const rowHeight = maxHeight(headers)
        const top = gatherHeader()
        const nextBorderWidth = borderWidth(top)
        return [top, ...gatherChildren()]

        function gatherHeader(): HeaderRow {
            type GatherResult = Readonly<{
                index: number
                containers: HeaderContainer[]
            }>
            return {
                sticky: base.sticky,
                containers: headers.reduce((acc, header) => {
                    return {
                        index: acc.index + header.length,
                        containers: [
                            ...acc.containers,
                            {
                                index: acc.index,
                                colspan: header.length,
                                rowspan: paddingHeight(header) + 1,
                                header,
                            },
                        ],
                    }
                }, initialGatherResult(base.index)).containers,
            }
            function initialGatherResult(index: number): GatherResult {
                return {
                    index,
                    containers: [],
                }
            }
        }

        function gatherChildren(): HeaderRow[] {
            return headers.reduce((acc, header, index) => {
                switch (header.type) {
                    case "single":
                    case "expansion":
                        return acc

                    case "group":
                        return merge(acc, [
                            ...buildHeaderRows_padding(paddingHeight(header)),
                            ...buildHeaderRows(
                                {
                                    sticky: {
                                        level: base.sticky.level + paddingHeight(header) + 1,
                                        borderWidth: nextBorderWidth,
                                    },
                                    index: base.index + index,
                                },
                                header.children
                            ),
                        ])
                }
            }, <HeaderRow[]>[])
        }

        function buildHeaderRows_padding(paddingHeight: number): HeaderRow[] {
            return Array(paddingHeight)
                .fill(null)
                .map(
                    (_, i): HeaderRow => {
                        return {
                            sticky: {
                                level: base.sticky.level + 1 + i,
                                borderWidth: nextBorderWidth,
                            },
                            containers: [],
                        }
                    }
                )
        }
        function paddingHeight(header: TableDataHeader): number {
            return rowHeight - header.height
        }

        function merge(base: HeaderRow[], rows: HeaderRow[]): HeaderRow[] {
            return rows.reduce(
                (acc, row, index) => [
                    ...acc.slice(0, index),
                    mergeRow(row, index),
                    ...acc.slice(index + 1),
                ],
                base
            )

            function mergeRow(row: HeaderRow, index: number): HeaderRow {
                if (index >= base.length) {
                    return row
                }
                const baseRow = base[index]
                return {
                    sticky: {
                        ...baseRow.sticky,
                        borderWidth: Math.max(baseRow.sticky.borderWidth, row.sticky.borderWidth),
                    },
                    containers: [...baseRow.containers, ...row.containers],
                }
            }
        }
    }

    function maxHeight(headers: TableDataHeader[]): number {
        return Math.max(0, ...headers.map((header) => header.height))
    }
    function borderWidth(row: HeaderRow): number {
        type BorderInfo = Readonly<{ top: number; bottom: number }>
        return (
            row.sticky.borderWidth +
            sum(
                row.containers.reduce((acc, container) => {
                    return merge({
                        base: acc,
                        border: {
                            top: topWidth(container),
                            bottom: bottomWidth(container),
                        },
                    })
                }, initialBorderInfo())
            )
        )

        function topWidth(container: HeaderContainer): number {
            return width(container.header.style.border.horizontal.top)
        }
        function bottomWidth(container: HeaderContainer): number {
            if (container.rowspan > 1) {
                return 0
            }
            return width(container.header.style.border.horizontal.bottom)
        }
        function width(border: TableDataBorderClass): number {
            switch (border) {
                case "none":
                case "inherit":
                    return 0

                case "single":
                    return 1 // border-width: 1px

                case "double":
                    return 3 // border-width: 3px
            }
        }

        function initialBorderInfo(): BorderInfo {
            return { top: 0, bottom: 0 }
        }
        function sum({ top, bottom }: BorderInfo): number {
            return top + bottom
        }
        function merge({ base, border }: { base: BorderInfo; border: BorderInfo }): BorderInfo {
            return {
                top: Math.max(base.top, border.top),
                bottom: Math.max(base.bottom, border.bottom),
            }
        }
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
    return [tr(key, className, summaries.map(summaryTd(sticky)))]
}

export type TableColumnContent =
    | TableColumnContent_base
    | (TableColumnContent_base & TableColumnContent_noBorderBottom)
type TableColumnContent_base = Readonly<{
    sticky: TableDataSticky
    column: TableDataColumnRow
}>
type TableColumnContent_noBorderBottom = Readonly<{
    noBorderBottom: boolean
}>

export function tableColumn(content: TableColumnContent): VNode[] {
    type ColumnEntry = ColumnEntry_single | ColumnEntry_expansion | ColumnEntry_tree
    type ColumnEntry_single = Readonly<{ type: "single"; container: ColumnContainer }>
    type ColumnEntry_expansion = Readonly<{
        type: "expansion"
        index: number
        column: TableDataColumnExpansion
        containers: ColumnContainer[]
    }>
    type ColumnEntry_tree = Readonly<{
        type: "tree"
        index: number
        column: TableDataColumnTree
        rows: ColumnRow[]
    }>

    type ColumnContainer = Readonly<{
        index: number
        colspan: number
        rowspan: number
        style: TableDataFullStyle
        column: TableDataColumnSingle | EmptyColumn
    }>
    type EmptyColumn = Readonly<{ type: "empty"; key: VNodeKey }>

    type ColumnRow = Readonly<{
        key: VNodeKey[]
        className: TableDataClassName
        containers: ColumnContainer[]
    }>

    type BuildInfo = Readonly<{
        index: number
        bottom: boolean
    }>

    const { sticky, column } = content
    const noBorderBottom = "noBorderBottom" in content && content.noBorderBottom

    return buildColumnRows({ index: 0, bottom: true }, column).map(columnTr)

    function columnTr({ key, className, containers }: ColumnRow): VNode {
        return tr(key.join("_"), className, containers.map(columnTd))
    }

    function columnTd({ index, colspan, rowspan, style, column }: ColumnContainer): VNode {
        return html`<td class="${className()}" colspan=${colspan} rowspan=${rowspan} key=${column.key}>
            ${content()}
        </td>`

        function className() {
            return [...styleClass(style), ...stickyColumnClass(sticky, index)].join(" ")
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

    function buildColumnRows(base: BuildInfo, source: TableDataColumnRow): ColumnRow[] {
        const rowHeight = maxHeight(source)

        return source.columns
            .reduce(
                (acc, column, index) =>
                    merge(acc, entry(column, { ...base, index: base.index + index })),
                <ColumnRow[]>[]
            )
            .map((row) => {
                return {
                    ...row,
                    key: [source.key, ...row.key],
                    className: [...source.className, ...row.className],
                }
            })

        function entry(column: TableDataColumn, info: BuildInfo): ColumnEntry {
            switch (column.type) {
                case "single":
                    return singleEntry(column, info)

                case "expansion":
                    return expansionEntry(column, info)

                case "tree":
                    return treeEntry(column, info)
            }
        }
        function singleEntry(column: TableDataColumnSingle, { index }: BuildInfo): ColumnEntry_single {
            return {
                type: "single",
                container: {
                    column,
                    index,
                    colspan: column.length,
                    rowspan: rowHeight,
                    style: overrideBorderBottom(column.style),
                },
            }
        }
        function expansionEntry(
            column: TableDataColumnExpansion,
            expansionBase: BuildInfo
        ): ColumnEntry {
            return {
                type: "expansion",
                index: expansionBase.index,
                column,
                containers: column.columns
                    .slice(0, column.length)
                    .map(
                        (single, index) =>
                            singleEntry(single, { ...base, index: expansionBase.index + index })
                                .container
                    ),
            }
        }
        function treeEntry(column: TableDataColumnTree, info: BuildInfo): ColumnEntry {
            return {
                type: "tree",
                index: info.index,
                column,
                rows: column.children.flatMap((row, index) =>
                    buildColumnRows(
                        {
                            ...info,
                            bottom: info.bottom && index === rowHeight - 1,
                        },
                        row
                    )
                ),
            }
        }

        function merge(base: ColumnRow[], entry: ColumnEntry): ColumnRow[] {
            switch (entry.type) {
                case "single":
                    return mergeSingle(entry.container)

                case "expansion":
                    return mergeExpansion(entry)

                case "tree":
                    return mergeTree(entry)
            }

            function mergeSingle(container: ColumnContainer): ColumnRow[] {
                if (base.length === 0) {
                    return [
                        {
                            key: [],
                            className: [],
                            containers: [container],
                        },
                    ]
                }
                return [mergeContainer(base[0]), ...base.slice(1)]

                function mergeContainer(first: ColumnRow): ColumnRow {
                    return { ...first, containers: [...first.containers, container] }
                }
            }

            function mergeExpansion({ index, column, containers }: ColumnEntry_expansion): ColumnRow[] {
                if (base.length === 0) {
                    return [
                        {
                            key: [],
                            className: [],
                            containers: expandedContainers(),
                        },
                    ]
                }
                return [mergeContainer(base[0]), ...base.slice(1)]

                function mergeContainer(first: ColumnRow): ColumnRow {
                    return { ...first, containers: [...first.containers, ...expandedContainers()] }
                }

                function expandedContainers(): ColumnContainer[] {
                    return [...containers, ...emptyContainer()]
                }
                function emptyContainer(): ColumnContainer[] {
                    if (containers.length >= column.length) {
                        return []
                    }
                    return [
                        {
                            index,
                            colspan: column.length - containers.length,
                            rowspan: rowHeight,
                            style: overrideBorderBottom(column.style),
                            column: { type: "empty", key: `${column.key}__empty` },
                        },
                    ]
                }
            }

            function mergeTree({ index, column, rows }: ColumnEntry_tree): ColumnRow[] {
                return appendEmptyRow(rows).reduce(
                    (acc, row, index) => [
                        ...acc.slice(0, index),
                        mergeRow(row, index),
                        ...acc.slice(index + 1),
                    ],
                    base
                )

                function mergeRow(row: ColumnRow, index: number): ColumnRow {
                    if (index >= base.length) {
                        return row
                    }
                    const baseRow = base[index]
                    return {
                        key: [...baseRow.key, ...row.key],
                        className: [...baseRow.className, ...row.className],
                        containers: [...baseRow.containers, ...row.containers],
                    }
                }

                function appendEmptyRow(rows: ColumnRow[]): ColumnRow[] {
                    if (rows.length >= rowHeight) {
                        return rows
                    }
                    return [...rows, emptyRow()]

                    function emptyRow(): ColumnRow {
                        return {
                            key: [],
                            className: [],
                            containers: [
                                {
                                    index,
                                    colspan: column.length,
                                    rowspan: rowHeight - rows.length,
                                    style: overrideBorderBottom(column.style),
                                    column: {
                                        type: "empty",
                                        key: `__empty_${index}`,
                                    },
                                },
                            ],
                        }
                    }
                }
            }
        }

        function overrideBorderBottom(style: TableDataFullStyle): TableDataFullStyle {
            if (!noBorderBottom || !base.bottom) {
                return style
            }
            return overrideBorderBottomToNone(style)
        }
    }

    function maxHeight(row: TableDataColumnRow): number {
        return Math.max(1, ...row.columns.map((column) => column.height))
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
    return [tr(key, className, footers.map(summaryTd(sticky)))]
}

const summaryTd = (sticky: TableDataSticky): { (summary: TableDataSummary, index: number): VNode } => (
    summary,
    index
) => {
    return html`<td class="${className()}" colspan=${summary.length} key=${summary.key}>
        ${summaryContent(summary)}
    </td>`

    function className(): string {
        return [...styleClass(summary.style), ...stickyColumnClass(sticky, index)].join(" ")
    }
}

function summaryContent(summary: TableDataSummary): VNodeContent {
    switch (summary.type) {
        case "empty":
        case "empty-expansion":
            return EMPTY_CONTENT

        case "single":
        case "expansion":
            return summary.content
    }
}

function tr(key: VNodeKey, className: TableDataClassName, content: VNodeContent): VNode {
    return html`<tr class="${className.join(" ")}" key=${key}>
        ${content}
    </tr>`
}

function styleClass(style: TableDataFullStyle): string[] {
    return [...borderClass(style.border), ...alignClass(style.align), ...style.className]

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

type StickyHorizontalInfo = Readonly<{
    level: number
    borderWidth: number
}>
type StickyHeaderContent = Readonly<{
    info: StickyHorizontalInfo
    index: number
}>
function stickyHeaderClass(
    sticky: TableDataSticky,
    { info: { level, borderWidth }, index }: StickyHeaderContent
): string[] {
    switch (sticky.type) {
        case "none":
        case "table":
        case "column":
            return []

        case "header":
            return stickyHeader()

        case "cross":
            if (!isStickyColumn(sticky, index)) {
                return stickyHeader()
            }
            return [
                "cell_sticky",
                "cell_sticky_cross",
                stickyTopClass({ level, borderWidth: borderWidth }),
                stickyLeftClass(index),
            ]
    }

    function stickyHeader() {
        return ["cell_sticky", stickyTopClass({ level, borderWidth })]
    }
}
function stickyColumnClass(sticky: TableDataSticky, index: number): string[] {
    if (!isStickyColumn(sticky, index)) {
        return []
    }
    return ["cell_sticky", stickyLeftClass(index)]
}
function isStickyColumn(sticky: TableDataSticky, index: number): boolean {
    switch (sticky.type) {
        case "none":
        case "table":
        case "header":
            return false

        case "column":
        case "cross":
            return index < sticky.column
    }
}
type StickyTopContent = Readonly<{ level: number; borderWidth: number }>
function stickyTopClass({ level, borderWidth }: StickyTopContent) {
    return `cell_sticky_top${indexToClass(level)}${borderWidthToClass(borderWidth)}`
}
function stickyLeftClass(index: number) {
    return `cell_sticky_left${indexToClass(index)}`
}
function indexToClass(index: number): string {
    if (index === 0) {
        return ""
    }
    return (index + 1).toString()
}
function borderWidthToClass(borderWidth: number): string {
    if (borderWidth === 0) {
        return ""
    }
    return `_${borderWidth}`
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

    type Cells<R> = TableDataCell<Model, R>[]

    const structure = tableStructure({
        key: (row: Row) => row.id,
        cells: <Cells<Row>>[
            tableCell("id", (_key) => {
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

            tableCell_group({
                key: "group",
                header: () => linky("group"),
                cells: <Cells<Row>>[
                    tableCell_expansion("expansion", (_key) => {
                        return {
                            label: () => "expansion",
                            header: linky,
                            column: (row: Row) => row.emails.map((email) => html`${email}`),
                            length: (summary: Model) => summary.maxEmailCount,
                        }
                    }).border(["left"]),

                    tableCell_multipart({
                        data: (summary: Model): string[] => summary.allParts,
                        cells: (part: string): Cells<Row> => [
                            tableCell(`part_${part}`, (_key) => {
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

            tableCell_tree({
                data: (row: Row): RowLog[] =>
                    row.logs.map((log) => {
                        return { log, row }
                    }),
                key: ({ log }: RowLog) => log.id,
                cells: <Cells<RowLog>>[
                    tableCell("logDate", (_key) => {
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

    const params = { visibleKeys: visibleKeys(["id", "union"]), model }

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
