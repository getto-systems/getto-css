import {
    TableDataHeaderRowMutable,
    TableDataMutable_row,
    TableDataStickyMutable,
    TableDataSummaryRowMutable,
} from "../mutable"
import { TableDataHeaderKeyProvider, TableDataKeyProvider } from "../../table"

export function tableDataMutable_row(): TableDataMutable_row {
    return new Mutable()
}
class Mutable implements TableDataMutable_row {
    headerRow: TableDataHeaderRowMutable
    summaryRow: TableDataSummaryRowMutable
    footerRow: TableDataSummaryRowMutable
    sticky: TableDataStickyMutable

    constructor() {
        this.headerRow = {
            key: (i: number) => `__header_${i}`,
        }
        this.summaryRow = {
            key: () => "__summary",
        }
        this.footerRow = {
            key: () => "__footer",
        }
        this.sticky = {
            sticky: { type: "none" },
        }
    }

    headerRowMutable(): TableDataHeaderRowMutable {
        return this.headerRow
    }
    summaryRowMutable(): TableDataSummaryRowMutable {
        return this.summaryRow
    }
    footerRowMutable(): TableDataSummaryRowMutable {
        return this.footerRow
    }
    stickyMutable(): TableDataStickyMutable {
        return this.sticky
    }

    setHeaderKey(key: TableDataHeaderKeyProvider): void {
        this.headerRow = { ...this.headerRow, key }
    }
    setSummaryKey(key: TableDataKeyProvider): void {
        this.summaryRow = { ...this.summaryRow, key }
    }
    setFooterKey(key: TableDataKeyProvider): void {
        this.footerRow = { ...this.footerRow, key }
    }

    stickyHeader(): void {
        this.sticky = { ...this.sticky, sticky: { type: "header" } }
    }
    stickyColumn(column: number): void {
        this.sticky = { ...this.sticky, sticky: { type: "column", column } }
    }
    stickyCross(column: number): void {
        this.sticky = { ...this.sticky, sticky: { type: "cross", column } }
    }
}
