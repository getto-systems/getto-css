import { html } from "htm/preact"

import { VNodeContent, VNodeKey } from "../common"
import { checkbox } from "./form"

export type TableDataCell<S, R> =
    | TableDataSingle<R>
    | TableDataExtract<S, R>
    | TableDataGroup<S, R>
    | TableDataMultipart<S, R>
    | TableDataTree<S, R>

type TableDataCellKey = VNodeKey

export interface TableDataSingle<R> {
    type: "single"

    view(): TableDataView
    header(): TableDataHeaderSingle
    prepend(): TableDataPrependSingle
    column(row: R): TableDataColumnSingle

    border(borders: TableDataVerticalBorder[]): TableDataSingle<R>
    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataSingle<R>

    decorateView(decorator: TableDataViewDecorator): TableDataSingle<R>
    decorateHeader(decorator: TableDataHeaderDecorator): TableDataSingle<R>
    setPrepend(content: TableDataPrependProvider): TableDataSingle<R>
    decoratePrepend(decorator: TableDataPrependDecorator): TableDataSingle<R>
    decorateColumn(decorator: TableDataColumnDecorator<R>): TableDataSingle<R>

    filterVisibleCells(keys: TableDataCellKey[]): TableDataFilteredCell<TableDataSingle<R>>
}
export interface TableDataExtract<S, R> {
    type: "extract"

    view(): TableDataView
    header(summary: S): TableDataHeaderExtract
    prepend(summary: S): TableDataPrependExtract
    column(row: R, summary: S): TableDataColumnExtract

    border(borders: TableDataVerticalBorder[]): TableDataExtract<S, R>
    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataExtract<S, R>

    decorateView(decorator: TableDataViewDecorator): TableDataExtract<S, R>
    decorateHeader(decorator: TableDataHeaderDecorator): TableDataExtract<S, R>
    setPrepend(content: TableDataPrependProvider): TableDataExtract<S, R>
    decoratePrepend(decorator: TableDataPrependDecorator): TableDataExtract<S, R>
    decorateColumn(decorator: TableDataColumnDecorator<R>): TableDataExtract<S, R>

    filterVisibleCells(keys: TableDataCellKey[]): TableDataFilteredCell<TableDataExtract<S, R>>
}
export interface TableDataGroup<S, R> {
    type: "group"

    view(summary: S): TableDataView[]
    header(summary: S): TableDataHeaderGroup
    prepend(summary: S): TableDataPrepend[]
    column(row: R, summary: S): TableDataColumn[]

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataGroup<S, R>
    decorateGroup(decorator: TableDataGroupDecorator): TableDataGroup<S, R>

    filterVisibleCells(keys: TableDataCellKey[]): TableDataFilteredCell<TableDataGroup<S, R>>
}
export interface TableDataMultipart<S, R> {
    type: "multipart"

    view(summary: S): TableDataView[]
    header(summary: S): TableDataHeader[]
    prepend(summary: S): TableDataPrepend[]
    column(row: R, summary: S): TableDataColumn[]

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataMultipart<S, R>

    filterVisibleCells(keys: TableDataCellKey[]): TableDataFilteredCell<TableDataMultipart<S, R>>
}
export interface TableDataTree<S, R> {
    type: "tree"

    view(summary: S): TableDataView[]
    header(summary: S): TableDataHeader[]
    prepend(summary: S): TableDataPrepend[]
    column(row: R, summary: S): TableDataColumnTree

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataTree<S, R>
    decorateRow(decorator: TableDataRowDecorator<R>): TableDataTree<S, R>

    filterVisibleCells(keys: TableDataCellKey[]): TableDataFilteredCell<TableDataTree<S, R>>
}

export interface TableRowFrozen<S, R> {
    view(summary: S): TableDataView[]
    header(summary: S): TableDataHeader[]
    prepend(summary: S): TableDataPrepend[]
    column(row: R, summary: S): TableDataColumnCollection
}
export interface TableRow<S, R> extends TableRowFrozen<S, R> {
    horizontalBorder(borders: TableDataHorizontalBorder[]): TableRow<S, R>
    decorateRow(decorator: TableDataRowDecorator<R>): TableRow<S, R>

    filterVisibleCells(keys: TableDataCellKey[]): TableDataFilteredCell<TableRow<S, R>>

    freeze(): TableRowFrozen<S, R>
}

type TableDataFilteredCell<T> = Readonly<{ cell: T; isVisible: boolean }>

type TableDataView = Readonly<{
    key: VNodeKey
    content: VNodeContent
}>

type TableDataHeader = TableDataHeaderSingle | TableDataHeaderExtract | TableDataHeaderGroup

