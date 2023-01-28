import { h, VNode } from "preact"
import { useMemo, useState } from "preact/hooks"
import { html } from "htm/preact"

import { sortSign } from "../../../../../x_preact/design/table"

import { visibleKeys } from "../../../../../z_vendor/getto-table/preact/core"

import { container } from "../../../../../z_vendor/getto-css/preact/design/box"
import { sortLink } from "../../../../../z_vendor/getto-css/preact/design/table"

import { SearchSearchFormComponent } from "./search_form"
import { SearchPagerComponent } from "./pager"
import { SearchViewColumnsComponent } from "./view_columns"
import { buildSearchStructure, SearchTableComponent } from "./table"

import { generateSearchRows, Model, Row } from "./data"

type ContainerProps = {
    // no props
}
export function SearchContainerComponent(_: ContainerProps): VNode {
    const structure = useMemo(
        () =>
            buildSearchStructure(
                sortLink({
                    key: "id",
                    order: "normal",
                    href: (query) => `?sort=${query.key}.${query.order}`,
                    sign: sortSign,
                }),
            )(),
        [],
    )

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
        rows: generateSearchRows(),
        column: (row: Row) => structure.column(params, row),
    }

    return html`
        ${h(SearchSearchFormComponent, useSearchProps())}
        ${container([h(SearchPagerComponent, NO_PROPS), h(SearchViewColumnsComponent, content)])}
        ${h(SearchTableComponent, tableProps)}
    `

    function useSearchProps(): SearchProps {
        const [state, setState] = useState<SearchState>(initialSearch)
        const action: SearchAction = {
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
        return { state, action }
    }
}

export type SearchProps = Readonly<{
    state: SearchState
    action: SearchAction
}>
export interface SearchAction {
    search: Method<null>
    inputValidValue: Method<null>
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

interface Method<T> {
    (event: T): void
}
