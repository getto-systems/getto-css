import { tableDataMutable } from "../mutable/core"
import { tableDataMutable_group } from "../mutable/group"
import { TableDataMutable, TableDataMutable_group } from "../mutable"
import {
    TableDataCell,
    TableDataCellKey,
    TableDataColumn,
    TableDataGroup,
    TableDataHeader,
    TableDataHeaderGroup,
    TableDataParams,
    TableDataRelatedParams,
    TableDataStyledParams,
    TableDataSummary,
    TableDataView,
    tableCellView,
    tableCellSummary,
    tableCellColumn,
    tableCellHeader,
} from "../cell"
import {
    TableDataColumnDecorator,
    TableDataColumnRelatedDecorator,
    TableDataContentProvider,
    TableDataGroupDecorator,
    TableDataHeaderDecorator,
    TableDataHorizontalBorderProvider,
    TableDataSummaryDecorator,
    TableDataViewDecorator,
} from "../decorator"
import {
    baseGroupStyle,
    baseGroupMemberStyle,
    extendStyle,
    mergeVerticalBorder,
    TableDataHorizontalBorder,
} from "../style"

export type TableDataGroupContent<M, R> = Readonly<{
    key: TableDataCellKey
    header: TableDataContentProvider
    cells: TableDataCell<M, R>[]
}>
export function tableData_group<M, R>(content: TableDataGroupContent<M, R>): TableDataGroup<M, R> {
    return new TableDataGroupImpl(content)
}
class TableDataGroupImpl<M, R> implements TableDataGroup<M, R> {
    readonly type = "group" as const

    content: TableDataGroupContent<M, R>
    mutable: Readonly<{
        core: TableDataMutable<R>
        group: TableDataMutable_group
    }>

    constructor(content: TableDataGroupContent<M, R>) {
        this.content = content
        this.mutable = {
            core: tableDataMutable(),
            group: tableDataMutable_group(),
        }
    }

    view(params: TableDataParams<M>): TableDataView[] {
        return tableCellView(params, this.content.cells)
    }
    header(params: TableDataStyledParams<M>): TableDataHeaderGroup[] {
        const children = this.children(params)
        if (children.length === 0) {
            return []
        }
        const { style } = this.mutable.group.groupStyleMutable()
        return [
            {
                type: "group",
                key: this.content.key,
                style: mergeVerticalBorder(
                    extendStyle({
                        base: baseGroupStyle(params.base),
                        style,
                    }),
                    verticalBorder(children[0], children[children.length - 1])
                ),
                content: this.content.header(),
                children,
            },
        ]

        function verticalBorder(first: TableDataHeader, last: TableDataHeader) {
            return {
                left: first.style.border.vertical.left,
                right: last.style.border.vertical.right,
            }
        }
    }
    children(params: TableDataStyledParams<M>): TableDataHeader[] {
        const { style } = this.mutable.core.headerStyleMutable()
        return tableCellHeader(
            { ...params, base: baseGroupMemberStyle(params.base) },
            style,
            this.content.cells
        )
    }
    summary(params: TableDataStyledParams<M>): TableDataSummary[] {
        const { style } = this.mutable.core.summaryStyleMutable()
        return tableCellSummary(params, style, this.content.cells)
    }
    column(params: TableDataRelatedParams<M, R>): TableDataColumn[] {
        const { style } = this.mutable.core.columnStyleMutable()
        const { decorators } = this.mutable.core.columnMutable()
        return tableCellColumn(params, style, decorators, this.content.cells)
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataGroup<M, R> {
        this.mutable.core.horizontalBorder(borders)
        return this
    }
    horizontalBorderRelated(borders: TableDataHorizontalBorderProvider<R>): TableDataGroup<M, R> {
        this.mutable.core.horizontalBorderRelated(borders)
        return this
    }
    horizontalBorder_header(borders: TableDataHorizontalBorder[]): TableDataGroup<M, R> {
        this.mutable.core.horizontalBorder_header(borders)
        return this
    }
    horizontalBorder_summary(borders: TableDataHorizontalBorder[]): TableDataGroup<M, R> {
        this.mutable.core.horizontalBorder_summary(borders)
        return this
    }

    decorateView(decorator: TableDataViewDecorator): TableDataGroup<M, R> {
        this.mutable.group.decorateView(decorator)
        return this
    }
    decorateGroup(decorator: TableDataGroupDecorator): TableDataGroup<M, R> {
        this.mutable.group.decorateGroup(decorator)
        return this
    }
    decorateHeader(decorator: TableDataHeaderDecorator): TableDataGroup<M, R> {
        this.mutable.core.decorateHeader(decorator)
        return this
    }
    decorateSummary(decorator: TableDataSummaryDecorator): TableDataGroup<M, R> {
        this.mutable.core.decorateSummary(decorator)
        return this
    }
    decorateColumn(decorator: TableDataColumnDecorator): TableDataGroup<M, R> {
        this.mutable.core.decorateColumn(decorator)
        return this
    }
    decorateColumnRelated(decorator: TableDataColumnRelatedDecorator<R>): TableDataGroup<M, R> {
        this.mutable.core.decorateColumnRelated(decorator)
        return this
    }
}
