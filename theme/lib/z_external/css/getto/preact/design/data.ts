import { html } from "htm/preact"

import { VNodeContent, VNodeKey } from "../common"
import { checkbox } from "./form"

export type TableDataCell<T> =
    | TableDataSingle<T>
    | TableDataExtract<T>
    | TableDataGroup<T>
    | TableDataTree<T>

type TableDataCellKey = VNodeKey

export interface TableDataSingle<T> {
    type: "single"

    isVisible(keys: TableDataCellKey[]): boolean

    view(): TableDataView
    header(): TableDataHeaderSingle
    prepend(): TableDataPrependSingle
    column(row: T): TableDataColumnSingle

    border(borders: TableDataVerticalBorder[]): TableDataSingle<T>
    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataSingle<T>

    decorateView(decorator: TableDataViewDecorator): TableDataSingle<T>
    decorateHeader(decorator: TableDataHeaderDecorator): TableDataSingle<T>
    setPrepend(content: TableDataPrependProvider): TableDataSingle<T>
    decoratePrepend(decorator: TableDataPrependDecorator): TableDataSingle<T>
    decorateColumn(decorator: TableDataColumnDecorator<T>): TableDataSingle<T>
}
export interface TableDataExtract<T> {
    type: "extract"

    isVisible(keys: TableDataCellKey[]): boolean

    view(): TableDataView
    header(): TableDataHeaderExtract
    prepend(): TableDataPrependExtract
    column(row: T): TableDataColumnExtract

    border(borders: TableDataVerticalBorder[]): TableDataExtract<T>
    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataExtract<T>

    decorateView(decorator: TableDataViewDecorator): TableDataExtract<T>
    decorateHeader(decorator: TableDataHeaderDecorator): TableDataExtract<T>
    setPrepend(content: TableDataPrependProvider): TableDataExtract<T>
    decoratePrepend(decorator: TableDataPrependDecorator): TableDataExtract<T>
    decorateColumn(decorator: TableDataColumnDecorator<T>): TableDataExtract<T>
}
export interface TableDataGroup<T> {
    type: "group"

    view(): TableDataView[]
    header(): TableDataHeaderGroup
    prepend(): TableDataPrepend[]
    column(row: T): TableDataColumn[]

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataGroup<T>
    decorateGroup(decorator: TableDataGroupDecorator): TableDataGroup<T>

    filterVisibleCells(keys: TableDataCellKey[]): TableDataGroup<T>
}
export interface TableDataTree<T> {
    type: "tree"

    view(): TableDataView[]
    header(): TableDataHeader[]
    prepend(): TableDataPrepend[]
    column(row: T): TableDataColumnTree

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataTree<T>
    decorateRow(decorator: TableDataRowDecorator<T>): TableDataTree<T>

    filterVisibleCells(keys: TableDataCellKey[]): TableDataTree<T>
}

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
    key: VNodeKey
    style: TableDataRowStyle
    children: TableDataColumn[][]
    height: number
}>

export type TableDataSingleContent<T> = Readonly<{
    label: TableDataContentProvider
    header: TableDataContentDecorator
    column: TableDataColumnContentProvider<T>
}>
export function tableData<T>(
    key: TableDataCellKey,
    content: { (key: TableDataCellKey): TableDataSingleContent<T> }
): TableDataSingle<T> {
    return new TableDataSingleImpl(key, content(key))
}
class TableDataSingleImpl<T> implements TableDataSingle<T> {
    readonly type = "single" as const

    key: TableDataCellKey
    container: Readonly<{
        label: TableDataContentProvider
        view: TableDataViewContainer
        header: TableDataHeaderContainer
        prepend: TableDataPrependContainer
        column: TableDataColumnContainer<T>
    }>

