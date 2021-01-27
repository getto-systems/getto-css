import { VNodeContent, VNodeKey } from "../../../common"

import {
    TableDataColumn,
    TableDataColumnExtract,
    TableDataColumnRow,
    TableDataColumnSingle,
    TableDataColumnTree,
    TableDataFooterRow,
    TableDataHeader,
    TableDataHeaderExtract,
    TableDataHeaderGroup,
    TableDataHeaderKeyProvider,
    TableDataHeaderRow,
    TableDataHeaderSingle,
    TableDataSummary,
    TableDataSummaryExtract,
    TableDataKeyProvider,
    TableDataSummaryRow,
    TableDataSummarySingle,
    TableDataView,
    TableDataRowSpec,
} from "../table"

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
    TableDataHorizontalBorder,
    TableDataSticky,
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
    footer(params: TableDataStyledParams<M>): TableDataSummarySingle[]
}
export interface TableDataExtract<M, R>
    extends TableDataCell_base<TableDataExtract<M, R>, R>,
        TableDataCell_leaf<TableDataExtract<M, R>> {
    type: "extract"

    view(params: TableDataParams<M>): TableDataView
    header(params: TableDataStyledParams<M>): TableDataHeaderExtract[]
    summary(params: TableDataStyledParams<M>): TableDataSummaryExtract[]
    column(params: TableDataRelatedParams<M, R>): TableDataColumnExtract[]
    footer(params: TableDataStyledParams<M>): TableDataSummaryExtract[]
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
    border(borders: TableDataVerticalBorder[]): T
    setSummary(content: TableDataSummaryProvider): T
    setFooter(content: TableDataSummaryProvider): T
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
interface TableDataCell_row<T> {
    setHeaderKey(key: TableDataHeaderKeyProvider): T
    setSummaryKey(key: TableDataKeyProvider): T
    setFooterKey(key: TableDataKeyProvider): T

    stickyHeader(): T
    stickyColumn(n: number): T
    stickyCross(n: number): T
}

export interface TableSpec<M, R> {
    view(params: TableDataParams<M>): TableDataView[]
    header(params: TableDataParams<M>): TableDataRowSpec<TableDataHeaderRow>
    summary(params: TableDataParams<M>): TableDataRowSpec<TableDataSummaryRow>
    column(params: TableDataColumnParams<M, R>): TableDataRowSpec<TableDataColumnRow>
    footer(params: TableDataParams<M>): TableDataRowSpec<TableDataFooterRow>

    // sticky 情報
    // header : off / on
    // column : off / number
    sticky(): TableDataSticky
}
export interface TableSpec_hot<M, R>
    extends TableDataCell_base<TableSpec_hot<M, R>, R>,
        TableDataCell_tree<TableSpec_hot<M, R>, R>,
        TableDataCell_row<TableSpec_hot<M, R>> {
    freeze(): TableSpec<M, R>
}

export type TableDataParams<M> = Readonly<{ model: M; visibleKeys: TableDataCellKey[] }>
export type TableDataStyledParams<M> = TableDataParams<M> & Readonly<{ base: TableDataStyle }>
export type TableDataRelatedParams<M, R> = TableDataStyledParams<M> & Readonly<{ row: R }>
export type TableDataColumnParams<M, R> = TableDataParams<M> & Readonly<{ row: R }>

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
export function tableCellFooter<M, R>(
    params: TableDataStyledParams<M>,
    style: TableDataStyle,
    cells: TableDataCell<M, R>[]
): TableDataSummary[] {
    return cells.flatMap((cell) =>
        cell.footer({ ...params, base: extendStyle({ base: params.base, style }) })
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

export function isVisibleKey(key: TableDataCellKey, visibleKeys: TableDataCellKey[]): boolean {
    return visibleKeys.includes(key)
}
