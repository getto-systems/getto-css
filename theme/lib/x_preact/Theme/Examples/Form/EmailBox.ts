import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, fullBox_editing } from "../box"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function EmailBox(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return fullBox_editing(
        "email box",
        [
            form("small", [html`<input type="email" class="input_small" onInput=${onInput} />`]),
            form("default", [html`<input type="email" onInput=${onInput} />`]),
            form("medium", [html`<input type="email" class="input_medium" onInput=${onInput} />`]),
            form("fill", [html`<input type="email" class="input_fill" onInput=${onInput} />`]),
        ],
        h(FormFooter, props)
    )
}
