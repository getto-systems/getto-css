import { VNodeContent, VNodeKey } from "../../preact/common"

import {
    TableDataColumn,
    TableDataColumnExpansion,
    TableDataColumnSingle,
    TableDataColumnTree,
    TableDataHeader,
    TableDataHeaderExpansion,
    TableDataHeaderGroup,
    TableDataHeaderKeyProvider,
    TableDataHeaderSingle,
    TableDataSummary,
    TableDataSummaryExpansion,
    TableDataKeyProvider,
    TableDataSummarySingle,
    TableDataView,
    TableStructure,
    TableDataParams,
    TableDataCellKey,
    TableDataVisibleKeys,
} from "./core"

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
import { extendStyle, TableDataHorizontalBorder, TableDataStyle, TableDataVerticalBorder } from "./style"

export type TableDataCell<M, R> =
    | TableDataSingle<M, R>
    | TableDataExpansion<M, R>
    | TableDataGroup<M, R>
    | TableDataMultipart<M, R>
    | TableDataTree<M, R>

export interface TableDataSingle<M, R>
    extends TableDataCell_base<TableDataSingle<M, R>, R>,
        TableDataCell_leaf<TableDataSingle<M, R>> {
    type: "single"

    view(params: TableDataParams<M>): TableDataView[]
    header(params: TableDataStyledParams<M>): TableDataHeaderSingle[]
    summary(params: TableDataStyledParams<M>): TableDataSummarySingle[]
    column(params: TableDataRelatedParams<M, R>): TableDataColumnSingle[]
    footer(params: TableDataStyledParams<M>): TableDataSummarySingle[]
}
export interface TableDataExpansion<M, R>
    extends TableDataCell_base<TableDataExpansion<M, R>, R>,
        TableDataCell_leaf<TableDataExpansion<M, R>> {
    type: "expansion"

    view(params: TableDataParams<M>): TableDataView[]
    header(params: TableDataStyledParams<M>): TableDataHeaderExpansion[]
    summary(params: TableDataStyledParams<M>): TableDataSummaryExpansion[]
    column(params: TableDataRelatedParams<M, R>): TableDataColumnExpansion[]
    footer(params: TableDataStyledParams<M>): TableDataSummaryExpansion[]
}
export interface TableDataGroup<M, R>
    extends TableDataCell_base<TableDataGroup<M, R>, R>,
        TableDataCell_group<TableDataGroup<M, R>> {
    type: "group"

    view(params: TableDataParams<M>): TableDataView[]
    header(params: TableDataStyledParams<M>): TableDataHeaderGroup[]
    summary(params: TableDataStyledParams<M>): TableDataSummary[]
    column(params: TableDataRelatedParams<M, R>): TableDataColumn[]
    footer(params: TableDataStyledParams<M>): TableDataSummary[]
}
export interface TableDataMultipart<M, R> extends TableDataCell_base<TableDataMultipart<M, R>, R> {
    type: "multipart"

    view(params: TableDataParams<M>): TableDataView[]
    header(params: TableDataStyledParams<M>): TableDataHeader[]
    summary(params: TableDataStyledParams<M>): TableDataSummary[]
    column(params: TableDataRelatedParams<M, R>): TableDataColumn[]
    footer(params: TableDataStyledParams<M>): TableDataSummary[]
}
export interface TableDataTree<M, R>
    extends TableDataCell_base<TableDataTree<M, R>, R>,
        TableDataCell_tree<TableDataTree<M, R>, R> {
    type: "tree"

    view(params: TableDataParams<M>): TableDataView[]
    header(params: TableDataStyledParams<M>): TableDataHeader[]
    summary(params: TableDataStyledParams<M>): TableDataSummary[]
    column(params: TableDataRelatedParams<M, R>): TableDataColumnTree[]
    footer(params: TableDataStyledParams<M>): TableDataSummary[]
}

interface TableDataCell_base<T, R> {
    horizontalBorder(borders: TableDataHorizontalBorder[]): T
    horizontalBorderRelated(borders: TableDataHorizontalBorderProvider<R>): T
    horizontalBorder_header(borders: TableDataHorizontalBorder[]): T
    horizontalBorder_summary(borders: TableDataHorizontalBorder[]): T
    horizontalBorder_footer(borders: TableDataHorizontalBorder[]): T

    decorateHeader(decorator: TableDataHeaderDecorator): T
    decorateSummary(decorator: TableDataSummaryDecorator): T
    decorateColumn(decorator: TableDataColumnDecorator): T
    decorateColumnRelated(decorator: TableDataColumnRelatedDecorator<R>): T
    decorateFooter(decorator: TableDataSummaryDecorator): T
}
interface TableDataCell_leaf<T> {
    alwaysVisible(): T
    border(borders: TableDataVerticalBorder[]): T

    setSummary(content: TableDataSummaryProvider): T
    setFooter(content: TableDataSummaryProvider): T

    decorateView(decorator: TableDataViewDecorator): T
}
interface TableDataCell_group<T> {
    horizontalBorder_group(borders: TableDataHorizontalBorder[]): T

