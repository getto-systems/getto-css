import { h, VNode } from "preact"
import { useMemo, useState } from "preact/hooks"
import { html } from "htm/preact"

import { sortSign } from "../../../z_common/data"

import { visibleKeys } from "../../../../z_vendor/getto-table/preact/core"

import { container } from "../../../../z_vendor/getto-css/preact/design/box"
import { Sort, sortLink } from "../../../../z_vendor/getto-css/preact/design/data"

import { SearchForm } from "./SearchForm"
import { Pager } from "./Pager"
import { ViewColumns } from "./ViewColumns"
import { buildStructure, Table } from "./Table"

import { generateRows, Model, Row } from "./data"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
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
        ${h(SearchForm, useListProps())} ${container([h(Pager, NO_PROPS), h(ViewColumns, content)])}
        ${h(Table, tableProps)}
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
