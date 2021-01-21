import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box_double } from "../../../../z_external/css/getto/preact/design/box"
import {
    form,
    label_password,
    label_password_fill,
    label_password_large,
    label_password_small,
    label_password_xLarge,
} from "../../../../z_external/css/getto/preact/design/form"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function PasswordBox(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box_double({
        type: "full",
        title: "password box",
        body: [
            form({
                title: "small",
                body: label_password_small(html`<input type="password" onInput=${onInput} />`),
                help: [],
            }),
            form({
                title: "default",
                body: label_password(html`<input type="password" onInput=${onInput} />`),
                help: [],
            }),
            form({
                title: "large",
                body: label_password_large(html`<input type="password" onInput=${onInput} />`),
                help: [],
            }),
            form({
                title: "extra large",
                body: label_password_xLarge(html`<input type="password" onInput=${onInput} />`),
                help: [],
            }),
            form({
                title: "fill",
                body: label_password_fill(html`<input type="password" onInput=${onInput} />`),
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
