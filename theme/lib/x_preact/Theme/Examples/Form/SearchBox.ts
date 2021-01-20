import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, box_double } from "../../../common/style"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function SearchBox(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box_double({
        type: "full",
        title: "search box",
        body: [
            form({
                title: "small",
                body: [html`<input type="search" class="input_small" onInput=${onInput} />`],
                help: [],
            }),
            form({
                title: "default",
                body: [html`<input type="search" onInput=${onInput} />`],
                help: [],
            }),
            form({
                title: "large",
                body: [html`<input type="search" class="input_large" onInput=${onInput} />`],
                help: [],
            }),
            form({
                title: "extra large",
                body: [html`<input type="search" class="input_xLarge" onInput=${onInput} />`],
                help: [],
            }),
            form({
                title: "fill",
                body: [html`<input type="search" class="input_fill" onInput=${onInput} />`],
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
