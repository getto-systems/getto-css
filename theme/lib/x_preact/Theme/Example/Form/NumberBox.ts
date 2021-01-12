import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, fullBox_editing } from "../box"

import { FormFooter, FormFooterProps } from "./FormFooter"

type Props = FormFooterProps &
    Readonly<{
        onInput: Post<null>
    }>
export function NumberBox(props: Props): VNode {
    const { onInput } = props

    return fullBox_editing(
        "number box",
        [
            form("small", [html`<input type="number" class="input_small" onInput=${onInput} />`]),
            form("default", [html`<input type="number" onInput=${onInput} />`]),
        ],
        h(FormFooter, props)
    )
}

interface Post<T> {
    (event: T): void
}
