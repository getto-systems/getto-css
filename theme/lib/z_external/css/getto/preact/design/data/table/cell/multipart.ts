import { TableDataMutable_core } from "../mutable"
import { tableDataMutable_core } from "../mutable/core"
import {
    tableCellColumn,
    tableCellHeader,
    tableCellSummary,
    tableCellView,
    TableDataCell,
    TableDataChildrenProvider,
    TableDataColumn,
    TableDataHeader,
    TableDataMultipart,
    TableDataParams,
    TableDataRelatedParams,
    TableDataStyledParams,
    TableDataSummary,
    TableDataView,
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
        core: TableDataMutable_core<R>
    }>

    constructor(content: TableDataMultipartContent<M, R, P>) {
        this.content = content
        this.mutable = {
            core: tableDataMutable_core(),
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
}

interface TableDataMultipartCellProvider<M, R, C> {
    (child: C): TableDataCell<M, R>[]
}
