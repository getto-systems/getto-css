import { TableDataColumnMutable, TableDataStyleMutable, TableDataMutable_core } from "../mutable"
import {
    decorateStyle,
    horizontalBorder,
    TableDataColumnDecorator,
    TableDataColumnRelatedDecorator,
    TableDataHeaderDecorator,
    TableDataHorizontalBorderProvider,
    TableDataSummaryDecorator,
} from "../decorator"
import { inheritStyle, TableDataHorizontalBorder } from "../style"

export function tableDataMutable_core<R>(): TableDataMutable_core<R> {
    return new Mutable()
}
class Mutable<R> implements TableDataMutable_core<R> {
    headerStyle: TableDataStyleMutable
    summaryStyle: TableDataStyleMutable
    columnStyle: TableDataStyleMutable
    footerStyle: TableDataStyleMutable
    column: TableDataColumnMutable<R>

    constructor() {
        this.headerStyle = {
            style: inheritStyle(),
        }
        this.summaryStyle = {
            style: inheritStyle(),
        }
        this.columnStyle = {
            style: inheritStyle(),
        }
        this.footerStyle = {
            style: inheritStyle(),
        }
        this.column = {
            decorators: [],
        }
    }

    headerStyleMutable(): TableDataStyleMutable {
        return this.headerStyle
    }
    summaryStyleMutable(): TableDataStyleMutable {
        return this.summaryStyle
    }
    columnStyleMutable(): TableDataStyleMutable {
        return this.columnStyle
    }
    footerStyleMutable(): TableDataStyleMutable {
        return this.footerStyle
    }
    columnMutable(): TableDataColumnMutable<R> {
        return this.column
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): void {
        this.decorateColumn(horizontalBorder(borders))
    }
    horizontalBorderRelated(borders: TableDataHorizontalBorderProvider<R>): void {
        this.decorateColumnRelated((row: R) => horizontalBorder(borders(row)))
    }
    horizontalBorder_header(borders: TableDataHorizontalBorder[]): void {
        this.decorateHeader(horizontalBorder(borders))
    }
    horizontalBorder_summary(borders: TableDataHorizontalBorder[]): void {
        this.decorateSummary(horizontalBorder(borders))
    }
    horizontalBorder_footer(borders: TableDataHorizontalBorder[]): void {
        this.decorateFooter(horizontalBorder(borders))
    }

    decorateHeader(decorator: TableDataHeaderDecorator): void {
        this.headerStyle = {
            ...this.headerStyle,
            style: decorateStyle(this.headerStyle.style, decorator),
        }
    }
    decorateSummary(decorator: TableDataSummaryDecorator): void {
        this.summaryStyle = {
            ...this.summaryStyle,
            style: decorateStyle(this.summaryStyle.style, decorator),
        }
    }
    decorateColumn(decorator: TableDataColumnDecorator): void {
        this.columnStyle = {
            ...this.columnStyle,
            style: decorateStyle(this.columnStyle.style, decorator),
        }
    }
    decorateColumnRelated(decorator: TableDataColumnRelatedDecorator<R>): void {
        this.column = {
            ...this.column,
            decorators: [...this.column.decorators, decorator],
        }
    }
    decorateFooter(decorator: TableDataSummaryDecorator): void {
        this.footerStyle = {
            ...this.footerStyle,
            style: decorateStyle(this.footerStyle.style, decorator),
        }
    }
}
