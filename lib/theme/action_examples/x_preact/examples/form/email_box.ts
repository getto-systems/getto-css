import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box } from "../../../../../z_vendor/getto-css/preact/design/box"
import {
    field,
    label_email,
    label_email_fill,
    label_email_small,
} from "../../../../../z_vendor/getto-css/preact/design/form"

import { FormProps } from "./container"
import { FormFooterComponent } from "./form_footer"

type Props = FormProps
export function EmailBoxComponent(props: Props): VNode {
    const { action: component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box({
        title: "email box",
        body: [
            field({
                title: "small",
                body: label_email_small(html`<input type="email" onInput=${onInput} />`),
                help: [],
            }),
            field({
                title: "default",
                body: label_email(html`<input type="email" onInput=${onInput} />`),
                help: [],
            }),
            field({
                title: "fill",
                body: label_email_fill(html`<input type="email" onInput=${onInput} />`),
                help: [],
            }),
        ],
        footer: h(FormFooterComponent, props),
    })
}
