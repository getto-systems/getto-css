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
export function SearchContainerComponent(_: ContainerProps): VNode {
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
        ${h(SearchFormComponent, useSearchProps())} ${container([h(PagerComponent, NO_PROPS), h(ViewColumnsComponent, content)])}
        ${h(TableComponent, tableProps)}
    `

    function useSearchProps(): SearchProps {
        const [state, setState] = useState<SearchState>(initialSearch)
        const component: SearchComponent = {
            search: () => {
                setState({ type: "try-to-search" })

                setTimeout(() => {
                    setState({
                        type: "search",
                        state: {
                            modified: false,
                            invalid: true,
                        },
                    })
                }, 3000)
            },
            inputValidValue: () => {
                setState({
                    type: "search",
                    state: {
                        modified: true,
                        invalid: false,
                    },
                })
            },
        }
        return { state, component }
    }
}

export type SearchProps = Readonly<{
    state: SearchState
    component: SearchComponent
}>
export interface SearchComponent {
    search: Action<null>
    inputValidValue: Action<null>
}
export type SearchState =
    | Readonly<{ type: "search"; state: EditState }>
    | Readonly<{ type: "try-to-search" }>

export type EditState = Readonly<{
    modified: boolean
    invalid: boolean
}>

const initialEditState: EditState = {
    modified: false,
    invalid: false,
}
const initialSearch: SearchState = {
    type: "search",
    state: initialEditState,
}

const NO_PROPS = {}

interface Action<T> {
    (event: T): void
}
