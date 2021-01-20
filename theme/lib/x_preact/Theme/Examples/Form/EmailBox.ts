import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, box } from "../../../common/style"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function EmailBox(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box({
        type: "full",
        title: "email box",
        body: [
            form({
                title: "small",
                body: [html`<input type="email" class="input_small" onInput=${onInput} />`],
                help: [],
            }),
            form({
                title: "default",
                body: [html`<input type="email" onInput=${onInput} />`],
                help: [],
            }),
            form({
                title: "fill",
                body: [html`<input type="email" class="input_fill" onInput=${onInput} />`],
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
