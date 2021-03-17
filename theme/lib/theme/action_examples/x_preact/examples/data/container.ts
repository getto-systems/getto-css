import { h, VNode } from "preact"
import { useMemo, useState } from "preact/hooks"
import { html } from "htm/preact"

import { sortSign } from "../../../../../x_preact/common/design/table"

import { visibleKeys } from "../../../../../z_vendor/getto-table/preact/core"

import { container } from "../../../../../z_vendor/getto-css/preact/design/box"
import { Sort, sortLink } from "../../../../../z_vendor/getto-css/preact/design/data"

import { SearchFormComponent } from "./search_form"
import { PagerComponent } from "./pager"
import { ViewColumnsComponent } from "./view_columns"
import { buildStructure, TableComponent } from "./table"

import { generateRows, Model, Row } from "./data"

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
    const structure = useMemo(buildStructure(sortLink(sort)), [])

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
        rows: generateRows(),
        column: (row: Row) => structure.column(params, row),
    }

    return html`
        ${h(SearchFormComponent, useListProps())}
        ${container([h(PagerComponent, NO_PROPS), h(ViewColumnsComponent, content)])}
        ${h(TableComponent, tableProps)}
    `

    function useListProps(): ListProps {
        const [state, setState] = useState<ListState>(initialList)
        const component: ListComponent = {
            search: () => {
                setState({ type: "try-to-search" })

                setTimeout(() => {
                    setState(initialList)
                }, 3000)
            },
        }
        return { state, component }
    }
}

export type ListProps = Readonly<{
    state: ListState
    component: ListComponent
}>
export interface ListComponent {
    search: Action<null>
}
export type ListState = Readonly<{ type: "try-to-search" }> | Readonly<{ type: "search" }>

const initialList: ListState = { type: "search" }

interface Action<T> {
    (event: T): void
}

const NO_PROPS = {}
