import {
    TableDataColumn,
    TableDataHeader,
    TableDataParams,
    TableDataSummary,
    TableDataView,
} from "../../table"

import { TableDataMutable_base } from "../mutable"
import { tableDataMutable_base } from "../mutable/base"
import {
    tableCellColumn,
    tableCellFooter,
    tableCellHeader,
    tableCellSummary,
    tableCellView,
    TableDataCell,
    TableDataChildrenProvider,
    TableDataMultipart,
    TableDataRelatedParams,
    TableDataStyledParams,
} from "../cell"
import {
    TableDataColumnDecorator,
    TableDataColumnRelatedDecorator,
    TableDataHeaderDecorator,
    TableDataHorizontalBorderProvider,
    TableDataSummaryDecorator,
} from "../decorator"
import { TableDataHorizontalBorder } from "../style"

export type TableDataMultipartContent<M, R, P> = Readonly<{
    data: TableDataChildrenProvider<M, P>
    cells: TableDataMultipartCellProvider<M, R, P>
}>
export function tableData_multipart<M, R, P>(
    content: TableDataMultipartContent<M, R, P>
): TableDataMultipart<M, R> {
    return new Cell(content)
}
class Cell<M, R, P> implements TableDataMultipart<M, R> {
    readonly type = "multipart" as const

    content: TableDataMultipartContent<M, R, P>
    mutable: Readonly<{
        core: TableDataMutable_base<R>
    }>

    constructor(content: TableDataMultipartContent<M, R, P>) {
        this.content = content
        this.mutable = {
            core: tableDataMutable_base(),
        }
    }

    cells(model: M): TableDataCell<M, R>[] {
        return this.content.data(model).flatMap((part) => this.content.cells(part))
    }

    view(params: TableDataParams<M>): TableDataView[] {
        return tableCellView(params, this.cells(params.model))
    }
    header(params: TableDataStyledParams<M>): TableDataHeader[] {
        const { style } = this.mutable.core.headerStyleMutable()
        return tableCellHeader(params, style, this.cells(params.model))
    }
    summary(params: TableDataStyledParams<M>): TableDataSummary[] {
        const { style } = this.mutable.core.summaryStyleMutable()
        return tableCellSummary(params, style, this.cells(params.model))
    }
    column(params: TableDataRelatedParams<M, R>): TableDataColumn[] {
        const { style } = this.mutable.core.columnStyleMutable()
        const { decorators } = this.mutable.core.columnMutable()
        return tableCellColumn(params, style, decorators, this.cells(params.model))
    }
    footer(params: TableDataStyledParams<M>): TableDataSummary[] {
        const { style } = this.mutable.core.footerStyleMutable()
        return tableCellFooter(params, style, this.cells(params.model))
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataMultipart<M, R> {
        this.mutable.core.horizontalBorder(borders)
        return this
    }
    horizontalBorderRelated(borders: TableDataHorizontalBorderProvider<R>): TableDataMultipart<M, R> {
        this.mutable.core.horizontalBorderRelated(borders)
        return this
    }
    horizontalBorder_header(borders: TableDataHorizontalBorder[]): TableDataMultipart<M, R> {
        this.mutable.core.horizontalBorder_header(borders)
        return this
    }
    horizontalBorder_summary(borders: TableDataHorizontalBorder[]): TableDataMultipart<M, R> {
        this.mutable.core.horizontalBorder_summary(borders)
        return this
    }
    horizontalBorder_footer(borders: TableDataHorizontalBorder[]): TableDataMultipart<M, R> {
        this.mutable.core.horizontalBorder_footer(borders)
        return this
    }

    decorateHeader(decorator: TableDataHeaderDecorator): TableDataMultipart<M, R> {
        this.mutable.core.decorateHeader(decorator)
        return this
    }
    decorateSummary(decorator: TableDataSummaryDecorator): TableDataMultipart<M, R> {
        this.mutable.core.decorateSummary(decorator)
        return this
    }
    decorateColumn(decorator: TableDataColumnDecorator): TableDataMultipart<M, R> {
        this.mutable.core.decorateColumn(decorator)
        return this
    }
    decorateColumnRelated(decorator: TableDataColumnRelatedDecorator<R>): TableDataMultipart<M, R> {
        this.mutable.core.decorateColumnRelated(decorator)
        return this
    }
    decorateFooter(decorator: TableDataSummaryDecorator): TableDataMultipart<M, R> {
        this.mutable.core.decorateFooter(decorator)
        return this
    }
}

interface TableDataMultipartCellProvider<M, R, C> {
    (child: C): TableDataCell<M, R>[]
}
