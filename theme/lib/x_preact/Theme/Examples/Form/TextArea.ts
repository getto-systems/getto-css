import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box_double } from "../../../../z_external/getto-css/preact/design/box"
import {
    form,
    label_textarea,
    label_textarea_fill,
    label_textarea_large,
    label_textarea_small,
    label_textarea_xLarge,
} from "../../../../z_external/getto-css/preact/design/form"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function TextArea(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box_double({
        title: "text area",
        body: [
            form({
                title: "small",
                body: label_textarea_small(html`<textarea rows="1" onInput=${onInput}></textarea>`),
                help: [],
            }),
            form({
                title: "default",
                body: label_textarea(html`<textarea rows="2" onInput=${onInput}></textarea>`),
                help: [],
            }),
            form({
                title: "large",
                body: label_textarea_large(html`<textarea rows="2" onInput=${onInput}></textarea>`),
                help: [],
            }),
            form({
                title: "extra large",
                body: label_textarea_xLarge(html`<textarea rows="2" onInput=${onInput}></textarea>`),
                help: [],
            }),
            form({
                title: "fill",
                body: label_textarea_fill(html`<textarea rows="2" onInput=${onInput}></textarea>`),
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
