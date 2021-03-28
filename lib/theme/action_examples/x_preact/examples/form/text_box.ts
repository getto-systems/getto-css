import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box_double } from "../../../../../z_vendor/getto-css/preact/design/box"
import {
    field,
    label_text,
    label_text_fill,
    label_text_large,
    label_text_small,
    label_text_xLarge,
} from "../../../../../z_vendor/getto-css/preact/design/form"

import { FormProps } from "./container"
import { FormFooterComponent } from "./form_footer"

type Props = FormProps
export function TextBoxComponent(props: Props): VNode {
    const { action: component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box_double({
        title: "text box",
        body: [
            field({
                title: "small",
                body: label_text_small(html`<input type="text" onInput=${onInput} />`),
                help: [],
            }),
            field({
                title: "default",
                body: label_text(html`<input type="text" onInput=${onInput} />`),
                help: [],
            }),
            field({
                title: "large",
                body: label_text_large(html`<input type="text" onInput=${onInput} />`),
                help: [],
            }),
            field({
                title: "extra large",
                body: label_text_xLarge(html`<input type="text" onInput=${onInput} />`),
                help: [],
            }),
            field({
                title: "fill",
                body: label_text_fill(html`<input type="text" onInput=${onInput} />`),
                help: [],
            }),
        ],
        footer: h(FormFooterComponent, props),
    })
}
