import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, fullBox_double_editing } from "../box"

import { FormFooter, FormFooterProps } from "./FormFooter"

type Props = FormFooterProps &
    Readonly<{
        onInput: Post<null>
    }>
export function TextArea(props: Props): VNode {
    const { onInput } = props

    return fullBox_double_editing(
        "text area",
        [
            form("small", [html`<textarea class="input_small" onInput=${onInput}></textarea>`]),
            form("default", [html`<textarea onInput=${onInput}></textarea>`]),
            form("medium", [html`<textarea class="input_medium" onInput=${onInput}></textarea>`]),
            form("fill", [html`<textarea class="input_fill" onInput=${onInput}></textarea>`]),
        ],
        h(FormFooter, props)
    )
}

interface Post<T> {
    (event: T): void
}
