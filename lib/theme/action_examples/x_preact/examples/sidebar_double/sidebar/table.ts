import { VNode } from "preact"
import { useMemo } from "preact/hooks"

import { tableCell } from "../../../../../../z_vendor/getto-table/preact/cell/simple"
import { tableStructure } from "../../../../../../z_vendor/getto-table/preact/cell/structure"
import { visibleAll } from "../../../../../../z_vendor/getto-table/preact/core"
import { tableAlign, tableClassName } from "../../../../../../z_vendor/getto-table/preact/decorator"

import { box_fill } from "../../../../../../z_vendor/getto-css/preact/design/box"
import {
    tableColumn,
    tableHeader,
    table_fill,
    tbody,
    thead,
} from "../../../../../../z_vendor/getto-css/preact/design/data"
import {
    label_gray,
    label_warning,
    linky,
} from "../../../../../../z_vendor/getto-css/preact/design/highlight"

type TableProps = {
    // no props
}
export function SidebarDoubleTableComponent(_: TableProps): VNode {
    const structure = useMemo(buildStructure, [])

    const model: Model = {
        rows: generateRows(),
    }

    const params = { visibleKeys: visibleAll, model }

    const content = {
        sticky: structure.sticky(),
        header: structure.header(params),
    }

    return box_fill({
        body: table_fill(content.sticky, [
            thead(tableHeader(content)),
            tbody(
                model.rows.flatMap((row) =>
                    tableColumn({ ...content, column: structure.column(params, row) })
                )
            ),
        ]),
    })

    type Model = Readonly<{
        rows: Row[]
    }>
    type Row = Readonly<{
        id: number
        name: string
        state: string
    }>

    function buildStructure() {
        return tableStructure({
            key: (row: Row) => row.id,
            cells: [
                tableCell("id", (_key) => {
                    return {
                        label: () => "ID",
                        header: linky,
                        column: (row: Row) => row.id,
                    }
                }).border(["rightDouble"]),

                tableCell("name", (_key) => {
                    return {
                        label: () => "名前",
                        header: linky,
                        column: (row: Row) => row.name,
                    }
                }),

                tableCell("state", (_key) => {
                    return {
                        label: () => "状態",
                        header: linky,
                        column: (row: Row) => stateLabel(row.state),
                    }
                }).decorateColumn(tableAlign(["center"])),
            ],
        })
            .horizontalBorder_header(["topNone"])
            .decorateRow(tableClassName(["row_hover"]))
            .stickyHeader()
            .freeze()
    }

    function generateRows(): Row[] {
        return repeatedRows(100)

        function repeatedRows(count: number) {
            const result: Row[] = []
            for (let i = 0; i < count; i++) {
                result.push(...rows())
            }
            return result
        }
        function rows(): Row[] {
            return [
                {
                    id: 1234,
                    name: "GETTO CSS",
                    state: "仮",
                },
                {
                    id: 123,
                    name: "GETTO",
                    state: "作業中",
                },
            ]
        }
    }

    function stateLabel(state: string) {
        switch (state) {
            case "仮":
                return label_gray(state)

            default:
                return label_warning(state)
        }
    }
}
