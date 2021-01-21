import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box_double } from "../../../../z_external/css/getto/preact/design/box"
import {
    form,
    label_text,
    label_text_fill,
    label_text_large,
    label_text_small,
    label_text_xLarge,
} from "../../../../z_external/css/getto/preact/design/form"

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
                body: label_text_small(html`<input type="text" onInput=${onInput} />`),
                help: [],
            }),
            form({
                title: "default",
                body: label_text(html`<input type="text" onInput=${onInput} />`),
                help: [],
            }),
            form({
                title: "large",
                body: label_text_large(html`<input type="text" onInput=${onInput} />`),
                help: [],
            }),
            form({
                title: "extra large",
                body: label_text_xLarge(html`<input type="text" onInput=${onInput} />`),
                help: [],
            }),
            form({
                title: "fill",
                body: label_text_fill(html`<input type="text" onInput=${onInput} />`),
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
