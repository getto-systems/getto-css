import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, box } from "../../../common/style"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function NumberBox(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box({
        type: "full",
        title: "number box",
        body: [
            form({
                title: "small",
                body: [html`<input type="number" class="input_small" onInput=${onInput} /> 回`],
                help: [],
            }),
            form({
                title: "default",
                body: [html`<input type="number" onInput=${onInput} /> 年`],
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
