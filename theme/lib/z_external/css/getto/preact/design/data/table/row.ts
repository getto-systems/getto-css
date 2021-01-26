import {
    decorateRow,
    filterVisibleCells,
    TableDataCell,
    TableDataCellKey,
    TableDataColumnCollection,
    TableDataFilteredCell,
    TableDataHeader,
    TableDataHorizontalBorderProvider,
    TableDataRowKeyProvider,
    TableDataSummary,
    TableDataTreeContainer,
    TableDataView,
    TableRow,
    TableRowHot,
} from "./cell"
import { TableDataRowDecorator } from "./decorator"
import { defaultRowStyle, TableDataHorizontalBorder } from "./style"

export type TableRowContent<M, R> = Readonly<{
    key: TableDataRowKeyProvider<R>
    cells: TableDataCell<M, R>[]
}>
export function tableRow<M, R>(content: TableRowContent<M, R>): TableRowHot<M, R> {
    return new TableRowImpl(content)
}
class TableRowImpl<M, R> implements TableRow<M, R>, TableRowHot<M, R> {
    key: TableDataRowKeyProvider<R>
    cells: TableDataCell<M, R>[]

    container: Readonly<{
        tree: TableDataTreeContainer<R>
    }>

    constructor({ key, cells }: TableRowContent<M, R>) {
        this.key = key
        this.cells = cells
        this.container = {
            tree: {
                style: defaultRowStyle(),
                decorators: [],
            },
        }
    }

    view(summary: M): TableDataView[] {
        return this.cells.flatMap((cell) => cell.view(summary))
    }
    header(summary: M): TableDataHeader[] {
        return this.cells.flatMap((cell) => cell.header(border, summary))
    }
    summary(summary: M): TableDataSummary[] {
        return this.cells.flatMap((cell) => cell.summary(border, summary))
    }
    column(row: R, summary: M): TableDataColumnCollection {
        return {
            key: this.key(row),
            columns: this.cells.flatMap((cell) => cell.column(border, row, summary)),
        }
    }

    horizontalBorder(borders: TableDataHorizontalBorderProvider<R>): TableRowHot<M, R> {
        this.cells = this.cells.map((cell) => cell.horizontalBorder(borders))
        return this
    }
    horizontalBorder_header(borders: TableDataHorizontalBorder[]): TableRowHot<M, R> {
        this.cells = this.cells.map((cell) => cell.horizontalBorder_header(borders))
        return this
    }
    horizontalBorder_summary(borders: TableDataHorizontalBorder[]): TableRowHot<M, R> {
        this.cells = this.cells.map((cell) => cell.horizontalBorder_summary(borders))
        return this
    }

    decorateRow(decorator: TableDataRowDecorator<R>): TableRowHot<M, R> {
        this.container = {
            ...this.container,
            tree: decorateRow(this.container.tree, decorator),
        }
        return this
    }

    filterVisibleCells(keys: TableDataCellKey[]): TableDataFilteredCell<TableRowHot<M, R>> {
        const duplicate = new TableRowImpl({
            key: this.key,
            cells: filterVisibleCells(this.cells, keys),
        })
        duplicate.container = this.container
        return { cell: duplicate, isVisible: duplicate.cells.length > 0 }
    }

    freeze(): TableRow<M, R> {
        return this
    }
}
