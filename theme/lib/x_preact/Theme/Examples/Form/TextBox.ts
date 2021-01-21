import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box_double } from "../../../../z_external/css/getto/preact/design/box"
import { form } from "../../../../z_external/css/getto/preact/design/form"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function TextBox(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box_double({
        type: "full",
        title: "text box",
        body: [
            form({
                title: "small",
                body: html`<input type="text" class="input_small" onInput=${onInput} />`,
                help: [],
            }),
            form({
                title: "default",
                body: html`<input type="text" onInput=${onInput} />`,
                help: [],
            }),
            form({
                title: "large",
                body: html`<input type="text" class="input_large" onInput=${onInput} />`,
                help: [],
            }),
            form({
                title: "extra large",
                body: html`<input type="text" class="input_xLarge" onInput=${onInput} />`,
                help: [],
            }),
            form({
                title: "fill",
                body: html`<input type="text" class="input_fill" onInput=${onInput} />`,
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
