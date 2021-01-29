import {
    TableDataMutable_leaf,
    TableDataSummaryMutable,
    TableDataVerticalBorderMutable,
    TableDataViewMutable,
    TableDataVisibleMutable,
} from "../mutable"
import { decorateVerticalBorder } from "../decorator/border"
import { TableDataSummaryProvider, TableDataViewDecorator } from "../decorator"
import { inheritVerticalBorderStyle, TableDataVerticalBorder } from "../style"

export function tableDataMutable_leaf(): TableDataMutable_leaf {
    return new Mutable()
}
class Mutable implements TableDataMutable_leaf {
    visible: TableDataVisibleMutable
    view: TableDataViewMutable
    summary: TableDataSummaryMutable
    footer: TableDataSummaryMutable
    verticalBorder: TableDataVerticalBorderMutable

    constructor() {
        this.visible = {
            visible: "normal",
        }
        this.view = {
            decorator: { type: "none" },
        }
        this.summary = {
            content: { type: "none" },
        }
        this.footer = {
            content: { type: "none" },
        }
        this.verticalBorder = {
            border: inheritVerticalBorderStyle(),
        }
    }

    visibleMutable(): TableDataVisibleMutable {
        return this.visible
    }
    viewMutable(): TableDataViewMutable {
        return this.view
    }
    summaryMutable(): TableDataSummaryMutable {
        return this.summary
    }
    footerMutable(): TableDataSummaryMutable {
        return this.footer
    }
    verticalBorderMutable(): TableDataVerticalBorderMutable {
        return this.verticalBorder
    }

    alwaysVisible(): void {
        this.visible = { ...this.visible, visible: "always" }
    }
    border(borders: TableDataVerticalBorder[]): void {
        this.verticalBorder = {
            ...this.verticalBorder,
            border: decorateVerticalBorder(borders)(this.verticalBorder.border),
        }
    }

    decorateView(decorator: TableDataViewDecorator): void {
        this.view = { ...this.view, decorator }
    }
    setSummary(content: TableDataSummaryProvider): void {
        this.summary = { ...this.summary, content }
    }
    setFooter(content: TableDataSummaryProvider): void {
        this.footer = { ...this.footer, content }
    }
}