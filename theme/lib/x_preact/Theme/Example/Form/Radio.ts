import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, fullBox_editing } from "../box"

import { FormFooter, FormFooterProps } from "./FormFooter"

type Props = FormFooterProps &
    Readonly<{
        onInput: Post<null>
    }>
export function Radio(props: Props): VNode {
    const { onInput } = props

    return fullBox_editing(
        "radio",
        [
            form("inline", [
                html`
                    <label class="input__radio input_checked">
                        <input type="radio" name="radio" checked onInput=${onInput} />仮
                    </label>
                    ${" "}
                    <label class="input__radio">
                        <input type="radio" name="radio" onInput=${onInput} />作業中
                    </label>
                    ${" "}
                    <label class="input__radio">
                        <input type="radio" name="radio" onInput=${onInput} />完了
                    </label>
                    ${" "}
                    <label class="input__radio">
                        <input type="radio" name="radio" onInput=${onInput} />審査中
                    </label>
                `,
            ]),
            form("block", [
                html`
                    <label class="input__radio input__radio_block input_checked">
                        <input type="radio" name="radio-block" checked onInput=${onInput} />仮
                    </label>
                    ${" "}
                    <label class="input__radio input__radio_block">
                        <input type="radio" name="radio-block" onInput=${onInput} />作業中
                    </label>
                    ${" "}
                    <label class="input__radio input__radio_block">
                        <input type="radio" name="radio-block" onInput=${onInput} />完了
                    </label>
                    ${" "}
                    <label class="input__radio input__radio_block">
                        <input type="radio" name="radio-block" onInput=${onInput} />審査中
                    </label>
                `,
            ]),
        ],
        h(FormFooter, props)
    )
}

interface Post<T> {
    (event: T): void
}