type TableDataHeaderSingle = Readonly<{
    type: "single"
    key: VNodeKey
    style: TableDataStyle
    content: VNodeContent
}>
type TableDataHeaderExtract = Readonly<{
    type: "extract"
    key: VNodeKey
    style: TableDataStyle
    content: VNodeContent
    length: number
}>
type TableDataHeaderGroup = Readonly<{
    type: "group"
    key: VNodeKey
    style: TableDataStyle
    content: VNodeContent
    children: TableDataHeader[]
}>

type TableDataPrepend = TableDataPrependSingle | TableDataPrependExtract

type TableDataPrependEmpty = Readonly<{
    type: "empty"
    key: VNodeKey
    style: TableDataStyle
}>
type TableDataPrependSingle =
    | TableDataPrependEmpty
    | Readonly<{
          type: "single"
          key: VNodeKey
          style: TableDataStyle
          content: VNodeContent
      }>
type TableDataPrependExtract =
    | TableDataPrependEmpty
    | Readonly<{
          type: "extract"
          key: VNodeKey
          style: TableDataStyle
          content: VNodeContent
          length: number
      }>

type TableDataColumn = TableDataColumnSingle | TableDataColumnExtract | TableDataColumnTree

type TableDataColumnSingle = Readonly<{
    type: "single"
    key: VNodeKey
    style: TableDataStyle
    content: VNodeContent
}>
type TableDataColumnExtract = Readonly<{
    type: "extract"
    key: VNodeKey
    style: TableDataStyle
    content: VNodeContent
    length: number
}>
type TableDataColumnTree = Readonly<{
    type: "tree"
    style: TableDataRowStyle
    children: TableDataColumnCollection[]
    height: number
}>
type TableDataColumnCollection = Readonly<{
    key: VNodeKey
    columns: TableDataColumn[]
}>

export type TableDataSingleContent<R> = Readonly<{
    label: TableDataContentProvider
    header: TableDataContentDecorator
    column: TableDataColumnContentProvider<R>
}>
export function tableData<R>(
    key: TableDataCellKey,
    content: { (key: TableDataCellKey): TableDataSingleContent<R> }
): TableDataSingle<R> {
    return new TableDataSingleImpl(key, content(key))
}
class TableDataSingleImpl<R> implements TableDataSingle<R> {
    readonly type = "single" as const

    key: TableDataCellKey
    container: Readonly<{
        label: TableDataContentProvider
        view: TableDataViewContainer
        header: TableDataHeaderContainer
        prepend: TableDataPrependContainer
        column: TableDataColumnContainer<R>
    }>

    constructor(key: TableDataCellKey, { label, header, column }: TableDataSingleContent<R>) {
        this.key = key
        this.container = {
            label,
            view: {
                decorator: { type: "none" },
            },
            header: {
                style: defaultHeaderStyle(),
                content: header,
            },
            prepend: {
                style: defaultPrependStyle(),
                content: { type: "none" },
            },
            column: {
                baseStyle: defaultColumnStyle(),
                content: column,
                decorators: [],
            },
        }
    }

    view(): TableDataView {
        return {
            key: this.key,
            content: decorateContent(this.container.label(), this.container.view.decorator),
        }
    }
    header(): TableDataHeaderSingle {
        return {
            type: "single",
            key: this.key,
            style: this.container.header.style,
            content: this.container.header.content(this.container.label()),
        }
    }
    prepend(): TableDataPrependSingle {
        const base = {
            key: this.key,
            style: this.container.prepend.style,
        }
        switch (this.container.prepend.content.type) {
            case "none":
                return { type: "empty", ...base }

            case "content":
                return {
                    type: "single",
                    ...base,
                    content: this.container.prepend.content.content(),
                }
        }
    }
    column(row: R): TableDataColumnSingle {
        return {
            type: "single",
            key: this.key,
            style: this.container.column.decorators.reduce(
                (acc, decorator) => decorateStyle(acc, decorator(row)),
                this.container.column.baseStyle
            ),
            content: this.container.column.content(row),
        }
    }

    border(borders: TableDataVerticalBorder[]): TableDataSingle<R> {
        const decorator = verticalBorder(borders)
        this.decorateHeader(decorator)
        this.decoratePrepend(decorator)
        this.decorateColumn(() => decorator)
        return this
    }
    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataSingle<R> {
        const decorator = horizontalBorder(borders)
        this.decorateHeader(decorator)
        this.decoratePrepend(decorator)
        this.decorateColumn(() => decorator)
        return this
    }

