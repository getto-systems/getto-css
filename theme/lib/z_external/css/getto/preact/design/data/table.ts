import { VNodeContent, VNodeKey } from "../../common"

import {
    inheritStyle,
    inheritVerticalBorderStyle,
    mergeVerticalBorder,
    TableDataClassName,
    TableDataFullStyle,
    TableDataRowStyle,
    TableDataSticky,
} from "./table/style"

export interface TableSpec<M, R> {
    view(params: TableDataParams<M>): TableDataView[]
    header(params: TableDataParams<M>): TableDataHeaderRow
    summary(params: TableDataParams<M>): TableDataSummaryRow
    column(params: TableDataParams<M>, row: R): TableDataColumnRow
    footer(params: TableDataParams<M>): TableDataFooterRow

    sticky(): TableDataSticky
}

export type TableDataParams<M> = Readonly<{ model: M; visibleKeys: TableDataCellKey[] }>
export type TableDataCellKey = VNodeKey

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
    height: 1
    length: 1
}>
export type TableDataHeaderExtract = Readonly<{
    type: "extract"
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
export type TableDataContentColumn = TableDataColumnSingle | TableDataColumnExtract

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
export type TableDataColumnExtract = TableDataColumnSingle | TableDataColumnEmpty
export type TableDataColumnTree = Readonly<{
    type: "tree"
    style: TableDataRowStyle
    children: TableDataColumnRow[]
    length: number
    height: number
}>
export function tableDataTreePadding(
    key: VNodeKey,
    tree: TableDataColumnTree,
    header: TableDataHeader[]
): TableDataColumnEmpty[] {
    if (tree.children.length >= tree.height) {
        return []
    }
    return [
        {
            type: "empty",
            key,
            style: mergeVerticalBorder(inheritStyle(), verticalBorder(header)),
            length: tree.length,
            height: tree.height - tree.children.length,
        },
    ]

    function verticalBorder(header: TableDataHeader[]) {
        if (header.length === 0) {
            return inheritVerticalBorderStyle()
        }
        return {
            left: header[0].style.border.vertical.left,
            right: header[header.length - 1].style.border.vertical.right,
        }
    }
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
