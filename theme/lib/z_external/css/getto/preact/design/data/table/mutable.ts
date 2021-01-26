import {
    TableDataColumnDecorator,
    TableDataColumnRelatedDecorator,
    TableDataContentDecoratorProvider,
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
    TableDataHorizontalBorder,
    TableDataRowStyle,
    TableDataStyle,
    TableDataVerticalBorder,
    TableDataVerticalBorderStyle,
} from "./style"

export interface TableDataMutable_core<R> {
    headerStyleMutable(): TableDataStyleMutable
    summaryStyleMutable(): TableDataStyleMutable
    columnStyleMutable(): TableDataStyleMutable
    columnMutable(): TableDataColumnMutable<R>

    horizontalBorder(borders: TableDataHorizontalBorder[]): void
    horizontalBorderRelated(borders: TableDataHorizontalBorderProvider<R>): void
    horizontalBorder_header(borders: TableDataHorizontalBorder[]): void
    horizontalBorder_summary(borders: TableDataHorizontalBorder[]): void

    decorateHeader(decorator: TableDataHeaderDecorator): void
    decorateSummary(decorator: TableDataSummaryDecorator): void
    decorateColumn(decorator: TableDataColumnDecorator): void
    decorateColumnRelated(decorator: TableDataColumnRelatedDecorator<R>): void
}
export interface TableDataMutable_leaf {
    viewMutable(): TableDataViewMutable
    summaryMutable(): TableDataSummaryMutable
    verticalBorderMutable(): TableDataVerticalBorderMutable

    border(borders: TableDataVerticalBorder[]): void

    decorateView(decorator: TableDataViewDecorator): void
    setSummary(content: TableDataSummaryProvider): void
}
export interface TableDataMutable_group {
    viewMutable(): TableDataViewMutable
    groupStyleMutable(): TableDataStyleMutable

    decorateView(decorator: TableDataViewDecorator): void
    decorateGroup(decorator: TableDataGroupDecorator): void
}
export interface TableDataMutable_tree<R> {
    rowMutable(): TableDataRowMutable<R>

    decorateRow(decorator: TableDataRowDecorator): void
    decorateRowRelated(decorator: TableDataRowRelatedDecorator<R>): void
}

export type TableDataStyleMutable = Readonly<{
    style: TableDataStyle
}>
export type TableDataViewMutable = Readonly<{
    decorator: TableDataContentDecoratorProvider
}>
export type TableDataSummaryMutable = Readonly<{
    content: TableDataSummaryProvider
}>
export type TableDataColumnMutable<R> = Readonly<{
    decorators: TableDataColumnRelatedDecorator<R>[]
}>
export type TableDataRowMutable<R> = Readonly<{
    style: TableDataRowStyle
    decorators: TableDataRowRelatedDecorator<R>[]
}>

export type TableDataVerticalBorderMutable = Readonly<{
    border: TableDataVerticalBorderStyle
}>
