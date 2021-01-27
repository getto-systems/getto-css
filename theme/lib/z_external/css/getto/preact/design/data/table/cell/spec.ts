import { TableDataMutable_base, TableDataMutable_row, TableDataMutable_tree } from "../mutable"
import { tableDataMutable_base } from "../mutable/base"
import { tableDataMutable_tree } from "../mutable/tree"
import {
    tableCellColumn,
    tableCellHeader,
    tableCellSummary,
    tableCellView,
    TableDataCell,
    TableDataParams,
    TableDataRelatedParams,
    TableDataRowKeyProvider,
    TableDataStyledParams,
    TableSpec,
    TableSpec_hot,
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
import { TableDataHorizontalBorder, TableDataSticky } from "../style"
import {
    TableDataColumnRow,
    TableDataFooterRow,
    TableDataHeaderKeyProvider,
    TableDataHeaderRow,
    TableDataKeyProvider,
    TableDataRowSpec,
    TableDataSummaryRow,
    TableDataView,
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
            // TODO row の mutable は inherit じゃなくて default のスタイルである必要がある
            core: tableDataMutable_base(),
            tree: tableDataMutable_tree(),
            row: tableDataMutable_row(),
        }
    }

    view(params: TableDataParams<M>): TableDataView[] {
        return tableCellView(params, this.content.cells)
    }
    header(params: TableDataStyledParams<M>): TableDataRowSpec<TableDataHeaderRow> {
        const { style } = this.mutable.core.headerStyleMutable()
        const { key } = this.mutable.row.headerRowMutable()
        const { sticky } = this.mutable.row.stickyMutable()
        return {
            sticky,
            row: {
                key,
                headers: tableCellHeader(params, style, this.content.cells),
            },
        }
    }
    summary(params: TableDataStyledParams<M>): TableDataRowSpec<TableDataSummaryRow> {
        const { style } = this.mutable.core.summaryStyleMutable()
        const { key } = this.mutable.row.summaryRowMutable()
        const { sticky } = this.mutable.row.stickyMutable()
        return {
            sticky,
            row: {
                key: key(),
                summaries: tableCellSummary(params, style, this.content.cells),
            },
        }
    }
    column(params: TableDataRelatedParams<M, R>): TableDataRowSpec<TableDataColumnRow> {
        const { style } = this.mutable.core.columnStyleMutable()
        const { decorators } = this.mutable.core.columnMutable()
        const { sticky } = this.mutable.row.stickyMutable()
        return {
            sticky,
            row: {
                key: this.content.key(params.row),
                columns: tableCellColumn(params, style, decorators, this.content.cells),
            },
        }
    }
    footer(params: TableDataStyledParams<M>): TableDataRowSpec<TableDataFooterRow> {
        const { style } = this.mutable.core.footerStyleMutable()
        const { key } = this.mutable.row.footerRowMutable()
        const { sticky } = this.mutable.row.stickyMutable()
        return {
            sticky,
            row: {
                key: key(),
                footers: tableCellFooter(params, style, this.content.cells),
            },
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
