import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, fullBox } from "../box"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function NumberBox(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return fullBox(
        "number box",
        [
            form("small", [html`<input type="number" class="input_small" onInput=${onInput} /> 回`]),
            form("default", [html`<input type="number" onInput=${onInput} /> 年`]),
        ],
        h(FormFooter, props)
    )
}