    decorateView(decorator: TableDataViewDecorator): TableDataSingle<R> {
        this.container = {
            ...this.container,
            view: decorateView(this.container.view, decorator),
        }
        return this
    }
    decorateHeader(decorator: TableDataHeaderDecorator): TableDataSingle<R> {
        this.container = {
            ...this.container,
            header: decorateHeader(this.container.header, decorator),
        }
        return this
    }
    setPrepend(content: TableDataPrependProvider): TableDataSingle<R> {
        this.container = {
            ...this.container,
            prepend: setPrepend(this.container.prepend, content),
        }
        return this
    }
    decoratePrepend(decorator: TableDataPrependDecorator): TableDataSingle<R> {
        this.container = {
            ...this.container,
            prepend: decoratePrepend(this.container.prepend, decorator),
        }
        return this
    }
    decorateColumn(decorator: TableDataColumnDecorator<R>): TableDataSingle<R> {
        this.container = {
            ...this.container,
            column: decorateColumn(this.container.column, decorator),
        }
        return this
    }

    filterVisibleCells(keys: TableDataCellKey[]): TableDataFilteredCell<TableDataSingle<R>> {
        return { cell: this, isVisible: keys.includes(this.key) }
    }
}

export type TableDataExtractContent<S, R> = Readonly<{
    label: TableDataContentProvider
    header: TableDataContentDecorator
    column: TableDataColumnContentProvider<R>
    length: TableDataExtractLengthProvider<S>
}>
export function tableData_extract<S, R>(
    key: TableDataCellKey,
    content: { (key: TableDataCellKey): TableDataExtractContent<S, R> }
): TableDataExtract<S, R> {
    return new TableDataExtractImpl(key, content(key))
}
class TableDataExtractImpl<S, R> implements TableDataExtract<S, R> {
    readonly type = "extract" as const

    key: TableDataCellKey
    length: TableDataExtractLengthProvider<S>
    container: Readonly<{
        label: TableDataContentProvider
        view: TableDataViewContainer
        header: TableDataHeaderContainer
        prepend: TableDataPrependContainer
        column: TableDataColumnContainer<R>
    }>

    constructor(
        key: TableDataCellKey,
        { label, header, column, length }: TableDataExtractContent<S, R>
    ) {
        this.key = key
        this.length = length
        this.container = {
            label,
            view: {
                decorator: { type: "none" },
            },
            header: {
                style: defaultHeaderStyle(),
                content: header,
            },
            prepend: {
                style: defaultPrependStyle(),
                content: { type: "none" },
            },
            column: {
                baseStyle: defaultColumnStyle(),
                content: column,
                decorators: [],
            },
        }
    }

    view(): TableDataView {
        return {
            key: this.key,
            content: decorateContent(this.container.label(), this.container.view.decorator),
        }
    }
    header(summary: S): TableDataHeaderExtract {
        return {
            type: "extract",
            key: this.key,
            style: this.container.header.style,
            content: this.container.header.content(this.container.label()),
            length: this.length(summary),
        }
    }
    prepend(summary: S): TableDataPrependExtract {
        const base = {
            key: this.key,
            style: this.container.prepend.style,
        }
        switch (this.container.prepend.content.type) {
            case "none":
                return { type: "empty", ...base }

            case "content":
                return {
                    type: "extract",
                    ...base,
                    content: this.container.prepend.content.content(),
                    length: this.length(summary),
                }
        }
    }
    column(row: R, summary: S): TableDataColumnExtract {
        return {
            type: "extract",
            key: this.key,
            style: this.container.column.decorators.reduce(
                (acc, decorator) => decorateStyle(acc, decorator(row)),
                this.container.column.baseStyle
            ),
            content: this.container.column.content(row),
            length: this.length(summary),
        }
    }

    border(borders: TableDataVerticalBorder[]): TableDataExtract<S, R> {
        const decorator = verticalBorder(borders)
        this.decorateHeader(decorator)
        this.decoratePrepend(decorator)
        this.decorateColumn(() => decorator)
        return this
    }
    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataExtract<S, R> {
        const decorator = horizontalBorder(borders)
        this.decorateHeader(decorator)
        this.decoratePrepend(decorator)
        this.decorateColumn(() => decorator)
        return this
    }

    decorateView(decorator: TableDataViewDecorator): TableDataExtract<S, R> {
        this.container = {
            ...this.container,
            view: decorateView(this.container.view, decorator),
        }
        return this
    }
    decorateHeader(decorator: TableDataHeaderDecorator): TableDataExtract<S, R> {
        this.container = {
            ...this.container,
            header: decorateHeader(this.container.header, decorator),
        }
        return this
    }
    setPrepend(content: TableDataPrependProvider): TableDataExtract<S, R> {
        this.container = {
            ...this.container,
            prepend: setPrepend(this.container.prepend, content),
        }
        return this
    }
    decoratePrepend(decorator: TableDataPrependDecorator): TableDataExtract<S, R> {
        this.container = {
            ...this.container,
            prepend: decoratePrepend(this.container.prepend, decorator),
        }
        return this
    }
    decorateColumn(decorator: TableDataColumnDecorator<R>): TableDataExtract<S, R> {
        this.container = {
            ...this.container,
            column: decorateColumn(this.container.column, decorator),
        }
        return this
    }

