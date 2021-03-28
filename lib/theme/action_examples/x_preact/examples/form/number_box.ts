import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box } from "../../../../../z_vendor/getto-css/preact/design/box"
import {
    field,
    label_number,
    label_number_fill,
    label_number_small,
} from "../../../../../z_vendor/getto-css/preact/design/form"

import { FormProps } from "./container"
import { FormFooterComponent } from "./form_footer"

type Props = FormProps
export function NumberBoxComponent(props: Props): VNode {
    const { action: component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box({
        title: "number box",
        body: [
            field({
                title: "small",
                body: label_number_small(html`<input type="number" onInput=${onInput} /> 回`),
                help: [],
            }),
            field({
                title: "default",
                body: label_number(html`<input type="number" onInput=${onInput} /> 年`),
                help: [],
            }),
            field({
                title: "fill",
                body: label_number_fill(html`<input type="number" onInput=${onInput} />`),
                help: [],
            }),
        ],
        footer: h(FormFooterComponent, props),
    })
}
