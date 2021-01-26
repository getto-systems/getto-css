import { VNodeContent, VNodeKey } from "../../../common"

import {
    decorateStyle,
    TableDataColumnDecorator,
    TableDataColumnRelatedDecorator,
    TableDataGroupDecorator,
    TableDataHeaderDecorator,
    TableDataHorizontalBorderProvider,
    TableDataRowDecorator,
    TableDataRowRelatedDecorator,
    TableDataSummaryDecorator,
    TableDataSummaryProvider,
    TableDataViewDecorator,
} from "./decorator"
import {
    extendStyle,
    TableDataFullStyle,
    TableDataHorizontalBorder,
    TableDataRowStyle,
    TableDataStyle,
    TableDataVerticalBorder,
} from "./style"

export type TableDataCell<M, R> =
    | TableDataSingle<M, R>
    | TableDataExtract<M, R>
    | TableDataGroup<M, R>
    | TableDataMultipart<M, R>
    | TableDataTree<M, R>

export type TableDataCellKey = VNodeKey

export interface TableDataSingle<M, R>
    extends TableDataCell_base<TableDataSingle<M, R>, R>,
        TableDataCell_leaf<TableDataSingle<M, R>> {
    type: "single"

    view(params: TableDataParams<M>): TableDataView
    header(params: TableDataStyledParams<M>): TableDataHeaderSingle[]
    summary(params: TableDataStyledParams<M>): TableDataSummarySingle[]
    column(params: TableDataRelatedParams<M, R>): TableDataColumnSingle[]
}
export interface TableDataExtract<M, R>
    extends TableDataCell_base<TableDataExtract<M, R>, R>,
        TableDataCell_leaf<TableDataExtract<M, R>> {
    type: "extract"

    view(params: TableDataParams<M>): TableDataView
    header(params: TableDataStyledParams<M>): TableDataHeaderExtract[]
    summary(params: TableDataStyledParams<M>): TableDataSummaryExtract[]
    column(params: TableDataRelatedParams<M, R>): TableDataColumnExtract[]
}
export interface TableDataGroup<M, R>
    extends TableDataCell_base<TableDataGroup<M, R>, R>,
        TableDataCell_group<TableDataGroup<M, R>> {
    type: "group"

    view(params: TableDataParams<M>): TableDataView[]
    header(params: TableDataStyledParams<M>): TableDataHeaderGroup[]
    summary(params: TableDataStyledParams<M>): TableDataSummary[]
    column(params: TableDataRelatedParams<M, R>): TableDataColumn[]
}
export interface TableDataMultipart<M, R> extends TableDataCell_base<TableDataMultipart<M, R>, R> {
    type: "multipart"

    view(params: TableDataParams<M>): TableDataView[]
    header(params: TableDataStyledParams<M>): TableDataHeader[]
    summary(params: TableDataStyledParams<M>): TableDataSummary[]
    column(params: TableDataRelatedParams<M, R>): TableDataColumn[]
}
export interface TableDataTree<M, R>
    extends TableDataCell_base<TableDataTree<M, R>, R>,
        TableDataCell_tree<TableDataTree<M, R>, R> {
    type: "tree"

    view(params: TableDataParams<M>): TableDataView[]
    header(params: TableDataStyledParams<M>): TableDataHeader[]
    summary(params: TableDataStyledParams<M>): TableDataSummary[]
    column(params: TableDataRelatedParams<M, R>): TableDataColumnTree[]
}

interface TableDataCell_base<T, R> {
    horizontalBorder(borders: TableDataHorizontalBorder[]): T
    horizontalBorderRelated(borders: TableDataHorizontalBorderProvider<R>): T
    horizontalBorder_header(borders: TableDataHorizontalBorder[]): T
    horizontalBorder_summary(borders: TableDataHorizontalBorder[]): T

    decorateHeader(decorator: TableDataHeaderDecorator): T
    decorateSummary(decorator: TableDataSummaryDecorator): T
    decorateColumn(decorator: TableDataColumnDecorator): T
    decorateColumnRelated(decorator: TableDataColumnRelatedDecorator<R>): T
}
interface TableDataCell_leaf<T> {
    border(borders: TableDataVerticalBorder[]): T
    setSummary(content: TableDataSummaryProvider): T
    decorateView(decorator: TableDataViewDecorator): T
}
interface TableDataCell_group<T> {
    decorateView(decorator: TableDataViewDecorator): T
    decorateGroup(decorator: TableDataGroupDecorator): T
}
interface TableDataCell_tree<T, R> {
    decorateRow(decorator: TableDataRowDecorator): T
    decorateRowRelated(decorator: TableDataRowRelatedDecorator<R>): T
}

export interface TableRow<M, R> {
    view(params: TableDataParams<M>): TableDataView[]
    header(params: TableDataParams<M>): TableDataHeader[]
    summary(params: TableDataParams<M>): TableDataSummary[]
    column(params: TableDataRowParams<M, R>): TableDataColumnCollection
}
export interface TableRowHot<M, R>
    extends TableDataCell_base<TableRowHot<M, R>, R>,
        TableDataCell_tree<TableRowHot<M, R>, R> {
    freeze(): TableRow<M, R>
}

