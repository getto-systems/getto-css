import { VNodeContent, VNodeKey } from "../../preact/common"
import { TableDataCell } from "./cell"

import { TableDataClassName, TableDataFullStyle, TableDataSticky } from "./style"

export interface TableStructure<M, R> {
    view(params: TableDataParams<M>): TableDataView[]
    header(params: TableDataParams<M>): TableDataHeaderRow
    summary(params: TableDataParams<M>): TableDataSummaryRow
    column(params: TableDataParams<M>, row: R): TableDataColumnRow
    footer(params: TableDataParams<M>): TableDataFooterRow

    sticky(): TableDataSticky
}

export type TableDataParams<M> = Readonly<{ model: M; visibleKeys: TableDataVisibleKeys }>
export type TableDataCellKey = VNodeKey
export type TableDataVisibleKeys =
    | Readonly<{ type: "all" }>
    | Readonly<{ type: "keys"; keys: TableDataCellKey[] }>

export const visibleAll: TableDataVisibleKeys = { type: "all" }
export function visibleKeys(keys: TableDataCellKey[]): TableDataVisibleKeys {
    return { type: "keys", keys }
}

export type TableDataView = Readonly<{
    key: VNodeKey
    content: VNodeContent
    isVisible: boolean
}>

export type TableDataHeader = TableDataHeaderSingle | TableDataHeaderExpansion | TableDataHeaderGroup

export type TableDataHeaderSingle = Readonly<{
    type: "single"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
    height: 1
    length: 1
}>
export type TableDataHeaderExpansion = Readonly<{
    type: "expansion"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
    height: 1
    length: number
}>
export type TableDataHeaderGroup = Readonly<{
    type: "group"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
    children: TableDataHeader[]
    height: number
    length: number
}>

export type TableDataSummary = TableDataSummarySingle | TableDataSummaryExpansion

export type TableDataSummaryEmpty = Readonly<{
    type: "empty"
    key: VNodeKey
    style: TableDataFullStyle
}>
export type TableDataSummarySingle =
    | TableDataSummaryEmpty
    | Readonly<{
          type: "single"
          key: VNodeKey
          style: TableDataFullStyle
          content: VNodeContent
      }>
export type TableDataSummaryExpansion =
    | TableDataSummaryEmpty
    | Readonly<{
          type: "expansion"
          key: VNodeKey
          style: TableDataFullStyle
          content: VNodeContent
          length: number
      }>

export type TableDataColumn = TableDataColumnSingle | TableDataColumnExpansion | TableDataColumnTree
export type TableDataLeafColumn = TableDataColumnSingle | TableDataColumnExpansion

export type TableDataColumnSingle = Readonly<{
    type: "single"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
    length: 1
    height: 1
}>
export type TableDataColumnEmpty = Readonly<{
    type: "empty"
    key: VNodeKey
    style: TableDataFullStyle
    length: number
    height: number
}>
export type TableDataColumnExpansion = TableDataColumnSingle | TableDataColumnEmpty
export type TableDataColumnTree = Readonly<{
    type: "tree"
    children: TableDataColumnRow[]
    length: number
    height: number
    paddingStyle: TableDataFullStyle
}>

export type TableCellTreePaddingContent = Readonly<{
    key: VNodeKey
    height: number
    column: TableDataColumnTree
}>
export function tableCellTreePadding({
    key,
    height,
    column,
}: TableCellTreePaddingContent): TableDataColumnEmpty[] {
    if (column.children.length >= height) {
        return []
    }
    return [
        {
            type: "empty",
            key,
            style: column.paddingStyle,
            length: column.length,
            height: height - column.children.length,
        },
    ]
}

export type TableDataHeaderRow = Readonly<{
    key: TableDataHeaderKeyProvider
    className: TableDataClassName
    headers: TableDataHeader[]
}>
export type TableDataSummaryRow = Readonly<{
    key: VNodeKey
    className: TableDataClassName
    summaries: TableDataSummary[]
}>
export type TableDataColumnRow = Readonly<{
    key: VNodeKey
    className: TableDataClassName
    columns: TableDataColumn[]
}>
export type TableDataFooterRow = Readonly<{
    key: VNodeKey
    className: TableDataClassName
    footers: TableDataSummary[]
}>

export interface TableDataHeaderKeyProvider {
    (index: number): VNodeKey
}
export interface TableDataKeyProvider {
    (): VNodeKey
}

export interface TableDataCellBuilder<M, R> {
    (cells: TableDataCell<M, R>[]): TableDataCell<M, R>[]
}
export function tableCells<M, R>(cells: TableDataCell<M, R>[]): TableDataCell<M, R>[] {
    return cells

    // work around
    // 空の配列だと型推論が失敗するので、
    // 下記サンプルのように具体的な型の cells を定義するために使う
    //
    //   const cells: TableDataCellBuilder<Model, Row> = tableCells
    //
    //   tableCell_group({
    //       key: "base",
    //       header: () => linky("基本情報"),
    //       cells: cells([]),
    //   })
}