    constructor(key: TableDataCellKey, { label, header, column }: TableDataSingleContent<T>) {
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

    isVisible(keys: TableDataCellKey[]): boolean {
        return keys.includes(this.key)
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
    column(row: T): TableDataColumnSingle {
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

    border(borders: TableDataVerticalBorder[]): TableDataSingle<T> {
        const decorator = verticalBorder(borders)
        this.decorateHeader(decorator)
        this.decoratePrepend(decorator)
        this.decorateColumn(() => decorator)
        return this
    }
    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataSingle<T> {
        const decorator = horizontalBorder(borders)
        this.decorateHeader(decorator)
        this.decoratePrepend(decorator)
        this.decorateColumn(() => decorator)
        return this
    }

    decorateView(decorator: TableDataViewDecorator): TableDataSingle<T> {
        this.container = {
            ...this.container,
            view: decorateView(this.container.view, decorator),
        }
        return this
    }
    decorateHeader(decorator: TableDataHeaderDecorator): TableDataSingle<T> {
        this.container = {
            ...this.container,
            header: decorateHeader(this.container.header, decorator),
        }
        return this
    }
    setPrepend(content: TableDataPrependProvider): TableDataSingle<T> {
        this.container = {
            ...this.container,
            prepend: setPrepend(this.container.prepend, content),
        }
        return this
    }
    decoratePrepend(decorator: TableDataPrependDecorator): TableDataSingle<T> {
        this.container = {
            ...this.container,
            prepend: decoratePrepend(this.container.prepend, decorator),
        }
        return this
    }
    decorateColumn(decorator: TableDataColumnDecorator<T>): TableDataSingle<T> {
        this.container = {
            ...this.container,
            column: decorateColumn(this.container.column, decorator),
        }
        return this
    }
}

export type TableDataExtractContent<T> = Readonly<{
    label: TableDataContentProvider
    header: TableDataContentDecorator
    column: TableDataColumnContentProvider<T>
    length: TableDataExtractLengthProvider
}>
export function tableData_extract<T>(
    key: TableDataCellKey,
    content: { (key: TableDataCellKey): TableDataExtractContent<T> }
): TableDataExtract<T> {
    return new TableDataExtractImpl(key, content(key))
}
class TableDataExtractImpl<T> implements TableDataExtract<T> {
    readonly type = "extract" as const

    key: TableDataCellKey
    length: TableDataExtractLengthProvider
    container: Readonly<{
        label: TableDataContentProvider
        view: TableDataViewContainer
        header: TableDataHeaderContainer
        prepend: TableDataPrependContainer
        column: TableDataColumnContainer<T>
    }>

    constructor(key: TableDataCellKey, { label, header, column, length }: TableDataExtractContent<T>) {
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

    isVisible(keys: TableDataCellKey[]): boolean {
        return keys.includes(this.key)
    }

    view(): TableDataView {
        return {
            key: this.key,
            content: decorateContent(this.container.label(), this.container.view.decorator),
        }
    }
    header(): TableDataHeaderExtract {
        return {
            type: "extract",
            key: this.key,
            style: this.container.header.style,
            content: this.container.header.content(this.container.label()),
            length: this.length(),
        }
    }
    prepend(): TableDataPrependExtract {
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
                    length: this.length(),
                }
        }
    }
    column(row: T): TableDataColumnExtract {
        return {
            type: "extract",
            key: this.key,
            style: this.container.column.decorators.reduce(
                (acc, decorator) => decorateStyle(acc, decorator(row)),
                this.container.column.baseStyle
            ),
            content: this.container.column.content(row),
            length: this.length(),
        }
    }

    border(borders: TableDataVerticalBorder[]): TableDataExtract<T> {
        const decorator = verticalBorder(borders)
        this.decorateHeader(decorator)
        this.decoratePrepend(decorator)
        this.decorateColumn(() => decorator)
        return this
    }
    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataExtract<T> {
        const decorator = horizontalBorder(borders)
        this.decorateHeader(decorator)
        this.decoratePrepend(decorator)
        this.decorateColumn(() => decorator)
        return this
    }

    decorateView(decorator: TableDataViewDecorator): TableDataExtract<T> {
        this.container = {
            ...this.container,
            view: decorateView(this.container.view, decorator),
        }
        return this
    }
    decorateHeader(decorator: TableDataHeaderDecorator): TableDataExtract<T> {
        this.container = {
            ...this.container,
            header: decorateHeader(this.container.header, decorator),
        }
        return this
    }
    setPrepend(content: TableDataPrependProvider): TableDataExtract<T> {
        this.container = {
            ...this.container,
            prepend: setPrepend(this.container.prepend, content),
        }
        return this
    }
    decoratePrepend(decorator: TableDataPrependDecorator): TableDataExtract<T> {
        this.container = {
            ...this.container,
            prepend: decoratePrepend(this.container.prepend, decorator),
        }
        return this
    }
    decorateColumn(decorator: TableDataColumnDecorator<T>): TableDataExtract<T> {
        this.container = {
            ...this.container,
            column: decorateColumn(this.container.column, decorator),
        }
        return this
    }
}

export type TableDataGroupContent<T> = Readonly<{
    key: TableDataCellKey
    header: TableDataContentProvider
    cells: TableDataCell<T>[]
}>
export function tableData_group<T>(content: TableDataGroupContent<T>): TableDataGroup<T> {
    return new TableDataGroupImpl(content)
}
class TableDataGroupImpl<T> implements TableDataGroup<T> {
    readonly type = "group" as const

    key: TableDataCellKey

    cells: TableDataCell<T>[]
    container: Readonly<{
        group: TableDataGroupContainer
    }>

    constructor({ key, header, cells }: TableDataGroupContent<T>) {
        this.key = key
        this.cells = cells
        this.container = {
            group: {
                style: defaultGroupStyle(),
                content: header,
            },
        }
    }

    view(): TableDataView[] {
        return this.cells.flatMap((cell) => cell.view())
    }
    header(): TableDataHeaderGroup {
        const children = this.children()
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
    children(): TableDataHeader[] {
        return this.cells.flatMap((cell) => cell.header())
    }
    prepend(): TableDataPrepend[] {
        return this.cells.flatMap((cell) => cell.prepend())
    }
    column(row: T): TableDataColumn[] {
        return this.cells.flatMap((cell) => cell.column(row))
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataGroup<T> {
        this.cells = this.cells.map((cell) => cell.horizontalBorder(borders))
        return this
    }

    decorateGroup(decorator: TableDataHeaderDecorator): TableDataGroup<T> {
        this.container = {
            ...this.container,
            group: decorateGroup(this.container.group, decorator),
        }
        return this
    }

    filterVisibleCells(keys: TableDataCellKey[]): TableDataGroup<T> {
        const duplicate = new TableDataGroupImpl({
            key: this.key,
            header: this.container.group.content,
            cells: filterVisibleCells(this.cells, keys),
        })
        duplicate.container = this.container
        return duplicate
    }
}

export type TableDataTreeContent<T, C> = Readonly<{
    data: TableDataChildrenProvider<T, C>
    key: TableDataRowKeyProvider<T>
    cells: TableDataCell<C>[]
}>
export function tableData_tree<T, C>(content: TableDataTreeContent<T, C>): TableDataTree<T> {
    return new TableDataTreeImpl(content)
}
class TableDataTreeImpl<T, C> implements TableDataTree<T> {
    readonly type = "tree" as const

    data: TableDataChildrenProvider<T, C>
    key: TableDataRowKeyProvider<T>
    cells: TableDataCell<C>[]

    container: Readonly<{
        isVisible: boolean
        tree: TableDataTreeContainer<T>
    }>

    constructor({ data, key, cells }: TableDataTreeContent<T, C>) {
        this.data = data
        this.key = key
        this.cells = cells
        this.container = {
            isVisible: true,
            tree: {
                baseStyle: defaultRowStyle(),
                decorators: [],
            },
        }
    }

    view(): TableDataView[] {
        return this.cells.flatMap((cell) => cell.view())
    }
    header(): TableDataHeader[] {
        return this.cells.flatMap((cell) => cell.header())
    }
    prepend(): TableDataPrepend[] {
        return this.cells.flatMap((cell) => cell.prepend())
    }
    column(row: T): TableDataColumnTree {
        const children = this.children(row)
        return {
            type: "tree",
            key: this.key(row),
            style: this.container.tree.decorators.reduce(
                (acc, decorator) => decorateRowStyle(acc, decorator(row)),
                this.container.tree.baseStyle
            ),
            children,
            height: height(children),
        }

        function height(rows: TableDataColumn[][]): number {
            return Math.max(
                1,
                rows
                    .map((row) =>
                        Math.max(
                            ...row.map((column) => {
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
    children(row: T): TableDataColumn[][] {
        return this.data(row).map((childRow) => this.cells.flatMap((cell) => cell.column(childRow)))
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataTree<T> {
        this.cells = this.cells.map((cell) => cell.horizontalBorder(borders))
        return this
    }
    decorateRow(decorator: TableDataRowDecorator<T>): TableDataTree<T> {
        this.container = {
            ...this.container,
            tree: decorateRow(this.container.tree, decorator),
        }
        return this
    }

    filterVisibleCells(keys: TableDataCellKey[]): TableDataTree<T> {
        const duplicate = new TableDataTreeImpl({
            data: this.data,
            key: this.key,
            cells: filterVisibleCells(this.cells, keys),
        })
        duplicate.container = this.container
        return duplicate
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
function decorateColumn<T>(
    container: TableDataColumnContainer<T>,
    decorator: TableDataColumnDecorator<T>
): TableDataColumnContainer<T> {
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
function decorateRow<T>(
    container: TableDataTreeContainer<T>,
    decorator: TableDataRowDecorator<T>
): TableDataTreeContainer<T> {
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

function filterVisibleCells<T>(cells: TableDataCell<T>[], keys: TableDataCellKey[]): TableDataCell<T>[] {
    return cells.flatMap((cell) => {
        switch (cell.type) {
            case "single":
            case "extract":
                if (!cell.isVisible(keys)) {
                    return []
                }
                return cell

            case "group":
            case "tree":
                return cell.filterVisibleCells(keys)
        }
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
type TableDataColumnDecorator<T> = { (row: T): TableDataStyleDecorator }
type TableDataRowDecorator<T> = { (row: T): TableDataRowStyleDecorator }

interface TableDataContentProvider {
    (): VNodeContent
}
interface TableDataContentDecorator {
    (label: VNodeContent): VNodeContent
}
interface TableDataColumnContentProvider<T> {
    (row: T): VNodeContent
}
interface TableDataExtractLengthProvider {
    (): number
}
interface TableDataRowKeyProvider<T> {
    (row: T): VNodeKey
}
interface TableDataChildrenProvider<T, C> {
    (row: T): C[]
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

const rows = []

const visibleKeys = ["id", "union"]

const cells = tableData_cells<Summary, Row>({
    key: (row) => row.id,
    cell: [
        tableData("id", (key) => {
            return {
                label: () => "ID",
                header: linky,
                column: (row) => html`${row.id}`,
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
                        column: (row) => row.emails.map((email) => html`${email}`),
                        length: (summary) => summary.maxEmailCount,
                    }
                })
                    .decorateHeader(decorateBorder(["top", "bottomDouble"]))
                    .border(["left"]),

                tableData_multipart({
                    data: (summary) => summary.allParts,
                    cells: (part) => [
                        tableData(`part_${part}`, (key) => {
                            return {
                                label: () => part,
                                header: linky,
                                column: (row) => html`${row.parts[part]}`,
                            }
                        }).decorateHeader(decorateBorder(["top", "bottomDouble"])),
                    ],
                }),
            ],
        }).decorateGroup(decorateBorder(["top", "bottomDouble"])),

        tableData_tree({
            data: (row) =>
                row.logs.map((log) => {
                    return { log, row }
                }),
            key: ({ log }) => log.id,
            cells: [
                tableData("logDate", (key) => {
                    return {
                        label: () => "log date",
                        header: linky,
                        column: ({ log, row }) => html`${row.id} / ${log.date}`,
                    }
                }).border("left"),
            ],
        }),
    ],
})
    .rowBorder((row) => "bottom")
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
