import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box_double } from "../../../../z_external/css/getto/preact/design/box"
import {
    form,
    label_search,
    label_search_fill,
    label_search_large,
    label_search_small,
    label_search_xLarge,
} from "../../../../z_external/css/getto/preact/design/form"

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
                body: label_search_small(html`<input type="search" onInput=${onInput} />`),
                help: [],
            }),
            form({
                title: "default",
                body: label_search(html`<input type="search" onInput=${onInput} />`),
                help: [],
            }),
            form({
                title: "large",
                body: label_search_large(html`<input type="search" onInput=${onInput} />`),
                help: [],
            }),
            form({
                title: "extra large",
                body: label_search_xLarge(html`<input type="search" onInput=${onInput} />`),
                help: [],
            }),
            form({
                title: "fill",
                body: label_search_fill(html`<input type="search" onInput=${onInput} />`),
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
