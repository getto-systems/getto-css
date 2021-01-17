import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, fullBox_double } from "../box"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function SearchBox(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return fullBox_double(
        "search box",
        [
            form("small", [html`<input type="search" class="input_small" onInput=${onInput} />`]),
            form("default", [html`<input type="search" onInput=${onInput} />`]),
            form("large", [html`<input type="search" class="input_large" onInput=${onInput} />`]),
            form("extra large", [html`<input type="search" class="input_xLarge" onInput=${onInput} />`]),
            form("fill", [html`<input type="search" class="input_fill" onInput=${onInput} />`]),
        ],
        h(FormFooter, props)
    )
}
