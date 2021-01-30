import {
    TableDataCellKey,
    TableDataColumnSingle,
    TableDataHeaderSingle,
    TableDataParams,
    TableDataSummarySingle,
    TableDataView,
    TableDataVisibleKeys,
} from "../core"

import { tableDataMutable_base } from "../mutable/base"
import { tableDataMutable_leaf } from "../mutable/leaf"
import { TableDataMutable_base, TableDataMutable_leaf } from "../mutable"
import {
    isVisibleKey,
    TableDataAlwaysVisible,
    TableDataColumnContentProvider,
    TableDataInvisible,
    TableDataRelatedParams,
    TableDataSingle,
    TableDataStyledParams,
} from "../cell"
import {
    decorateContent,
    decorateStyle,
    TableDataColumnDecorator,
    TableDataColumnRelatedDecorator,
    TableDataContentDecorator,
    TableDataContentProvider,
    TableDataHeaderDecorator,
    TableDataHorizontalBorderProvider,
    TableDataSummaryContentProvider,
    TableDataSummaryDecorator,
    TableDataSummaryProvider,
    TableDataViewDecorator,
} from "../decorator"
import {
    extendStyle,
    mergeVerticalBorder,
    TableDataHorizontalBorder,
    TableDataStyle,
    TableDataVerticalBorder,
    TableDataVerticalBorderStyle,
} from "../style"

export type TableDataSingleContent<M, R> =
    | TableDataSingleContent_base<R>
    | (TableDataSingleContent_base<R> & TableDataSingleContent_summary<M>)
    | (TableDataSingleContent_base<R> & TableDataSingleContent_footer<M>)
    | (TableDataSingleContent_base<R> &
          TableDataSingleContent_summary<M> &
          TableDataSingleContent_footer<M>)

type TableDataSingleContent_base<R> = Readonly<{
    label: TableDataContentProvider
    header: TableDataContentDecorator
    column: TableDataColumnContentProvider<R>
}>
type TableDataSingleContent_summary<M> = Readonly<{ summary: TableDataSummaryContentProvider<M> }>
type TableDataSingleContent_footer<M> = Readonly<{ footer: TableDataSummaryContentProvider<M> }>

export function tableCell<M, R>(
    key: TableDataCellKey,
    content: { (key: TableDataCellKey): TableDataSingleContent<M, R> }
): TableDataSingle<M, R> {
    return new Cell(key, content(key))
}
class Cell<M, R> implements TableDataSingle<M, R> {
    readonly type = "single" as const

    key: TableDataCellKey
    content: TableDataSingleContent<M, R>
    mutable: Readonly<{
        base: TableDataMutable_base<R>
        leaf: TableDataMutable_leaf
    }>

    constructor(key: TableDataCellKey, content: TableDataSingleContent<M, R>) {
        this.key = key
        this.content = content
        this.mutable = {
            base: tableDataMutable_base(),
            leaf: tableDataMutable_leaf(),
        }
    }

    isVisible(visibleKeys: TableDataVisibleKeys): boolean {
        const { visibleType: visible } = this.mutable.leaf.visibleMutable()
        return visible === "always" || isVisibleKey(this.key, visibleKeys)
    }

    verticalBorder(): TableDataVerticalBorderStyle {
        return this.mutable.leaf.verticalBorderMutable().border
    }

