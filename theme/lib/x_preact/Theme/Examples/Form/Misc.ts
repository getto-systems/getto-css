import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, box } from "../../../common/style"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function Misc(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box({
        type: "full",
        title: "misc",
        body: [
            form({
                title: "tel",
                body: [html`<input type="tel" onInput=${onInput} />`],
                help: [],
            }),
            form({
                title: "select",
                body: [
                    html`<select onChange=${onInput}>
                        <option>仮</option>
                        <option>作業中</option>
                        <option>保留</option>
                        <option>完了</option>
                    </select>`,
                ],
                help: [],
            }),
            form({
                title: "long select",
                body: [
                    html`<select onChange=${onInput}>
                        <option>長い選択肢。さらに長い選択肢。より長い選択肢。</option>
                    </select>`,
                ],
                help: [],
            }),
            form({
                title: "date",
                body: [html`<input type="date" onInput=${onInput} />`],
                help: [],
            }),
            form({
                title: "time",
                body: [html`<input type="time" onInput=${onInput} />`],
                help: [],
            }),
            form({
                title: "file",
                body: [html`<input type="file" onInput=${onInput} />`],
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
