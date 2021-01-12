import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, fullBox_editing } from "../box"

import { FormFooter, FormFooterProps } from "./FormFooter"

type Props = FormFooterProps &
    Readonly<{
        onInput: Post<null>
    }>
export function TextBox(props: Props): VNode {
    const { onInput } = props

    return fullBox_editing(
        "text box",
        [
            form("small", [html`<input type="text" class="input_small" onInput=${onInput} />`]),
            form("default", [html`<input type="text" onInput=${onInput} />`]),
            form("medium", [html`<input type="text" class="input_medium" onInput=${onInput} />`]),
            form("large", [html`<input type="text" class="input_large" onInput=${onInput} />`]),
            form("fill", [html`<input type="text" class="input_fill" onInput=${onInput} />`]),
        ],
        h(FormFooter, props)
    )
}

interface Post<T> {
    (event: T): void
}
