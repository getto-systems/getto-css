import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, box, radio, radio_block } from "../../../common/style"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function Radio(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box({
        type: "full",
        title: "radio",
        body: [
            form({
                title: "inline",
                body: [
                    radio({
                        isChecked: true,
                        input: html`<input type="radio" name="radio" checked onInput=${onInput} />仮`,
                        key: "仮",
                    }),
                    radio({
                        isChecked: false,
                        input: html`<input type="radio" name="radio" onInput=${onInput} />作業中`,
                        key: "作業中",
                    }),
                    radio({
                        isChecked: false,
                        input: html`<input type="radio" name="radio" onInput=${onInput} />完了`,
                        key: "完了",
                    }),
                    radio({
                        isChecked: false,
                        input: html`<input type="radio" name="radio" onInput=${onInput} />審査中`,
                        key: "審査中",
                    }),
                ],
                help: [],
            }),
            form({
                title: "block",
                body: [
                    radio_block({
                        isChecked: true,
                        input: html`<input type="radio" name="radio" checked onInput=${onInput} />仮`,
                        key: "仮",
                    }),
                    radio_block({
                        isChecked: false,
                        input: html`<input type="radio" name="radio" onInput=${onInput} />作業中`,
                        key: "作業中",
                    }),
                    radio_block({
                        isChecked: false,
                        input: html`<input type="radio" name="radio" onInput=${onInput} />完了`,
                        key: "完了",
                    }),
                    radio_block({
                        isChecked: false,
                        input: html`<input type="radio" name="radio" onInput=${onInput} />審査中`,
                        key: "審査中",
                    }),
                ],
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
