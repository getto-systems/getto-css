import { h, VNode } from "preact"
import { useMemo, useState } from "preact/hooks"
import { html } from "htm/preact"

import { sortSign } from "../../../../../x_preact/common/design/table"

import { visibleKeys } from "../../../../../z_vendor/getto-table/preact/core"

import { container } from "../../../../../z_vendor/getto-css/preact/design/box"
import { Sort, sortLink } from "../../../../../z_vendor/getto-css/preact/design/data"

import { DataSearchFormComponent } from "./search_form"
import { DataPagerComponent } from "./pager"
import { DataViewColumnsComponent } from "./view_columns"
import { buildDataStructure, DataTableComponent } from "./table"

import { generateDataRows, Model, Row } from "./data"

type ContainerProps = {
    // no props
}
export function DataContainerComponent(_: ContainerProps): VNode {
    const sort: Sort = {
        key: "id",
        order: "normal",
        href: (query) => `?sort=${query.key}.${query.order}`,
        sign: sortSign,
    }
    const structure = useMemo(buildDataStructure(sortLink(sort)), [])

    const model: Model = {}

    const params = {
        visibleKeys: visibleKeys(["id", "name", "state", "email", "price", "updatedAt", "memo"]),
        model,
    }

    const content = {
        sticky: structure.sticky(),
        view: structure.view(params),
        header: structure.header(params),
    }
    const tableProps = {
        content,
        rows: generateDataRows(),
        column: (row: Row) => structure.column(params, row),
    }

    return html`
        ${h(DataSearchFormComponent, useListProps())}
        ${container([h(DataPagerComponent, NO_PROPS), h(DataViewColumnsComponent, content)])}
        ${h(DataTableComponent, tableProps)}
    `

    function useListProps(): ListProps {
        const [state, setState] = useState<ListState>(initialList)
        const action: ListAction = {
            search: () => {
                setState({ type: "try-to-search" })

                setTimeout(() => {
                    setState(initialList)
                }, 3000)
            },
        }
        return { state, action }
    }
}

export type ListProps = Readonly<{
    state: ListState
    action: ListAction
}>
export interface ListAction {
    search: Method<null>
}
export type ListState = Readonly<{ type: "try-to-search" }> | Readonly<{ type: "search" }>

const initialList: ListState = { type: "search" }

interface Method<T> {
    (event: T): void
}

const NO_PROPS = {}
