import { TableDataMutable_core, TableDataMutable_tree } from "../mutable"
import { tableDataMutable_core } from "../mutable/core"
import { tableDataMutable_tree } from "../mutable/tree"
import {
    tableCellChildColumn,
    tableCellHeader,
    tableCellSummary,
    tableCellView,
    TableDataCell,
    TableDataChildrenProvider,
    TableDataColumnCollection,
    TableDataColumnTree,
    TableDataHeader,
    TableDataParams,
    TableDataRelatedParams,
    TableDataRowKeyProvider,
    TableDataStyledParams,
    TableDataSummary,
    TableDataTree,
    TableDataView,
} from "../cell"
import {
    decorateRowStyle,
    TableDataColumnDecorator,
    TableDataColumnRelatedDecorator,
    TableDataHeaderDecorator,
    TableDataHorizontalBorderProvider,
    TableDataRowDecorator,
    TableDataRowRelatedDecorator,
    TableDataSummaryDecorator,
} from "../decorator"
import { TableDataHorizontalBorder } from "../style"

export type TableDataTreeContent<M, R, C> = Readonly<{
    data: TableDataChildrenProvider<R, C>
    key: TableDataRowKeyProvider<C>
    cells: TableDataCell<M, C>[]
}>
export function tableData_tree<M, R, C>(content: TableDataTreeContent<M, R, C>): TableDataTree<M, R> {
    return new Cell(content)
}
class Cell<M, R, C> implements TableDataTree<M, R> {
    readonly type = "tree" as const

    content: TableDataTreeContent<M, R, C>
    mutable: Readonly<{
        core: TableDataMutable_core<R>
        tree: TableDataMutable_tree<R>
    }>

    constructor(content: TableDataTreeContent<M, R, C>) {
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
    column(params: TableDataRelatedParams<M, R>): TableDataColumnTree[] {
        const children = this.children(params)
        if (children.length === 0) {
            return []
        }
        const { style, decorators } = this.mutable.tree.rowMutable()
        return [
            {
                type: "tree",
                style: decorators.reduce(
                    (acc, decorator) => decorateRowStyle(acc, decorator(params.row)),
                    style
                ),
                children,
                width: width(children),
                height: height(children),
            },
        ]

        function width(rows: TableDataColumnCollection[]): number {
            return rows.reduce(
                (all, row) =>
                    row.columns.reduce((acc, column) => {
                        switch (column.type) {
                            case "extract":
                            case "single":
                                return acc + 1
                            case "tree":
                                return acc + width(column.children)
                        }
                    }, all),
                0
            )
        }
        function height(rows: TableDataColumnCollection[]): number {
            return Math.max(
                1,
                rows
                    .map((tree) =>
                        Math.max(
                            ...tree.columns.map((column) => {
                                switch (column.type) {
                                    case "single":
                                    case "extract":
                                        return 1

                                    case "tree":
                                        return height(column.children)
                                }
                            })
                        )
                    )
                    .reduce((acc, height) => acc + height, 0)
            )
        }
    }
    children(params: TableDataRelatedParams<M, R>): TableDataColumnCollection[] {
        const { style } = this.mutable.core.columnStyleMutable()
        const { decorators } = this.mutable.core.columnMutable()
        return this.content.data(params.row).map((child) => {
            return {
                key: this.content.key(child),
                columns: tableCellChildColumn(child, params, style, decorators, this.content.cells),
            }
        })
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataTree<M, R> {
        this.mutable.core.horizontalBorder(borders)
        return this
    }
    horizontalBorderRelated(borders: TableDataHorizontalBorderProvider<R>): TableDataTree<M, R> {
        this.mutable.core.horizontalBorderRelated(borders)
        return this
    }
    horizontalBorder_header(borders: TableDataHorizontalBorder[]): TableDataTree<M, R> {
        this.mutable.core.horizontalBorder_header(borders)
        return this
    }
    horizontalBorder_summary(borders: TableDataHorizontalBorder[]): TableDataTree<M, R> {
        this.mutable.core.horizontalBorder_summary(borders)
        return this
    }

    decorateHeader(decorator: TableDataHeaderDecorator): TableDataTree<M, R> {
        this.mutable.core.decorateHeader(decorator)
        return this
    }
    decorateSummary(decorator: TableDataSummaryDecorator): TableDataTree<M, R> {
        this.mutable.core.decorateSummary(decorator)
        return this
    }
    decorateColumn(decorator: TableDataColumnDecorator): TableDataTree<M, R> {
        this.mutable.core.decorateColumn(decorator)
        return this
    }
    decorateColumnRelated(decorator: TableDataColumnRelatedDecorator<R>): TableDataTree<M, R> {
        this.mutable.core.decorateColumnRelated(decorator)
        return this
    }
    decorateRow(decorator: TableDataRowDecorator): TableDataTree<M, R> {
        this.mutable.tree.decorateRow(decorator)
        return this
    }
    decorateRowRelated(decorator: TableDataRowRelatedDecorator<R>): TableDataTree<M, R> {
        this.mutable.tree.decorateRowRelated(decorator)
        return this
    }
}