    decorateView(decorator: TableDataViewDecorator): T
    decorateGroup(decorator: TableDataGroupDecorator): T
}
interface TableDataCell_tree<T, R> {
    decorateRow(decorator: TableDataRowDecorator): T
    decorateRowRelated(decorator: TableDataRowRelatedDecorator<R>): T
}
interface TableDataCell_row<T> {
    setHeaderKey(key: TableDataHeaderKeyProvider): T
    setSummaryKey(key: TableDataKeyProvider): T
    setFooterKey(key: TableDataKeyProvider): T

    decorateHeaderRow(decorator: TableDataRowDecorator): T
    decorateSummaryRow(decorator: TableDataRowDecorator): T
    decorateFooterRow(decorator: TableDataRowDecorator): T

    stickyHeader(): T
    stickyColumn(n: number): T
    stickyCross(n: number): T
}

export interface TableStructure_hot<M, R>
    extends TableDataCell_base<TableStructure_hot<M, R>, R>,
        TableDataCell_tree<TableStructure_hot<M, R>, R>,
        TableDataCell_row<TableStructure_hot<M, R>> {
    freeze(): TableStructure<M, R>
}

export type TableDataStyledParams<M> = TableDataParams<M> & Readonly<{ base: TableDataStyle }>
export type TableDataRelatedParams<M, R> = TableDataStyledParams<M> & Readonly<{ row: R }>

export interface TableDataColumnContentProvider<R> {
    (row: R): VNodeContent
}
export interface TableDataExpansionColumnContentProvider<R> {
    (row: R): VNodeContent[]
}

export interface TableDataRowKeyProvider<R> {
    (row: R): VNodeKey
}
export interface TableDataMultipartProvider<M, P> {
    (model: M): P[]
}
export interface TableDataTreeChildrenProvider<M, R, C> {
    (row: R, model: M): C[]
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
    return tableCellBaseHeader(params, extendStyle({ base: params.base, style }), cells)
}
export function tableCellBaseHeader<M, R>(
    params: TableDataParams<M>,
    base: TableDataStyle,
    cells: TableDataCell<M, R>[]
): TableDataHeader[] {
    return cells.flatMap((cell) => cell.header({ ...params, base }))
}
export function tableCellSummary<M, R>(
    params: TableDataStyledParams<M>,
    style: TableDataStyle,
    cells: TableDataCell<M, R>[]
): TableDataSummary[] {
    return tableCellBaseSummary(params, extendStyle({ base: params.base, style }), cells)
}
export function tableCellBaseSummary<M, R>(
    params: TableDataParams<M>,
    base: TableDataStyle,
    cells: TableDataCell<M, R>[]
): TableDataSummary[] {
    return cells.flatMap((cell) => cell.summary({ ...params, base }))
}
export function tableCellColumn<M, R>(
    params: TableDataRelatedParams<M, R>,
    style: TableDataStyle,
    decorators: TableDataColumnRelatedDecorator<R>[],
    cells: TableDataCell<M, R>[]
): TableDataColumn[] {
    // decorate してから extend したいから Base は使えない
    return cells.flatMap((cell) =>
        cell.column({ ...params, base: extendStyle({ base: params.base, style: decorated(style) }) })
    )

    function decorated(style: TableDataStyle) {
        return decorators.reduce((acc, decorator) => decorateStyle(acc, decorator(params.row)), style)
    }
}
export function tableCellBaseColumn<M, R>(
    params: TableDataParams<M>,
    base: TableDataStyle,
    decorators: TableDataColumnRelatedDecorator<R>[],
    cells: TableDataCell<M, R>[],
    row: R
): TableDataColumn[] {
    return cells.flatMap((cell) => cell.column({ ...params, base: decorated(base), row }))

    function decorated(style: TableDataStyle) {
        return decorators.reduce((acc, decorator) => decorateStyle(acc, decorator(row)), style)
    }
}
export function tableCellChildColumn<M, R, C>(
    child: C,
    params: TableDataRelatedParams<M, R>,
    style: TableDataStyle,
    decorators: TableDataColumnRelatedDecorator<R>[],
    cells: TableDataCell<M, C>[]
): TableDataColumn[] {
    // decorate してから extend したいから Base は使えない
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
export function tableCellFooter<M, R>(
    params: TableDataStyledParams<M>,
    style: TableDataStyle,
    cells: TableDataCell<M, R>[]
): TableDataSummary[] {
    return tableCellBaseFooter(params, extendStyle({ base: params.base, style }), cells)
}
export function tableCellBaseFooter<M, R>(
    params: TableDataParams<M>,
    base: TableDataStyle,
    cells: TableDataCell<M, R>[]
): TableDataSummary[] {
    return cells.flatMap((cell) => cell.footer({ ...params, base }))
}

export function isVisibleKey(key: TableDataCellKey, visibleKeys: TableDataVisibleKeys): boolean {
    switch (visibleKeys.type) {
        case "all":
            return true

        case "keys":
            return visibleKeys.keys.includes(key)
    }
}
