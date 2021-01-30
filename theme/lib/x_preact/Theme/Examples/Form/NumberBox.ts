import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box } from "../../../../z_external/getto-css/preact/design/box"
import {
    form,
    label_number,
    label_number_fill,
    label_number_small,
} from "../../../../z_external/getto-css/preact/design/form"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function NumberBox(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box({
        title: "number box",
        body: [
            form({
                title: "small",
                body: label_number_small(html`<input type="number" onInput=${onInput} /> 回`),
                help: [],
            }),
            form({
                title: "default",
                body: label_number(html`<input type="number" onInput=${onInput} /> 年`),
                help: [],
            }),
            form({
                title: "fill",
                body: label_number_fill(html`<input type="number" onInput=${onInput} />`),
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
