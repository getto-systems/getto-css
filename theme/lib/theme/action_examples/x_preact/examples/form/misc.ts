import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box } from "../../../../../z_vendor/getto-css/preact/design/box"
import { field } from "../../../../../z_vendor/getto-css/preact/design/form"

import { FormProps } from "./container"
import { FormFooterComponent } from "./form_footer"

type Props = FormProps
export function MiscComponent(props: Props): VNode {
    const { action: component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box({
        title: "misc",
        body: [
            field({
                title: "tel",
                body: html`<input type="tel" onInput=${onInput} />`,
                help: [],
            }),
            field({
                title: "select",
                body: html`<select onChange=${onInput}>
                    <option>仮</option>
                    <option>作業中</option>
                    <option>保留</option>
                    <option>完了</option>
                </select>`,

                help: [],
            }),
            field({
                title: "long select",
                body: html`<select onChange=${onInput}>
                    <option>長い選択肢。さらに長い選択肢。より長い選択肢。</option>
                </select>`,
                help: [],
            }),
            field({
                title: "date",
                body: html`<input type="date" onInput=${onInput} />`,
                help: [],
            }),
            field({
                title: "time",
                body: html`<input type="time" onInput=${onInput} />`,
                help: [],
            }),
            field({
                title: "file",
                body: html`<input type="file" onInput=${onInput} />`,
                help: [],
            }),
        ],
        footer: h(FormFooterComponent, props),
    })
}
