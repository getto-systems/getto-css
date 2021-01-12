import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, fullBox_editing } from "../box"

import { FormFooter, FormFooterProps } from "./FormFooter"

type Props = FormFooterProps &
    Readonly<{
        onInput: Post<null>
    }>
export function Checkbox(props: Props): VNode {
    const { onInput } = props

    return fullBox_editing(
        "checkbox",
        [
            form("inline", [
                html`
                    <label class="input__checkbox input_checked">
                        <input type="checkbox" name="checkbox" checked onInput=${onInput} />仮
                    </label>
                    ${" "}
                    <label class="input__checkbox">
                        <input type="checkbox" name="checkbox" onInput=${onInput} />作業中
                    </label>
                    ${" "}
                    <label class="input__checkbox">
                        <input type="checkbox" name="checkbox" onInput=${onInput} />完了
                    </label>
                    ${" "}
                    <label class="input__checkbox">
                        <input type="checkbox" name="checkbox" onInput=${onInput} />審査中
                    </label>
                `,
            ]),
            form("block", [
                html`
                    <label class="input__checkbox input__checkbox_block input_checked">
                        <input type="checkbox" name="checkbox" checked onInput=${onInput} />仮
                    </label>
                    ${" "}
                    <label class="input__checkbox input__checkbox_block">
                        <input type="checkbox" name="checkbox" onInput=${onInput} />作業中
                    </label>
                    ${" "}
                    <label class="input__checkbox input__checkbox_block">
                        <input type="checkbox" name="checkbox" onInput=${onInput} />完了
                    </label>
                    ${" "}
                    <label class="input__checkbox input__checkbox_block">
                        <input type="checkbox" name="checkbox" onInput=${onInput} />審査中
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
