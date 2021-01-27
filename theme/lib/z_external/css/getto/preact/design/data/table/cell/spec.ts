import { TableDataMutable_base, TableDataMutable_row, TableDataMutable_tree } from "../mutable"
import { tableDataMutable_default } from "../mutable/base"
import { tableDataMutable_tree } from "../mutable/tree"
import {
    tableCellView,
    tableCellBaseHeader,
    tableCellBaseSummary,
    tableCellBaseColumn,
    tableCellBaseFooter,
    TableDataCell,
    TableDataRowKeyProvider,
    TableSpec_hot,
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
import { TableDataHorizontalBorder, TableDataSticky } from "../style"
import {
    TableDataColumnRow,
    TableDataFooterRow,
    TableDataHeaderKeyProvider,
    TableDataHeaderRow,
    TableDataKeyProvider,
    TableDataParams,
    TableDataSummaryRow,
    TableDataView,
    TableSpec,
} from "../../table"
import { tableDataMutable_row } from "../mutable/row"

export type TableSpecContent<M, R> = Readonly<{
    key: TableDataRowKeyProvider<R>
    cells: TableDataCell<M, R>[]
}>
export function tableSpec<M, R>(content: TableSpecContent<M, R>): TableSpec_hot<M, R> {
    return new Spec(content)
}
class Spec<M, R> implements TableSpec<M, R>, TableSpec_hot<M, R> {
    content: TableSpecContent<M, R>
    mutable: Readonly<{
        core: TableDataMutable_base<R>
        tree: TableDataMutable_tree<R>
        row: TableDataMutable_row
    }>

    constructor(content: TableSpecContent<M, R>) {
        this.content = content
        this.mutable = {
            core: tableDataMutable_default(),
            tree: tableDataMutable_tree(),
            row: tableDataMutable_row(),
        }
    }

    view(params: TableDataParams<M>): TableDataView[] {
        return tableCellView(params, this.content.cells)
    }
    header(params: TableDataParams<M>): TableDataHeaderRow {
        const { style } = this.mutable.core.headerStyleMutable()
        const headerRow = this.mutable.row.headerRowMutable()
        return {
            key: headerRow.key,
            className: headerRow.style.className,
            headers: tableCellBaseHeader(params, style, this.content.cells),
        }
    }
    summary(params: TableDataParams<M>): TableDataSummaryRow {
        const { style } = this.mutable.core.summaryStyleMutable()
        const summaryRow = this.mutable.row.summaryRowMutable()
        return {
            key: summaryRow.key(),
            className: summaryRow.style.className,
            summaries: tableCellBaseSummary(params, style, this.content.cells),
        }
    }
    column(params: TableDataParams<M>, row: R): TableDataColumnRow {
        const { style } = this.mutable.core.columnStyleMutable()
        const treeRow = this.mutable.tree.rowMutable()
        const { decorators } = this.mutable.core.columnMutable()
        return {
            key: this.content.key(row),
            className: treeRow.style.className,
            columns: tableCellBaseColumn(params, style, decorators, this.content.cells, row),
        }
    }
    footer(params: TableDataParams<M>): TableDataFooterRow {
        const { style } = this.mutable.core.footerStyleMutable()
        const footerRow = this.mutable.row.footerRowMutable()
        return {
            key: footerRow.key(),
            className: footerRow.style.className,
            footers: tableCellBaseFooter(params, style, this.content.cells),
        }
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableSpec_hot<M, R> {
        this.mutable.core.horizontalBorder(borders)
        return this
    }
    horizontalBorderRelated(borders: TableDataHorizontalBorderProvider<R>): TableSpec_hot<M, R> {
        this.mutable.core.horizontalBorderRelated(borders)
        return this
    }
    horizontalBorder_header(borders: TableDataHorizontalBorder[]): TableSpec_hot<M, R> {
        this.mutable.core.horizontalBorder_header(borders)
        return this
    }
    horizontalBorder_summary(borders: TableDataHorizontalBorder[]): TableSpec_hot<M, R> {
        this.mutable.core.horizontalBorder_summary(borders)
        return this
    }
    horizontalBorder_footer(borders: TableDataHorizontalBorder[]): TableSpec_hot<M, R> {
        this.mutable.core.horizontalBorder_footer(borders)
        return this
    }

    decorateHeader(decorator: TableDataHeaderDecorator): TableSpec_hot<M, R> {
        this.mutable.core.decorateHeader(decorator)
        return this
    }
    decorateSummary(decorator: TableDataSummaryDecorator): TableSpec_hot<M, R> {
        this.mutable.core.decorateSummary(decorator)
        return this
    }
    decorateColumn(decorator: TableDataColumnDecorator): TableSpec_hot<M, R> {
        this.mutable.core.decorateColumn(decorator)
        return this
    }
    decorateColumnRelated(decorator: TableDataColumnRelatedDecorator<R>): TableSpec_hot<M, R> {
        this.mutable.core.decorateColumnRelated(decorator)
        return this
    }
    decorateFooter(decorator: TableDataSummaryDecorator): TableSpec_hot<M, R> {
        this.mutable.core.decorateFooter(decorator)
        return this
    }
    decorateHeaderRow(decorator: TableDataRowDecorator): TableSpec_hot<M, R> {
        this.mutable.row.decorateHeaderRow(decorator)
        return this
    }
    decorateSummaryRow(decorator: TableDataRowDecorator): TableSpec_hot<M, R> {
        this.mutable.row.decorateSummaryRow(decorator)
        return this
    }
    decorateFooterRow(decorator: TableDataRowDecorator): TableSpec_hot<M, R> {
        this.mutable.row.decorateFooterRow(decorator)
        return this
    }
    decorateRow(decorator: TableDataRowDecorator): TableSpec_hot<M, R> {
        this.mutable.tree.decorateRow(decorator)
        return this
    }
    decorateRowRelated(decorator: TableDataRowRelatedDecorator<R>): TableSpec_hot<M, R> {
        this.mutable.tree.decorateRowRelated(decorator)
        return this
    }

    setHeaderKey(key: TableDataHeaderKeyProvider): TableSpec_hot<M, R> {
        this.mutable.row.setHeaderKey(key)
        return this
    }
    setSummaryKey(key: TableDataKeyProvider): TableSpec_hot<M, R> {
        this.mutable.row.setSummaryKey(key)
        return this
    }
    setFooterKey(key: TableDataKeyProvider): TableSpec_hot<M, R> {
        this.mutable.row.setFooterKey(key)
        return this
    }

    stickyHeader(): TableSpec_hot<M, R> {
        this.mutable.row.stickyHeader()
        return this
    }
    stickyColumn(column: number): TableSpec_hot<M, R> {
        this.mutable.row.stickyColumn(column)
        return this
    }
    stickyCross(column: number): TableSpec_hot<M, R> {
        this.mutable.row.stickyCross(column)
        return this
    }

    freeze(): TableSpec<M, R> {
        return this
    }
    sticky(): TableDataSticky {
        const { sticky } = this.mutable.row.stickyMutable()
        return sticky
    }
}
