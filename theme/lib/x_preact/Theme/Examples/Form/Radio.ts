import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, box } from "../../../common/style"

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
                    html`<label class="input__radio input_checked">
                        <input type="radio" name="radio" checked onInput=${onInput} />仮
                    </label>`,
                    html`<label class="input__radio">
                        <input type="radio" name="radio" onInput=${onInput} />作業中
                    </label>`,
                    html`<label class="input__radio">
                        <input type="radio" name="radio" onInput=${onInput} />完了
                    </label>`,
                    html`<label class="input__radio">
                        <input type="radio" name="radio" onInput=${onInput} />審査中
                    </label>`,
                ],
                help: [],
            }),
            form({
                title: "block",
                body: [
                    html`<label class="input__radio input__radio_block input_checked">
                        <input type="radio" name="radio-block" checked onInput=${onInput} />仮
                    </label>`,
                    html`<label class="input__radio input__radio_block">
                        <input type="radio" name="radio-block" onInput=${onInput} />作業中
                    </label>`,
                    html`<label class="input__radio input__radio_block">
                        <input type="radio" name="radio-block" onInput=${onInput} />完了
                    </label>`,
                    html`<label class="input__radio input__radio_block">
                        <input type="radio" name="radio-block" onInput=${onInput} />審査中
                    </label>`,
                ],
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
