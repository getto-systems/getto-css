import { h, VNode } from "preact"
import { useMemo, useState } from "preact/hooks"
import { html } from "htm/preact"

import { SearchForm } from "./SearchForm"
import { buildStructure, Content } from "./Content"
import { generateRows, Model, Row } from "./data"
import { visibleAll } from "../../../../z_external/getto-table/preact/core"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
    const structure = useMemo(buildStructure, [])

    const model: Model = {
        sumPrice: 6200,
    }

    const params = {
        visibleKeys: visibleAll,
        model,
    }

    const content = {
        sticky: structure.sticky(),
        view: structure.view(params),
        header: structure.header(params),
        summary: structure.summary(params),
        footer: structure.footer(params),
    }
    const contentProps = {
        content,
        rows: generateRows(),
        column: (row: Row) => structure.column(params, row),
    }

    return html` ${h(SearchForm, useSearchProps())} ${h(Content, contentProps)} `

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
