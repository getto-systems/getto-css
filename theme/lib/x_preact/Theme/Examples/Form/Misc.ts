import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, fullBox_editing } from "../box"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function Misc(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return fullBox_editing(
        "misc",
        [
            form("tel", [html`<input type="tel" onInput=${onInput} />`]),
            form("select", [
                html`<select onChange=${onInput}>
                    <option>仮</option>
                    <option>作業中</option>
                    <option>保留</option>
                    <option>完了</option>
                </select>`,
            ]),
            form("date", [html`<input type="date" onInput=${onInput} />`]),
            form("time", [html`<input type="time" onInput=${onInput} />`]),
            form("file", [html`<input type="file" onInput=${onInput} />`]),
        ],
        h(FormFooter, props)
    )
}
