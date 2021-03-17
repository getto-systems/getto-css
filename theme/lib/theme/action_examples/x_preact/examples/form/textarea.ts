import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box_double } from "../../../../../z_vendor/getto-css/preact/design/box"
import {
    field,
    label_textarea,
    label_textarea_fill,
    label_textarea_large,
    label_textarea_small,
    label_textarea_xLarge,
} from "../../../../../z_vendor/getto-css/preact/design/form"

import { FormProps } from "./container"
import { FormFooterComponent } from "./form_footer"

type Props = FormProps
export function TextAreaComponent(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box_double({
        title: "text area",
        body: [
            field({
                title: "small",
                body: label_textarea_small(html`<textarea rows="1" onInput=${onInput}></textarea>`),
                help: [],
            }),
            field({
                title: "default",
                body: label_textarea(html`<textarea rows="2" onInput=${onInput}></textarea>`),
                help: [],
            }),
            field({
                title: "large",
                body: label_textarea_large(html`<textarea rows="2" onInput=${onInput}></textarea>`),
                help: [],
            }),
            field({
                title: "extra large",
                body: label_textarea_xLarge(html`<textarea rows="2" onInput=${onInput}></textarea>`),
                help: [],
            }),
            field({
                title: "fill",
                body: label_textarea_fill(html`<textarea rows="2" onInput=${onInput}></textarea>`),
                help: [],
            }),
        ],
        footer: h(FormFooterComponent, props),
    })
}