    filterVisibleCells(keys: TableDataCellKey[]): TableDataFilteredCell<TableDataExtract<S, R>> {
        return { cell: this, isVisible: keys.includes(this.key) }
    }
}

export type TableDataGroupContent<S, R> = Readonly<{
    key: TableDataCellKey
    header: TableDataContentProvider
    cells: TableDataCell<S, R>[]
}>
export function tableData_group<S, R>(content: TableDataGroupContent<S, R>): TableDataGroup<S, R> {
    return new TableDataGroupImpl(content)
}
class TableDataGroupImpl<S, R> implements TableDataGroup<S, R> {
    readonly type = "group" as const

    key: TableDataCellKey

    cells: TableDataCell<S, R>[]
    container: Readonly<{
        group: TableDataGroupContainer
    }>

    constructor({ key, header, cells }: TableDataGroupContent<S, R>) {
        this.key = key
        this.cells = cells
        this.container = {
            group: {
                style: defaultGroupStyle(),
                content: header,
            },
        }
    }

    view(summary: S): TableDataView[] {
        return this.cells.flatMap((cell) => cell.view(summary))
    }
    header(summary: S): TableDataHeaderGroup {
        const children = this.children(summary)
        return {
            type: "group",
            key: this.key,
            style: mergeVerticalBorder(this.container.group.style, border()),
            content: this.container.group.content(),
            children,
        }

        function border(): TableDataVerticalBorderStyle {
            if (children.length === 0) {
                return { left: "none", right: "none" }
            }
            return {
                left: children[0].style.border.left,
                right: children[children.length - 1].style.border.right,
            }
        }
    }
    children(summary: S): TableDataHeader[] {
        return this.cells.flatMap((cell) => cell.header(summary))
    }
    prepend(summary: S): TableDataPrepend[] {
        return this.cells.flatMap((cell) => cell.prepend(summary))
    }
    column(row: R, summary: S): TableDataColumn[] {
        return this.cells.flatMap((cell) => cell.column(row, summary))
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataGroup<S, R> {
        this.cells = this.cells.map((cell) => cell.horizontalBorder(borders))
        return this
    }

    decorateGroup(decorator: TableDataHeaderDecorator): TableDataGroup<S, R> {
        this.container = {
            ...this.container,
            group: decorateGroup(this.container.group, decorator),
        }
        return this
    }

    filterVisibleCells(keys: TableDataCellKey[]): TableDataFilteredCell<TableDataGroup<S, R>> {
        const duplicate = new TableDataGroupImpl({
            key: this.key,
            header: this.container.group.content,
            cells: filterVisibleCells(this.cells, keys),
        })
        duplicate.container = this.container
        return { cell: duplicate, isVisible: duplicate.cells.length > 0 }
    }
}

export type TableDataMultipartContent<S, R, P> = Readonly<{
    data: TableDataChildrenProvider<S, P>
    cells: TableDataMultipartCellProvider<S, R, P>
}>
export function tableData_multipart<S, R, P>(
    content: TableDataMultipartContent<S, R, P>
): TableDataMultipart<S, R> {
    return new TableDataMultipartImpl(content)
}
class TableDataMultipartImpl<S, R, P> implements TableDataMultipart<S, R> {
    readonly type = "multipart" as const

    data: TableDataChildrenProvider<S, P>
    cellProvider: TableDataMultipartCellProvider<S, R, P>
    container: Readonly<{
        borders: TableDataHorizontalBorder[]
    }>
    visibleKeys: Readonly<{ type: "all" }> | Readonly<{ type: "filtered"; keys: TableDataCellKey[] }>

    constructor({ data, cells }: TableDataMultipartContent<S, R, P>) {
        this.data = data
        this.cellProvider = cells
        this.container = {
            borders: [],
        }
        this.visibleKeys = { type: "all" }
    }

    cells(summary: S): TableDataCell<S, R>[] {
        return this.data(summary).flatMap((part) =>
            this.cellProvider(part).map((cell) => cell.horizontalBorder(this.container.borders))
        )
    }