    view({ visibleKeys }: TableDataParams<M>): TableDataView | TableDataAlwaysVisible {
        const { visibleType: visible } = this.mutable.leaf.visibleMutable()
        if (visible === "always") {
            return { type: "always-visible" }
        }

        const { decorator } = this.mutable.leaf.viewMutable()
        return {
            type: "view",
            key: this.key,
            content: decorateContent(this.content.label(), decorator),
            isVisible: this.isVisible(visibleKeys),
        }
    }
    header({ visibleKeys, base }: TableDataStyledParams<M>): TableDataHeaderSingle | TableDataInvisible {
        if (!this.isVisible(visibleKeys)) {
            return { type: "invisible" }
        }
        const { style } = this.mutable.base.headerStyleMutable()
        return {
            type: "single",
            key: this.key,
            style: mergeVerticalBorder(extendStyle({ base, style }), this.verticalBorder()),
            content: this.content.header(this.content.label()),
            length: 1,
            height: 1,
        }
    }
    summary(params: TableDataStyledParams<M>): TableDataSummarySingle | TableDataInvisible {
        const { style } = this.mutable.base.summaryStyleMutable()
        return this.summaryContent(params, { style, content: content(this.content) })

        function content(content: TableDataSingleContent<M, R>): TableDataSummaryProvider<M> {
            if ("summary" in content) {
                return { type: "content", content: content.summary }
            }
            return { type: "none" }
        }
    }
    column({
        visibleKeys,
        base,
        row,
    }: TableDataRelatedParams<M, R>): TableDataColumnSingle | TableDataInvisible {
        if (!this.isVisible(visibleKeys)) {
            return { type: "invisible" }
        }
        const { style } = this.mutable.base.columnStyleMutable()
        const { decorators } = this.mutable.base.columnMutable()
        return {
            type: "single",
            key: this.key,
            style: mergeVerticalBorder(
                decorators.reduce(
                    (acc, decorator) => decorateStyle(acc, decorator(row)),
                    extendStyle({ base, style })
                ),
                this.verticalBorder()
            ),
            content: this.content.column(row),
            length: 1,
            height: 1,
        }
    }
    footer(params: TableDataStyledParams<M>): TableDataSummarySingle | TableDataInvisible {
        const { style } = this.mutable.base.footerStyleMutable()
        return this.summaryContent(params, { style, content: content(this.content) })

        function content(content: TableDataSingleContent<M, R>): TableDataSummaryProvider<M> {
            if ("footer" in content) {
                return { type: "content", content: content.footer }
            }
            return { type: "none" }
        }
    }
    summaryContent(
        { visibleKeys, base, model }: TableDataStyledParams<M>,
        { style, content }: SummaryContentParams<M>
    ): TableDataSummarySingle | TableDataInvisible {
        if (!this.isVisible(visibleKeys)) {
            return { type: "invisible" }
        }
        const shared = {
            key: this.key,
            style: mergeVerticalBorder(extendStyle({ base, style }), this.verticalBorder()),
            length: 1 as const,
        }
        switch (content.type) {
            case "none":
                return { type: "empty", ...shared }

            case "content":
                return {
                    type: "single",
                    ...shared,
                    content: content.content(model),
                }
        }
    }

    alwaysVisible(): TableDataSingle<M, R> {
        this.mutable.leaf.alwaysVisible()
        return this
    }
    border(borders: TableDataVerticalBorder[]): TableDataSingle<M, R> {
        this.mutable.leaf.border(borders)
        return this
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataSingle<M, R> {
        this.mutable.base.horizontalBorder(borders)
        return this
    }
    horizontalBorderRelated(borders: TableDataHorizontalBorderProvider<R>): TableDataSingle<M, R> {
        this.mutable.base.horizontalBorderRelated(borders)
        return this
    }
    horizontalBorder_header(borders: TableDataHorizontalBorder[]): TableDataSingle<M, R> {
        this.mutable.base.horizontalBorder_header(borders)
        return this
    }
    horizontalBorder_summary(borders: TableDataHorizontalBorder[]): TableDataSingle<M, R> {
        this.mutable.base.horizontalBorder_summary(borders)
        return this
    }
    horizontalBorder_footer(borders: TableDataHorizontalBorder[]): TableDataSingle<M, R> {
        this.mutable.base.horizontalBorder_footer(borders)
        return this
    }

    decorateView(decorator: TableDataViewDecorator): TableDataSingle<M, R> {
        this.mutable.leaf.decorateView(decorator)
        return this
    }
    decorateHeader(decorator: TableDataHeaderDecorator): TableDataSingle<M, R> {
        this.mutable.base.decorateHeader(decorator)
        return this
    }
    decorateSummary(decorator: TableDataSummaryDecorator): TableDataSingle<M, R> {
        this.mutable.base.decorateSummary(decorator)
        return this
    }
    decorateColumn(decorator: TableDataColumnDecorator): TableDataSingle<M, R> {
        this.mutable.base.decorateColumn(decorator)
        return this
    }
    decorateColumnRelated(decorator: TableDataColumnRelatedDecorator<R>): TableDataSingle<M, R> {
        this.mutable.base.decorateColumnRelated(decorator)
        return this
    }
    decorateFooter(decorator: TableDataSummaryDecorator): TableDataSingle<M, R> {
        this.mutable.base.decorateFooter(decorator)
        return this
    }
}

type SummaryContentParams<M> = Readonly<{
    style: TableDataStyle
    content: TableDataSummaryProvider<M>
}>
