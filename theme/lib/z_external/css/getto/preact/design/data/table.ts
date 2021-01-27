import { VNodeContent, VNodeKey } from "../../common"

import { TableDataFullStyle, TableDataRowStyle, TableDataSticky } from "./table/style"

export type TableDataView = Readonly<{
    key: VNodeKey
    content: VNodeContent
    isVisible: boolean
}>

export type TableDataHeader = TableDataHeaderSingle | TableDataHeaderExtract | TableDataHeaderGroup

export type TableDataHeaderSingle = Readonly<{
    type: "single"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
}>
export type TableDataHeaderExtract = Readonly<{
    type: "extract"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
    length: number
}>
export type TableDataHeaderGroup = Readonly<{
    type: "group"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
    children: TableDataHeader[]
    height: number
}>

export type TableDataSummary = TableDataSummarySingle | TableDataSummaryExtract

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
export type TableDataSummaryExtract =
    | TableDataSummaryEmpty
    | Readonly<{
          type: "extract"
          key: VNodeKey
          style: TableDataFullStyle
          content: VNodeContent
          length: number
      }>

export type TableDataColumn = TableDataColumnSingle | TableDataColumnExtract | TableDataColumnTree

export type TableDataColumnSingle = Readonly<{
    type: "single"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
}>
export type TableDataColumnExtract = Readonly<{
    type: "extract"
    key: VNodeKey
    style: TableDataFullStyle
    content: VNodeContent
    length: number
}>
export type TableDataColumnTree = Readonly<{
    type: "tree"
    style: TableDataRowStyle
    children: TableDataColumnRow[]
    width: number
    height: number
}>

export type TableDataHeaderRow = Readonly<{
    key: TableDataHeaderKeyProvider
    headers: TableDataHeader[]
}>
export type TableDataSummaryRow = Readonly<{
    key: VNodeKey
    summaries: TableDataSummary[]
}>
export type TableDataColumnRow = Readonly<{
    key: VNodeKey
    columns: TableDataColumn[]
}>
export type TableDataFooterRow = Readonly<{
    key: VNodeKey
    footers: TableDataSummary[]
}>

export interface TableDataHeaderKeyProvider {
    (index: number): VNodeKey
}
export interface TableDataKeyProvider {
    (): VNodeKey
}

export type TableDataRowSpec<T> = Readonly<{
    sticky: TableDataSticky
    row: T
}>
