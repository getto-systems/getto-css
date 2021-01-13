import { h, VNode } from "preact"
import { useState } from "preact/hooks"
import { html } from "htm/preact"

import { SearchForm } from "./SearchForm"
import { Content } from "./Content"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
    return html` ${h(SearchForm, useSearchProps())} ${h(Content, NO_PROPS)} `

    function useSearchProps(): DocumentProps {
        const [state, setState] = useState<DocumentState>(initialDocument)
        const component: DocumentComponent = {
            search: () => {
                setState({ type: "try-to-search" })

                setTimeout(() => {
                    setState(initialDocument)
                }, 3000)
            },
        }
        return { state, component }
    }
}

export type DocumentProps = Readonly<{
    state: DocumentState
    component: DocumentComponent
}>
export interface DocumentComponent {
    search: Post<null>
}
export type DocumentState = Readonly<{ type: "search" }> | Readonly<{ type: "try-to-search" }>

const initialDocument: DocumentState = { type: "search" }

interface Post<T> {
    (event: T): void
}

const NO_PROPS = {}
