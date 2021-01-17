import { h, VNode } from "preact"
import { useState } from "preact/hooks"
import { html } from "htm/preact"

import { container } from "../../../common/layout"

import { SearchForm } from "./SearchForm"
import { Pager } from "./Pager"
import { SearchColumn } from "./SearchColumn"
import { Table } from "./Table"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
    return html`
        ${h(SearchForm, useListProps())} ${container([h(Pager, NO_PROPS), h(SearchColumn, NO_PROPS)])}
        ${h(Table, NO_PROPS)}
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
    search: Post<null>
}
export type ListState = Readonly<{ type: "try-to-search" }> | Readonly<{ type: "search" }>

const initialList: ListState = { type: "search" }

interface Post<T> {
    (event: T): void
}

const NO_PROPS = {}
