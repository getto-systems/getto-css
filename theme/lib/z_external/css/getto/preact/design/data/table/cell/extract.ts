import { tableDataMutable_core } from "../mutable/core"
import { tableDataMutable_leaf } from "../mutable/leaf"
import { TableDataMutable_core, TableDataMutable_leaf } from "../mutable"
import {
    isVisibleKey,
    TableDataCellKey,
    TableDataColumnContentProvider,
    TableDataColumnExtract,
    TableDataExtract,
    TableDataHeaderExtract,
    TableDataParams,
    TableDataRelatedParams,
    TableDataStyledParams,
    TableDataSummaryExtract,
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

export type TableDataExtractContent<M, R> = Readonly<{
    label: TableDataContentProvider
    header: TableDataContentDecorator
    column: TableDataColumnContentProvider<R>
    length: TableDataExtractLengthProvider<M>
}>
export function tableData_extract<M, R>(
    key: TableDataCellKey,
    content: { (key: TableDataCellKey): TableDataExtractContent<M, R> }
): TableDataExtract<M, R> {
    return new Cell(key, content(key))
}
class Cell<M, R> implements TableDataExtract<M, R> {
    readonly type = "extract" as const

    key: TableDataCellKey
    content: TableDataExtractContent<M, R>
    mutable: Readonly<{
        core: TableDataMutable_core<R>
        leaf: TableDataMutable_leaf
    }>

    constructor(key: TableDataCellKey, content: TableDataExtractContent<M, R>) {
        this.key = key
        this.content = content
        this.mutable = {
            core: tableDataMutable_core(),
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
    header({ visibleKeys, base, model }: TableDataStyledParams<M>): TableDataHeaderExtract[] {
        if (!this.isVisible(visibleKeys)) {
            return []
        }
        const { style } = this.mutable.core.headerStyleMutable()
        return [
            {
                type: "extract",
                key: this.key,
                style: mergeVerticalBorder(extendStyle({ base, style }), this.verticalBorder()),
                content: this.content.header(this.content.label()),
                length: this.content.length(model),
            },
        ]
    }
    summary({ visibleKeys, base, model }: TableDataStyledParams<M>): TableDataSummaryExtract[] {
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
                        type: "extract",
                        ...shared,
                        content: content.content(),
                        length: this.content.length(model),
                    },
                ]
        }
    }
    column({ visibleKeys, base, row, model }: TableDataRelatedParams<M, R>): TableDataColumnExtract[] {
        if (!this.isVisible(visibleKeys)) {
            return []
        }
        const { style } = this.mutable.core.columnStyleMutable()
        const { decorators } = this.mutable.core.columnMutable()
        return [
            {
                type: "extract",
                key: this.key,
                style: mergeVerticalBorder(
                    decorators.reduce(
                        (acc, decorator) => decorateStyle(acc, decorator(row)),
                        extendStyle({ base, style })
                    ),
                    this.verticalBorder()
                ),
                content: this.content.column(row),
                length: this.content.length(model),
            },
        ]
    }

    border(borders: TableDataVerticalBorder[]): TableDataExtract<M, R> {
        this.mutable.leaf.border(borders)
        return this
    }

    horizontalBorder(borders: TableDataHorizontalBorder[]): TableDataExtract<M, R> {
        this.mutable.core.horizontalBorder(borders)
        return this
    }
    horizontalBorderRelated(borders: TableDataHorizontalBorderProvider<R>): TableDataExtract<M, R> {
        this.mutable.core.horizontalBorderRelated(borders)
        return this
    }
    horizontalBorder_header(borders: TableDataHorizontalBorder[]): TableDataExtract<M, R> {
        this.mutable.core.horizontalBorder_header(borders)
        return this
    }
    horizontalBorder_summary(borders: TableDataHorizontalBorder[]): TableDataExtract<M, R> {
        this.mutable.core.horizontalBorder_summary(borders)
        return this
    }

    setSummary(content: TableDataSummaryProvider): TableDataExtract<M, R> {
        this.mutable.leaf.setSummary(content)
        return this
    }

    decorateView(decorator: TableDataViewDecorator): TableDataExtract<M, R> {
        this.mutable.leaf.decorateView(decorator)
        return this
    }
    decorateHeader(decorator: TableDataHeaderDecorator): TableDataExtract<M, R> {
        this.mutable.core.decorateHeader(decorator)
        return this
    }
    decorateSummary(decorator: TableDataSummaryDecorator): TableDataExtract<M, R> {
        this.mutable.core.decorateSummary(decorator)
        return this
    }
    decorateColumn(decorator: TableDataColumnDecorator): TableDataExtract<M, R> {
        this.mutable.core.decorateColumn(decorator)
        return this
    }
    decorateColumnRelated(decorator: TableDataColumnRelatedDecorator<R>): TableDataExtract<M, R> {
        this.mutable.core.decorateColumnRelated(decorator)
        return this
    }
}

interface TableDataExtractLengthProvider<S> {
    (model: S): number
}
