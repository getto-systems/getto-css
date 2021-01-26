import { tableDataMutable } from "../mutable/core"
import { tableDataMutable_leaf } from "../mutable/leaf"
import { TableDataMutable, TableDataMutable_leaf } from "../mutable"
import {
    isVisibleKey,
    TableDataCellKey,
    TableDataColumnContentProvider,
    TableDataColumnSingle,
    TableDataHeaderSingle,
    TableDataParams,
    TableDataRelatedParams,
    TableDataSingle,
    TableDataStyledParams,
    TableDataSummarySingle,
    TableDataView,
    TableDataVisibleKeys,
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
    TableDataVerticalBorder,
    TableDataVerticalBorderStyle,
} from "../style"

export type TableDataSingleContent<R> = Readonly<{
    label: TableDataContentProvider
    header: TableDataContentDecorator
    column: TableDataColumnContentProvider<R>
}>
export function tableData<M, R>(
    key: TableDataCellKey,
    content: { (key: TableDataCellKey): TableDataSingleContent<R> }
): TableDataSingle<M, R> {
    return new TableDataSingleImpl(key, content(key))
}
class TableDataSingleImpl<M, R> implements TableDataSingle<M, R> {
    readonly type = "single" as const

    key: TableDataCellKey
    content: TableDataSingleContent<R>
    mutable: Readonly<{
        core: TableDataMutable<R>
        leaf: TableDataMutable_leaf
    }>

    constructor(key: TableDataCellKey, content: TableDataSingleContent<R>) {
        this.key = key
        this.content = content
        this.mutable = {
            core: tableDataMutable(),
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
            },
        ]
    }
    summary({ visibleKeys, base }: TableDataStyledParams<M>): TableDataSummarySingle[] {
        if (!this.isVisible(visibleKeys)) {
            return []
        }
        const { style } = this.mutable.core.summaryStyleMutable()
        const { content } = this.mutable.leaf.summaryMutable()
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
            },
        ]
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

    setSummary(content: TableDataSummaryProvider): TableDataSingle<M, R> {
        this.mutable.leaf.setSummary(content)
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
}
