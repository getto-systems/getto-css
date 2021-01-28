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
    TableDataColumnContentProvider,
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

export type TableDataSingleContent<R> = Readonly<{
    label: TableDataContentProvider
    header: TableDataContentDecorator
    column: TableDataColumnContentProvider<R>
}>
export function tableCell<M, R>(
    key: TableDataCellKey,
    content: { (key: TableDataCellKey): TableDataSingleContent<R> }
): TableDataSingle<M, R> {
    return new Cell(key, content(key))
}
class Cell<M, R> implements TableDataSingle<M, R> {
    readonly type = "single" as const

    key: TableDataCellKey
    content: TableDataSingleContent<R>
    mutable: Readonly<{
        core: TableDataMutable_base<R>
        leaf: TableDataMutable_leaf
    }>

    constructor(key: TableDataCellKey, content: TableDataSingleContent<R>) {
        this.key = key
        this.content = content
        this.mutable = {
            core: tableDataMutable_base(),
            leaf: tableDataMutable_leaf(),
        }
    }

    isVisible(visibleKeys: TableDataVisibleKeys): boolean {
        return isVisibleKey(this.key, visibleKeys)
    }

    verticalBorder(): TableDataVerticalBorderStyle {
        return this.mutable.leaf.verticalBorderMutable().border
    }

    view({ visibleKeys }: TableDataParams<M>): TableDataView {
        const { decorator } = this.mutable.leaf.viewMutable()
        return {
            key: this.key,
            content: decorateContent(this.content.label(), decorator),
            isVisible: this.isVisible(visibleKeys),
        }
    }
    header({ visibleKeys, base }: TableDataStyledParams<M>): TableDataHeaderSingle[] {
        if (!this.isVisible(visibleKeys)) {
            return []
        }
        const { style } = this.mutable.core.headerStyleMutable()
        return [
            {
                type: "single",
                key: this.key,
                style: mergeVerticalBorder(extendStyle({ base, style }), this.verticalBorder()),
                content: this.content.header(this.content.label()),
                length: 1,
                height: 1,
            },
        ]
    }
    summary(params: TableDataStyledParams<M>): TableDataSummarySingle[] {
        const { style } = this.mutable.core.summaryStyleMutable()
        const { content } = this.mutable.leaf.summaryMutable()
        return this.summaryContent(params, { style, content })
    }
    column({ visibleKeys, base, row }: TableDataRelatedParams<M, R>): TableDataColumnSingle[] {
        if (!this.isVisible(visibleKeys)) {
            return []
        }
        const { style } = this.mutable.core.columnStyleMutable()
        const { decorators } = this.mutable.core.columnMutable()
        return [
            {
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
            },
        ]
    }
    footer(params: TableDataStyledParams<M>): TableDataSummarySingle[] {
        const { style } = this.mutable.core.footerStyleMutable()
        const { content } = this.mutable.leaf.footerMutable()
        return this.summaryContent(params, { style, content })
    }

    summaryContent(
        { visibleKeys, base }: TableDataStyledParams<M>,
        { style, content }: SummaryContentParams
    ): TableDataSummarySingle[] {
        if (!this.isVisible(visibleKeys)) {
            return []
        }
        const shared = {
            key: this.key,
            style: mergeVerticalBorder(extendStyle({ base, style }), this.verticalBorder()),
        }
        switch (content.type) {
            case "none":
                return [{ type: "empty", ...shared }]

            case "content":
                return [
                    {
                        type: "single",
                        ...shared,
                        content: content.content(),
                    },
                ]
        }
    }

    border(borders: TableDataVerticalBorder[]): TableDataSingle<M, R> {
        this.mutable.leaf.border(borders)
        return this
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataSingle<M, R> {
        this.mutable.core.horizontalBorder(borders)
        return this
    }
    horizontalBorderRelated(borders: TableDataHorizontalBorderProvider<R>): TableDataSingle<M, R> {
        this.mutable.core.horizontalBorderRelated(borders)
        return this
    }
    horizontalBorder_header(borders: TableDataHorizontalBorder[]): TableDataSingle<M, R> {
        this.mutable.core.horizontalBorder_header(borders)
        return this
    }
    horizontalBorder_summary(borders: TableDataHorizontalBorder[]): TableDataSingle<M, R> {
        this.mutable.core.horizontalBorder_summary(borders)
        return this
    }
    horizontalBorder_footer(borders: TableDataHorizontalBorder[]): TableDataSingle<M, R> {
        this.mutable.core.horizontalBorder_footer(borders)
        return this
    }

    setSummary(content: TableDataSummaryProvider): TableDataSingle<M, R> {
        this.mutable.leaf.setSummary(content)
        return this
    }
    setFooter(content: TableDataSummaryProvider): TableDataSingle<M, R> {
        this.mutable.leaf.setFooter(content)
        return this
    }

    decorateView(decorator: TableDataViewDecorator): TableDataSingle<M, R> {
        this.mutable.leaf.decorateView(decorator)
        return this
    }
    decorateHeader(decorator: TableDataHeaderDecorator): TableDataSingle<M, R> {
        this.mutable.core.decorateHeader(decorator)
        return this
    }
    decorateSummary(decorator: TableDataSummaryDecorator): TableDataSingle<M, R> {
        this.mutable.core.decorateSummary(decorator)
        return this
    }
    decorateColumn(decorator: TableDataColumnDecorator): TableDataSingle<M, R> {
        this.mutable.core.decorateColumn(decorator)
        return this
    }
    decorateColumnRelated(decorator: TableDataColumnRelatedDecorator<R>): TableDataSingle<M, R> {
        this.mutable.core.decorateColumnRelated(decorator)
        return this
    }
    decorateFooter(decorator: TableDataSummaryDecorator): TableDataSingle<M, R> {
        this.mutable.core.decorateFooter(decorator)
        return this
    }
}

type SummaryContentParams = Readonly<{
    style: TableDataStyle
    content: TableDataSummaryProvider
}>
