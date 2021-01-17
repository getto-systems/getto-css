import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, fullBox_double } from "../box"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function TextArea(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return fullBox_double(
        "text area",
        [
            form("small", [html`<textarea class="input_small" rows="1" onInput=${onInput}></textarea>`]),
            form("default", [html`<textarea rows="2" onInput=${onInput}></textarea>`]),
            form("large", [html`<textarea class="input_large" rows="2" onInput=${onInput}></textarea>`]),
            form("extra large", [
                html`<textarea class="input_xLarge" rows="2" onInput=${onInput}></textarea>`,
            ]),
            form("fill", [html`<textarea class="input_fill" rows="2" onInput=${onInput}></textarea>`]),
        ],
        h(FormFooter, props)
    )
}