    view(summary: S): TableDataView[] {
        return this.cells(summary).flatMap((cell) => cell.view(summary))
    }
    header(summary: S): TableDataHeader[] {
        return this.cells(summary).flatMap((cell) => cell.header(summary))
    }
    prepend(summary: S): TableDataPrepend[] {
        return this.cells(summary).flatMap((cell) => cell.prepend(summary))
    }
    column(row: R, summary: S): TableDataColumn[] {
        return this.cells(summary).flatMap((cell) => cell.column(row, summary))
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataMultipart<S, R> {
        this.container = { ...this.container, borders }
        return this
    }

    filterVisibleCells(keys: TableDataCellKey[]): TableDataFilteredCell<TableDataMultipart<S, R>> {
        const duplicate = new TableDataMultipartImpl({
            data: this.data,
            cells: this.cellProvider,
        })
        duplicate.container = this.container
        duplicate.visibleKeys = { type: "filtered", keys }

        // multipart は data を呼び出す前にデータが空であることを検証できないので isVisible は常に true
        return { cell: duplicate, isVisible: true }
    }
}

export type TableDataTreeContent<S, R, C> = Readonly<{
    data: TableDataChildrenProvider<R, C>
    key: TableDataRowKeyProvider<C>
    cells: TableDataCell<S, C>[]
}>
export function tableData_tree<S, R, C>(content: TableDataTreeContent<S, R, C>): TableDataTree<S, R> {
    return new TableDataTreeImpl(content)
}
class TableDataTreeImpl<S, R, C> implements TableDataTree<S, R> {
    readonly type = "tree" as const

    data: TableDataChildrenProvider<R, C>
    key: TableDataRowKeyProvider<C>
    cells: TableDataCell<S, C>[]

    container: Readonly<{
        tree: TableDataTreeContainer<R>
    }>

    constructor({ data, key, cells }: TableDataTreeContent<S, R, C>) {
        this.data = data
        this.key = key
        this.cells = cells
        this.container = {
            tree: {
                baseStyle: defaultRowStyle(),
                decorators: [],
            },
        }
    }

    view(summary: S): TableDataView[] {
        return this.cells.flatMap((cell) => cell.view(summary))
    }
    header(summary: S): TableDataHeader[] {
        return this.cells.flatMap((cell) => cell.header(summary))
    }
    prepend(summary: S): TableDataPrepend[] {
        return this.cells.flatMap((cell) => cell.prepend(summary))
    }
    column(row: R, summary: S): TableDataColumnTree {
        const children = this.children(row, summary)
        return {
            type: "tree",
            style: this.container.tree.decorators.reduce(
                (acc, decorator) => decorateRowStyle(acc, decorator(row)),
                this.container.tree.baseStyle
            ),
            children,
            height: height(children),
        }

        function height(rows: TableDataColumnCollection[]): number {
            return Math.max(
                1,
                rows
                    .map((tree) =>
                        Math.max(
                            ...tree.columns.map((column) => {
                                switch (column.type) {
                                    case "single":
                                    case "extract":
                                        return 1

                                    case "tree":
                                        return height(column.children)
                                }
                            })
                        )
                    )
                    .reduce((acc, height) => acc + height, 0)
            )
        }
    }
    children(row: R, summary: S): TableDataColumnCollection[] {
        return this.data(row).map(
            (child): TableDataColumnCollection => {
                return {
                    key: this.key(child),
                    columns: this.cells.flatMap((cell) => cell.column(child, summary)),
                }
            }
        )
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataTree<S, R> {
        this.cells = this.cells.map((cell) => cell.horizontalBorder(borders))
        return this
    }
    decorateRow(decorator: TableDataRowDecorator<R>): TableDataTree<S, R> {
        this.container = {
            ...this.container,
            tree: decorateRow(this.container.tree, decorator),
        }
        return this
    }

    filterVisibleCells(keys: TableDataCellKey[]): TableDataFilteredCell<TableDataTree<S, R>> {
        const duplicate = new TableDataTreeImpl({
            data: this.data,
            key: this.key,
            cells: filterVisibleCells(this.cells, keys),
        })
        duplicate.container = this.container
        return { cell: duplicate, isVisible: duplicate.cells.length > 0 }
    }
}

export type TableRowContent<S, R> = Readonly<{
    key: TableDataRowKeyProvider<R>
    cells: TableDataCell<S, R>[]
}>
export function tableRow<S, R>(content: TableRowContent<S, R>): TableRow<S, R> {
    return new TableRowImpl(content)
}
class TableRowImpl<S, R> implements TableRow<S, R> {
    key: TableDataRowKeyProvider<R>
    cells: TableDataCell<S, R>[]

    container: Readonly<{
        tree: TableDataTreeContainer<R>
    }>

    constructor({ key, cells }: TableRowContent<S, R>) {
        this.key = key
        this.cells = cells
        this.container = {
            tree: {
                baseStyle: defaultRowStyle(),
                decorators: [],
            },
        }
    }

