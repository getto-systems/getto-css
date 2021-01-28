import { h, VNode } from "preact"
import { useEffect, useErrorBoundary, useMemo } from "preact/hooks"
import { html } from "htm/preact"

import { visibleAll } from "../../../z_external/getto-table/preact/core"
import { tableStructure } from "../../../z_external/getto-table/preact/cell/structure"
import { tableCell } from "../../../z_external/getto-table/preact/cell/single"
import { tableAlign, tableClassName } from "../../../z_external/getto-table/preact/decorator"

import {
    mainHeader,
    sidebarBody_grow,
    sidebarBody,
    mainBody,
    appLayout_sidebar,
    mainTitle,
    appMain,
    appSidebar,
} from "../../../z_external/getto-css/preact/layout/app"
import { box_fill } from "../../../z_external/getto-css/preact/design/box"
import { form, button_search, pager } from "../../../z_external/getto-css/preact/design/form"
import {
    linky,
    pagerOptions,
    table,
    tableColumn,
    tableHeader,
    tbody,
    thead,
} from "../../../z_external/getto-css/preact/design/data"
import { label_gray, label_warning } from "../../../z_external/getto-css/preact/design/highlight"

import { useTerminate } from "../../common/hooks"
import { pagerCount, pagerParams } from "../../common/data"

import { ApplicationError } from "../../common/System/ApplicationError"
import { MainMenu } from "../../Outline/Menu/MainMenu"
import { BreadcrumbList } from "../../Outline/BreadcrumbList"
import { Container } from "./Sidebar/Container"

import { ExampleEntryPoint } from "../../../theme/Example/view"

type Props = Readonly<{
    example: ExampleEntryPoint
}>
export function Sidebar({ example: { resource, terminate } }: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })

    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useTerminate(terminate)

    useEffect(() => {
        document.title = `Sidebar | ${document.title}`
    }, [])

    return appLayout_sidebar({
        main: appMain({
            header: mainHeader([mainTitle("Sidebar"), h(BreadcrumbList, resource)]),
            body: mainBody(h(Container, NO_PROPS)),
        }),
        sidebar: appSidebar({
            header: mainHeader(mainTitle("List")),
            body: [sidebarBody(h(Pager, NO_PROPS)), sidebarBody_grow(h(Table, NO_PROPS))],
        }),
        menu: MainMenu(resource),
    })
}

type TableProps = {
    // no props
}
function Table(_: TableProps): VNode {
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
        type: "simple",
        body: table(content.sticky, [
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

type PagerProps = {
    // no props
}
function Pager(_: PagerProps): VNode {
    const all = 5532
    const offset = 0
    return box_fill({
        type: "simple",
        body: [form({ title: pagerCount(all), body: [select(), button()], help: [] })],
    })

    function select() {
        return pager(html`<select value=${offset}>
            ${options()}
        </select>`)

        function options() {
            return pagerOptions(pagerParams(all))
        }
    }
    function button() {
        return button_search({ state: "normal", label: "移動", onClick: () => null })
    }
}

const NO_PROPS = {}
