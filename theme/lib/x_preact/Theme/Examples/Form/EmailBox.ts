import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box } from "../../../../z_external/getto-css/preact/design/box"
import {
    form,
    label_email,
    label_email_fill,
    label_email_small,
} from "../../../../z_external/getto-css/preact/design/form"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function EmailBox(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box({
        title: "email box",
        body: [
            form({
                title: "small",
                body: label_email_small(html`<input type="email" onInput=${onInput} />`),
                help: [],
            }),
            form({
                title: "default",
                body: label_email(html`<input type="email" onInput=${onInput} />`),
                help: [],
            }),
            form({
                title: "fill",
                body: label_email_fill(html`<input type="email" onInput=${onInput} />`),
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
