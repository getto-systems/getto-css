import { TableDataMutable_core, TableDataMutable_tree } from "../mutable"
import { tableDataMutable_core } from "../mutable/core"
import { tableDataMutable_tree } from "../mutable/tree"
import {
    tableCellColumn,
    tableCellHeader,
    tableCellSummary,
    tableCellView,
    TableDataCell,
    TableDataColumnCollection,
    TableDataHeader,
    TableDataParams,
    TableDataRelatedParams,
    TableDataRowKeyProvider,
    TableDataStyledParams,
    TableDataSummary,
    TableDataView,
    TableSpec,
    TableRow,
    tableCellFooter,
} from "../cell"
import {
    TableDataColumnDecorator,
    TableDataColumnRelatedDecorator,
    TableDataHeaderDecorator,
    TableDataHorizontalBorderProvider,
    TableDataRowDecorator,
    TableDataRowRelatedDecorator,
    TableDataSummaryDecorator,
} from "../decorator"
import { TableDataHorizontalBorder } from "../style"

export type TableSpecContent<M, R> = Readonly<{
    key: TableDataRowKeyProvider<R>
    cells: TableDataCell<M, R>[]
}>
export function tableSpec<M, R>(content: TableSpecContent<M, R>): TableRow<M, R> {
    return new Row(content)
}
class Row<M, R> implements TableSpec<M, R>, TableRow<M, R> {
    content: TableSpecContent<M, R>
    mutable: Readonly<{
        core: TableDataMutable_core<R>
        tree: TableDataMutable_tree<R>
    }>

    constructor(content: TableSpecContent<M, R>) {
        this.content = content
        this.mutable = {
            core: tableDataMutable_core(),
            tree: tableDataMutable_tree(),
        }
    }

    view(params: TableDataParams<M>): TableDataView[] {
        return tableCellView(params, this.content.cells)
    }
    header(params: TableDataStyledParams<M>): TableDataHeader[] {
        const { style } = this.mutable.core.headerStyleMutable()
        return tableCellHeader(params, style, this.content.cells)
    }
    summary(params: TableDataStyledParams<M>): TableDataSummary[] {
        const { style } = this.mutable.core.summaryStyleMutable()
        return tableCellSummary(params, style, this.content.cells)
    }
    column(params: TableDataRelatedParams<M, R>): TableDataColumnCollection {
        const { style } = this.mutable.core.columnStyleMutable()
        const { decorators } = this.mutable.core.columnMutable()
        return {
            key: this.content.key(params.row),
            columns: tableCellColumn(params, style, decorators, this.content.cells),
        }
    }
    footer(params: TableDataStyledParams<M>): TableDataSummary[] {
        const { style } = this.mutable.core.footerStyleMutable()
        return tableCellFooter(params, style, this.content.cells)
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableRow<M, R> {
        this.mutable.core.horizontalBorder(borders)
        return this
    }
    horizontalBorderRelated(borders: TableDataHorizontalBorderProvider<R>): TableRow<M, R> {
        this.mutable.core.horizontalBorderRelated(borders)
        return this
    }
    horizontalBorder_header(borders: TableDataHorizontalBorder[]): TableRow<M, R> {
        this.mutable.core.horizontalBorder_header(borders)
        return this
    }
    horizontalBorder_summary(borders: TableDataHorizontalBorder[]): TableRow<M, R> {
        this.mutable.core.horizontalBorder_summary(borders)
        return this
    }
    horizontalBorder_footer(borders: TableDataHorizontalBorder[]): TableRow<M, R> {
        this.mutable.core.horizontalBorder_footer(borders)
        return this
    }

    decorateHeader(decorator: TableDataHeaderDecorator): TableRow<M, R> {
        this.mutable.core.decorateHeader(decorator)
        return this
    }
    decorateSummary(decorator: TableDataSummaryDecorator): TableRow<M, R> {
        this.mutable.core.decorateSummary(decorator)
        return this
    }
    decorateColumn(decorator: TableDataColumnDecorator): TableRow<M, R> {
        this.mutable.core.decorateColumn(decorator)
        return this
    }
    decorateColumnRelated(decorator: TableDataColumnRelatedDecorator<R>): TableRow<M, R> {
        this.mutable.core.decorateColumnRelated(decorator)
        return this
    }
    decorateFooter(decorator: TableDataSummaryDecorator): TableRow<M, R> {
        this.mutable.core.decorateFooter(decorator)
        return this
    }
    decorateRow(decorator: TableDataRowDecorator): TableRow<M, R> {
        this.mutable.tree.decorateRow(decorator)
        return this
    }
    decorateRowRelated(decorator: TableDataRowRelatedDecorator<R>): TableRow<M, R> {
        this.mutable.tree.decorateRowRelated(decorator)
        return this
    }

    freeze(): TableSpec<M, R> {
        return this
    }
}