    view(summary: S): TableDataView[] {
        return this.cells.flatMap((cell) => cell.view(summary))
    }
    header(summary: S): TableDataHeader[] {
        return this.cells.flatMap((cell) => cell.header(summary))
    }
    prepend(summary: S): TableDataPrepend[] {
        return this.cells.flatMap((cell) => cell.prepend(summary))
    }
    column(row: R, summary: S): TableDataColumnCollection {
        return {
            key: this.key(row),
            columns: this.cells.flatMap((cell) => cell.column(row, summary)),
        }
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableRow<S, R> {
        this.cells = this.cells.map((cell) => cell.horizontalBorder(borders))
        return this
    }
    decorateRow(decorator: TableDataRowDecorator<R>): TableRow<S, R> {
        this.container = {
            ...this.container,
            tree: decorateRow(this.container.tree, decorator),
        }
        return this
    }

    filterVisibleCells(keys: TableDataCellKey[]): TableDataFilteredCell<TableRow<S, R>> {
        const duplicate = new TableRowImpl({
            key: this.key,
            cells: filterVisibleCells(this.cells, keys),
        })
        duplicate.container = this.container
        return { cell: duplicate, isVisible: duplicate.cells.length > 0 }
    }

    freeze(): TableRowFrozen<S, R> {
        return this
    }
}

function decorateView(
    container: TableDataViewContainer,
    decorator: TableDataViewDecorator
): TableDataViewContainer {
    return { ...container, decorator }
}
function decorateHeader(
    container: TableDataHeaderContainer,
    decorator: TableDataHeaderDecorator
): TableDataHeaderContainer {
    return { ...container, style: decorateStyle(container.style, decorator) }
}
function decorateGroup(
    container: TableDataGroupContainer,
    decorator: TableDataGroupDecorator
): TableDataGroupContainer {
    return { ...container, style: decorateGroupStyle(container.style, decorator) }
}
function decorateColumn<R>(
    container: TableDataColumnContainer<R>,
    decorator: TableDataColumnDecorator<R>
): TableDataColumnContainer<R> {
    return { ...container, decorators: [...container.decorators, decorator] }
}
function setPrepend(
    container: TableDataPrependContainer,
    content: TableDataPrependProvider
): TableDataPrependContainer {
    return { ...container, content }
}
function decoratePrepend(
    container: TableDataPrependContainer,
    decorator: TableDataPrependDecorator
): TableDataPrependContainer {
    return { ...container, style: decorateStyle(container.style, decorator) }
}
function decorateRow<R>(
    container: TableDataTreeContainer<R>,
    decorator: TableDataRowDecorator<R>
): TableDataTreeContainer<R> {
    return { ...container, decorators: [...container.decorators, decorator] }
}

function decorateStyle(style: TableDataStyle, decorator: TableDataStyleDecorator): TableDataStyle {
    switch (decorator.type) {
        case "border":
            return { ...style, border: decorator.decorate(style.border) }

        case "align":
            return { ...style, align: decorator.decorate(style.align) }

        case "className":
            return { ...style, className: [...style.className, ...decorator.classNames()] }
    }
}
function decorateGroupStyle(
    style: TableDataGroupStyle,
    decorator: TableDataGroupStyleDecorator
): TableDataGroupStyle {
    switch (decorator.type) {
        case "border":
            return { ...style, border: decorator.decorate(style.border) }

        case "align":
            return { ...style, align: decorator.decorate(style.align) }

        case "className":
            return { ...style, className: [...style.className, ...decorator.classNames()] }
    }
}
function decorateRowStyle(
    style: TableDataRowStyle,
    decorator: TableDataRowStyleDecorator
): TableDataRowStyle {
    switch (decorator.type) {
        case "className":
            return { ...style, className: [...style.className, ...decorator.classNames()] }
    }
}

function filterVisibleCells<S, R>(
    cells: TableDataCell<S, R>[],
    keys: TableDataCellKey[]
): TableDataCell<S, R>[] {
    return cells.flatMap((cell) => {
        const { cell: filteredCell, isVisible } = cell.filterVisibleCells(keys)
        if (isVisible) {
            return []
        }
        return filteredCell
    })
}

type TableDataViewContainer = Readonly<{
    decorator: TableDataContentDecoratorProvider
}>
type TableDataHeaderContainer = Readonly<{
    style: TableDataStyle
    content: TableDataContentDecorator
}>
type TableDataGroupContainer = Readonly<{
    style: TableDataGroupStyle
    content: TableDataContentProvider
}>
type TableDataPrependContainer = Readonly<{
    style: TableDataStyle
    content: TableDataPrependProvider
}>
type TableDataColumnContainer<T> = Readonly<{
    baseStyle: TableDataStyle
    content: TableDataColumnContentProvider<T>
    decorators: TableDataColumnDecorator<T>[]
}>
type TableDataTreeContainer<T> = Readonly<{
    baseStyle: TableDataRowStyle
    decorators: TableDataRowDecorator<T>[]
}>

// TODO こいつらは要らないかも : 後で見直す
type TableDataViewDecorator = TableDataContentDecoratorProvider
type TableDataHeaderDecorator = TableDataStyleDecorator
type TableDataGroupDecorator = TableDataGroupStyleDecorator
type TableDataPrependDecorator = TableDataStyleDecorator
type TableDataColumnDecorator<R> = { (row: R): TableDataStyleDecorator }
type TableDataRowDecorator<R> = { (row: R): TableDataRowStyleDecorator }

interface TableDataContentProvider {
    (): VNodeContent
}
interface TableDataContentDecorator {
    (label: VNodeContent): VNodeContent
}
interface TableDataColumnContentProvider<R> {
    (row: R): VNodeContent
}
interface TableDataExtractLengthProvider<R> {
    (summary: R): number
}
interface TableDataMultipartCellProvider<S, R, C> {
    (child: C): TableDataCell<S, R>[]
}
interface TableDataRowKeyProvider<R> {
    (row: R): VNodeKey
}
interface TableDataChildrenProvider<R, C> {
    (row: R): C[]
}

type TableDataContentDecoratorProvider =
    | Readonly<{ type: "none" }>
    | Readonly<{ type: "decorate"; decorator: TableDataContentDecorator }>

function decorateContent(
    content: VNodeContent,
    decorator: TableDataContentDecoratorProvider
): VNodeContent {
    switch (decorator.type) {
        case "none":
            return content

        case "decorate":
            return decorator.decorator(content)
    }
}

type TableDataPrependProvider =
    | Readonly<{ type: "none" }>
    | Readonly<{ type: "content"; content: TableDataContentProvider }>

type TableDataStyle = Readonly<{
    border: TableDataBorderStyle
    align: TableDataAlignStyle
    className: TableDataClassName
}>
type TableDataGroupStyle = Readonly<{
    border: TableDataHorizontalBorderStyle
    align: TableDataAlignStyle
    className: TableDataClassName
}>
type TableDataRowStyle = Readonly<{
    className: TableDataClassName
}>

function defaultHeaderStyle(): TableDataStyle {
    return {
        border: {
            top: "single",
            bottom: "double",
            left: "none",
            right: "none",
        },
        align: {
            vertical: "bottom",
            horizontal: "left",
        },
        className: [],
    }
}
function defaultGroupStyle(): TableDataGroupStyle {
    return {
        border: {
            top: "single",
            bottom: "double",
        },
        align: {
            vertical: "bottom",
            horizontal: "left",
        },
        className: [],
    }
}
function defaultPrependStyle(): TableDataStyle {
    return {
        border: {
            top: "none",
            bottom: "double",
            left: "none",
            right: "none",
        },
        align: {
            vertical: "top",
            horizontal: "left",
        },
        className: [],
    }
}
function defaultColumnStyle(): TableDataStyle {
    return {
        border: {
            top: "none",
            bottom: "single",
            left: "none",
            right: "none",
        },
        align: {
            vertical: "top",
            horizontal: "left",
        },
        className: [],
    }
}
function defaultRowStyle(): TableDataRowStyle {
    return {
        className: [],
    }
}

function mergeVerticalBorder(
    group: TableDataGroupStyle,
    vertical: TableDataVerticalBorderStyle
): TableDataStyle {
    return {
        ...group,
        border: mergeBorderStyle(group.border, vertical),
    }
}

export type TableDataVerticalBorder = "left" | "leftDouble" | "right" | "rightDouble" | "none"
export type TableDataHorizontalBorder = "top" | "topDouble" | "bottom" | "bottomDouble" | "none"

type TableDataBorderStyle = Readonly<{
    top: TableDataBorderClass
    bottom: TableDataBorderClass
    left: TableDataBorderClass
    right: TableDataBorderClass
}>
type TableDataHorizontalBorderStyle = Readonly<{
    top: TableDataBorderClass
    bottom: TableDataBorderClass
}>
type TableDataVerticalBorderStyle = Readonly<{
    left: TableDataBorderClass
    right: TableDataBorderClass
}>
type TableDataBorderClass = "none" | "single" | "double"

function mergeBorderStyle(
    horizontal: TableDataHorizontalBorderStyle,
    vertical: TableDataVerticalBorderStyle
): TableDataBorderStyle {
    return { ...horizontal, ...vertical }
}

type TableDataAlignStyle = Readonly<{
    vertical: TableDataVerticalAlign
    horizontal: TableDataHorizontalAlign
}>
type TableDataVerticalAlign = "top" | "middle" | "bottom"
type TableDataHorizontalAlign = "left" | "center" | "right" | "numeric"

type TableDataClassName = string[]

type TableDataStyleDecorator =
    | TableDataBorderStyleDecorator
    | TableDataAlignStyleDecorator
    | TableDataClassNameDecorator

type TableDataGroupStyleDecorator =
    | TableDataHorizontalBorderStyleDecorator
    | TableDataAlignStyleDecorator
    | TableDataClassNameDecorator

type TableDataRowStyleDecorator = TableDataClassNameDecorator

interface TableDataBorderStyleDecorator {
    type: "border"
    decorate(style: TableDataBorderStyle): TableDataBorderStyle
}
interface TableDataHorizontalBorderStyleDecorator {
    type: "border"
    decorate(style: TableDataHorizontalBorderStyle): TableDataHorizontalBorderStyle
}
interface TableDataAlignStyleDecorator {
    type: "align"
    decorate(style: TableDataAlignStyle): TableDataAlignStyle
}
interface TableDataClassNameDecorator {
    type: "className"
    classNames(): TableDataClassName
}

export function verticalBorder(borders: TableDataVerticalBorder[]): TableDataStyleDecorator {
    return {
        type: "border",
        decorate: (style) => {
            const update = { left: style.left, right: style.right }
            borders.forEach((border) => {
                switch (border) {
                    case "none":
                        update.left = "none"
                        update.right = "none"
                        break

                    case "left":
                        update.left = "single"
                        break
                    case "leftDouble":
                        update.left = "double"
                        break

                    case "right":
                        update.right = "single"
                        break
                    case "rightDouble":
                        update.right = "double"
                        break

                    default:
                        assertNever(border)
                }
            })
            return { ...style, ...update }
        },
    }
}
export function horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataStyleDecorator {
    return {
        type: "border",
        decorate: (style) => {
            const update = { top: style.top, bottom: style.bottom }
            borders.forEach((border) => {
                switch (border) {
                    case "none":
                        update.top = "none"
                        update.bottom = "none"
                        break

                    case "top":
                        update.top = "single"
                        break
                    case "topDouble":
                        update.top = "double"
                        break

                    case "bottom":
                        update.bottom = "single"
                        break
                    case "bottomDouble":
                        update.bottom = "double"
                        break

                    default:
                        assertNever(border)
                }
            })
            return { ...style, ...update }
        },
    }
}

function assertNever(_: never): never {
    throw new Error("NEVER")
}

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
        tableData("id", (key) => {
            return {
                label: () => "ID",
                header: linky,
                column: (row: Row) => html`${row.id}`,
            }
        })
            .border(["rightDouble"])
            .decorateHeader(decorateBorder(["top", "bottomDouble"]))
            .decorateColumn((row) => {
                switch (row.type) {
                    case "summary":
                        return decorateAlign(["middle"])

                    default:
                        return decorateNone
                }
            }),