export type TableDataParams<M> = Readonly<{ model: M; visibleKeys: TableDataVisibleKeys }>
export type TableDataStyledParams<M> = TableDataParams<M> & Readonly<{ base: TableDataStyle }>
export type TableDataRelatedParams<M, R> = TableDataStyledParams<M> & Readonly<{ row: R }>
export type TableDataRowParams<M, R> = TableDataParams<M> & Readonly<{ row: R }>

export type TableDataView = Readonly<{
    key: VNodeKey
    content: VNodeContent
    isVisible: boolean
}>

export type TableDataHeader = TableDataHeaderSingle | TableDataHeaderExtract | TableDataHeaderGroup

export type TableDataHeaderSingle = Readonly<{
    type: "single"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
}>
export type TableDataHeaderExtract = Readonly<{
    type: "extract"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
    length: number
}>
export type TableDataHeaderGroup = Readonly<{
    type: "group"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
    children: TableDataHeader[]
}>

export type TableDataSummary = TableDataSummarySingle | TableDataSummaryExtract

export type TableDataSummaryEmpty = Readonly<{
    type: "empty"
    key: VNodeKey
    style: TableDataFullStyle
}>
export type TableDataSummarySingle =
    | TableDataSummaryEmpty
    | Readonly<{
          type: "single"
          key: VNodeKey
          style: TableDataFullStyle
          content: VNodeContent
      }>
export type TableDataSummaryExtract =
    | TableDataSummaryEmpty
    | Readonly<{
          type: "extract"
          key: VNodeKey
          style: TableDataFullStyle
          content: VNodeContent
          length: number
      }>

export type TableDataColumn = TableDataColumnSingle | TableDataColumnExtract | TableDataColumnTree

export type TableDataColumnSingle = Readonly<{
    type: "single"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
}>
export type TableDataColumnExtract = Readonly<{
    type: "extract"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
    length: number
}>
export type TableDataColumnTree = Readonly<{
    type: "tree"
    style: TableDataRowStyle
    children: TableDataColumnCollection[]
    width: number
    height: number
}>
export type TableDataColumnCollection = Readonly<{
    key: VNodeKey
    columns: TableDataColumn[]
}>

export interface TableDataColumnContentProvider<R> {
    (row: R): VNodeContent
}

export interface TableDataRowKeyProvider<R> {
    (row: R): VNodeKey
}
export interface TableDataChildrenProvider<R, C> {
    (row: R): C[]
}

export function tableCellView<M, R>(
    params: TableDataParams<M>,
    cells: TableDataCell<M, R>[]
): TableDataView[] {
    return cells.flatMap((cell) => cell.view(params))
}
export function tableCellHeader<M, R>(
    params: TableDataStyledParams<M>,
    style: TableDataStyle,
    cells: TableDataCell<M, R>[]
): TableDataHeader[] {
    return cells.flatMap((cell) =>
        cell.header({ ...params, base: extendStyle({ base: params.base, style }) })
    )
}
export function tableCellSummary<M, R>(
    params: TableDataStyledParams<M>,
    style: TableDataStyle,
    cells: TableDataCell<M, R>[]
): TableDataSummary[] {
    return cells.flatMap((cell) =>
        cell.summary({ ...params, base: extendStyle({ base: params.base, style }) })
    )
}
export function tableCellColumn<M, R>(
    params: TableDataRelatedParams<M, R>,
    style: TableDataStyle,
    decorators: TableDataColumnRelatedDecorator<R>[],
    cells: TableDataCell<M, R>[]
): TableDataColumn[] {
    return cells.flatMap((cell) =>
        cell.column({ ...params, base: extendStyle({ base: params.base, style: decorated(style) }) })
    )

    function decorated(style: TableDataStyle) {
        return decorators.reduce((acc, decorator) => decorateStyle(acc, decorator(params.row)), style)
    }
}
export function tableCellChildColumn<M, R, C>(
    child: C,
    params: TableDataRelatedParams<M, R>,
    style: TableDataStyle,
    decorators: TableDataColumnRelatedDecorator<R>[],
    cells: TableDataCell<M, C>[]
): TableDataColumn[] {
    return cells.flatMap((cell) =>
        cell.column({
            ...params,
            row: child,
            base: extendStyle({ base: params.base, style: decorated(style) }),
        })
    )

    function decorated(style: TableDataStyle) {
        return decorators.reduce((acc, decorator) => decorateStyle(acc, decorator(params.row)), style)
    }
}

export function isVisibleKey(key: TableDataCellKey, visibleKeys: TableDataVisibleKeys): boolean {
    switch (visibleKeys.type) {
        case "all":
            return true
        case "filtered":
            return visibleKeys.keys.includes(key)
    }
}

export type TableDataVisibleKeys =
    | Readonly<{ type: "all" }>
    | Readonly<{ type: "filtered"; keys: TableDataCellKey[] }>
