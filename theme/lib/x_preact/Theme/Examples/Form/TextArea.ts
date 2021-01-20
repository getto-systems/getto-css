import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, box_double } from "../../../common/style"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function TextArea(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box_double({
        type: "full",
        title: "text area",
        body: [
            form({
                title: "small",
                body: html`<textarea class="input_small" rows="1" onInput=${onInput}></textarea>`,
                help: [],
            }),
            form({
                title: "default",
                body: html`<textarea rows="2" onInput=${onInput}></textarea>`,
                help: [],
            }),
            form({
                title: "large",
                body: html`<textarea class="input_large" rows="2" onInput=${onInput}></textarea>`,
                help: [],
            }),
            form({
                title: "extra large",
                body: html`<textarea class="input_xLarge" rows="2" onInput=${onInput}></textarea>`,
                help: [],
            }),
            form({
                title: "fill",
                body: html`<textarea class="input_fill" rows="2" onInput=${onInput}></textarea>`,
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