        tableData_group({
            key: "group",
            header: () => linky("group"),
            cells: [
                tableData_extract("extract", (key) => {
                    return {
                        label: () => "extract",
                        header: linky,
                        column: (row: Row) => row.emails.map((email) => html`${email}`),
                        length: (summary: Summary) => summary.maxEmailCount,
                    }
                })
                    .decorateHeader(decorateBorder(["top", "bottomDouble"]))
                    .border(["left"]),

                tableData_multipart({
                    data: (summary: Summary): string[] => summary.allParts,
                    cells: (part: string) => [
                        tableData(`part_${part}`, (key) => {
                            return {
                                label: () => part,
                                header: linky,
                                column: (row: Row) => html`${row.parts[part]}`,
                            }
                        }).decorateHeader(decorateBorder(["top", "bottomDouble"])),
                    ],
                }),
            ],
        }).decorateGroup(decorateBorder(["top", "bottomDouble"])),

        tableData_tree({
            data: (row: Row): RowLog[] =>
                row.logs.map((log) => {
                    return { log, row }
                }),
            key: ({ log }: RowLog) => log.id,
            cells: [
                tableData("logDate", (key) => {
                    return {
                        label: () => "log date",
                        header: linky,
                        column: ({ log, row }: RowLog) => html`${row.id} / ${log.date}`,
                    }
                }).border("left"),
            ],
        }),
    ],
})
    .horizontalBorder((row) => "bottom")
    .decorateRow((row) => decorateClassName("additional_class"))

viewColumns(
    tableView(cells, visibleKeys).map(({ isChecked, input, key }) => checkbox({ isChecked, input, key }))
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
        html`${tablePrepend(cells, visibleKeys)} ${rows.map((row) => tableRow(cells, visibleKeys, row))}`
    }
}

function linky(content: VNodeContent): VNodeContent {
    return html`<span class="linky">${content}</span>`
}
