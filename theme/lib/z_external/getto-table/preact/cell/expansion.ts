import {
    TableDataCellKey,
    TableDataColumnExpansion,
    TableDataColumnSingle,
    TableDataHeaderExpansion,
    TableDataParams,
    TableDataSummaryExpansion,
    TableDataView,
    TableDataVisibleKeys,
} from "../core"

import { tableDataMutable_base } from "../mutable/base"
import { tableDataMutable_leaf } from "../mutable/leaf"
import { TableDataMutable_base, TableDataMutable_leaf } from "../mutable"
import {
    isVisibleKey,
    TableDataExpansion,
    TableDataExpansionColumnContentProvider,
    TableDataRelatedParams,
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

export type TableDataExpansionContent<M, R> = Readonly<{
    label: TableDataContentProvider
    header: TableDataContentDecorator
    column: TableDataExpansionColumnContentProvider<R>
    length: TableDataExpansionLengthProvider<M>
}>
export function tableCell_expansion<M, R>(
    key: TableDataCellKey,
    content: { (key: TableDataCellKey): TableDataExpansionContent<M, R> }
): TableDataExpansion<M, R> {
    return new Cell(key, content(key))
}
class Cell<M, R> implements TableDataExpansion<M, R> {
    readonly type = "expansion" as const

    key: TableDataCellKey
    content: TableDataExpansionContent<M, R>
    mutable: Readonly<{
        core: TableDataMutable_base<R>
        leaf: TableDataMutable_leaf
    }>

    constructor(key: TableDataCellKey, content: TableDataExpansionContent<M, R>) {
        this.key = key
        this.content = content
        this.mutable = {
            core: tableDataMutable_base(),
            leaf: tableDataMutable_leaf(),
        }
    }

    length(model: M): number {
        return Math.max(1, this.content.length(model))
    }

    isVisible(visibleKeys: TableDataVisibleKeys): boolean {
        const { visible } = this.mutable.leaf.visibleMutable()
        return visible === "always" || isVisibleKey(this.key, visibleKeys)
    }

    verticalBorder(): TableDataVerticalBorderStyle {
        return this.mutable.leaf.verticalBorderMutable().border
    }

    view({ visibleKeys }: TableDataParams<M>): TableDataView[] {
        const { visible } = this.mutable.leaf.visibleMutable()
        if (visible === "always") {
            return []
        }

        const { decorator } = this.mutable.leaf.viewMutable()
        return [
            {
                key: this.key,
                content: decorateContent(this.content.label(), decorator),
                isVisible: this.isVisible(visibleKeys),
            },
        ]
    }
    header({ visibleKeys, base, model }: TableDataStyledParams<M>): TableDataHeaderExpansion[] {
        if (!this.isVisible(visibleKeys)) {
            return []
        }
        const { style } = this.mutable.core.headerStyleMutable()
        return [
            {
                type: "expansion",
                key: this.key,
                style: mergeVerticalBorder(extendStyle({ base, style }), this.verticalBorder()),
                content: this.content.header(this.content.label()),
                length: this.length(model),
                height: 1,
            },
        ]
    }
    summary(params: TableDataStyledParams<M>): TableDataSummaryExpansion[] {
        const { style } = this.mutable.core.summaryStyleMutable()
        const { content } = this.mutable.leaf.summaryMutable()
        return this.summaryContent(params, { style, content })
    }
    column({ visibleKeys, base, row, model }: TableDataRelatedParams<M, R>): TableDataColumnExpansion[] {
        if (!this.isVisible(visibleKeys)) {
            return []
        }
        const { style } = this.mutable.core.columnStyleMutable()
        const { decorators } = this.mutable.core.columnMutable()
        const length = this.length(model)
        const contents = this.content.column(row).slice(0, length)
        const columnStyle = mergeVerticalBorder(
            decorators.reduce(
                (acc, decorator) => decorateStyle(acc, decorator(row)),
                extendStyle({ base, style })
            ),
            this.verticalBorder()
        )
        return [
            {
                type: "expansion",
                key: this.key,
                style: columnStyle,
                length,
                columns: contents.map(
                    (content, index): TableDataColumnSingle => {
                        return {
                            type: "single",
                            key: [this.key, index].join(" "),
                            style: columnStyle,
                            content,
                        }
                    }
                ),
            },
        ]
    }
    footer(params: TableDataStyledParams<M>): TableDataSummaryExpansion[] {
        const { style } = this.mutable.core.footerStyleMutable()
        const { content } = this.mutable.leaf.footerMutable()
        return this.summaryContent(params, { style, content })
    }

    summaryContent(
        { visibleKeys, base, model }: TableDataStyledParams<M>,
        { style, content }: SummaryContentParams
    ): TableDataSummaryExpansion[] {
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
                        type: "expansion",
                        ...shared,
                        content: content.content(),
                        length: this.length(model),
                    },
                ]
        }
    }

    alwaysVisible(): TableDataExpansion<M, R> {
        this.mutable.leaf.alwaysVisible()
        return this
    }
    border(borders: TableDataVerticalBorder[]): TableDataExpansion<M, R> {
        this.mutable.leaf.border(borders)
        return this
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataExpansion<M, R> {
        this.mutable.core.horizontalBorder(borders)
        return this
    }
    horizontalBorderRelated(borders: TableDataHorizontalBorderProvider<R>): TableDataExpansion<M, R> {
        this.mutable.core.horizontalBorderRelated(borders)
        return this
    }
    horizontalBorder_header(borders: TableDataHorizontalBorder[]): TableDataExpansion<M, R> {
        this.mutable.core.horizontalBorder_header(borders)
        return this
    }
    horizontalBorder_summary(borders: TableDataHorizontalBorder[]): TableDataExpansion<M, R> {
        this.mutable.core.horizontalBorder_summary(borders)
        return this
    }
    horizontalBorder_footer(borders: TableDataHorizontalBorder[]): TableDataExpansion<M, R> {
        this.mutable.core.horizontalBorder_footer(borders)
        return this
    }

    setSummary(content: TableDataSummaryProvider): TableDataExpansion<M, R> {
        this.mutable.leaf.setSummary(content)
        return this
    }
    setFooter(content: TableDataSummaryProvider): TableDataExpansion<M, R> {
        this.mutable.leaf.setFooter(content)
        return this
    }

    decorateView(decorator: TableDataViewDecorator): TableDataExpansion<M, R> {
        this.mutable.leaf.decorateView(decorator)
        return this
    }
    decorateHeader(decorator: TableDataHeaderDecorator): TableDataExpansion<M, R> {
        this.mutable.core.decorateHeader(decorator)
        return this
    }
    decorateSummary(decorator: TableDataSummaryDecorator): TableDataExpansion<M, R> {
        this.mutable.core.decorateSummary(decorator)
        return this
    }
    decorateColumn(decorator: TableDataColumnDecorator): TableDataExpansion<M, R> {
        this.mutable.core.decorateColumn(decorator)
        return this
    }
    decorateColumnRelated(decorator: TableDataColumnRelatedDecorator<R>): TableDataExpansion<M, R> {
        this.mutable.core.decorateColumnRelated(decorator)
        return this
    }
    decorateFooter(decorator: TableDataSummaryDecorator): TableDataExpansion<M, R> {
        this.mutable.core.decorateFooter(decorator)
        return this
    }
}

type SummaryContentParams = Readonly<{
    style: TableDataStyle
    content: TableDataSummaryProvider
}>

interface TableDataExpansionLengthProvider<S> {
    (model: S): number
}
