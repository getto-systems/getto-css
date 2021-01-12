import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, fullBox_editing } from "../box"

import { FormFooter, FormFooterProps } from "./FormFooter"

type Props = FormFooterProps &
    Readonly<{
        onInput: Post<null>
    }>
export function SearchBox(props: Props): VNode {
    const { onInput } = props

    return fullBox_editing(
        "search box",
        [
            form("small", [html`<input type="search" class="input_small" onInput=${onInput} />`]),
            form("default", [html`<input type="search" onInput=${onInput} />`]),
            form("medium", [html`<input type="search" class="input_medium" onInput=${onInput} />`]),
            form("large", [html`<input type="search" class="input_large" onInput=${onInput} />`]),
            form("fill", [html`<input type="search" class="input_fill" onInput=${onInput} />`]),
        ],
        h(FormFooter, props)
    )
}

interface Post<T> {
    (event: T): void
}
