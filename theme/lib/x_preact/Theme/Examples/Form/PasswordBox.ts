import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, fullBox_double } from "../box"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function PasswordBox(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return fullBox_double(
        "password box",
        [
            form("small", [html`<input type="password" class="input_small" onInput=${onInput} />`]),
            form("default", [html`<input type="password" onInput=${onInput} />`]),
            form("medium", [html`<input type="password" class="input_medium" onInput=${onInput} />`]),
            form("large", [html`<input type="password" class="input_large" onInput=${onInput} />`]),
            form("fill", [html`<input type="password" class="input_fill" onInput=${onInput} />`]),
        ],
        h(FormFooter, props)
    )
}
