import { h, VNode } from "preact"
import { html } from "htm/preact"

import { form, box } from "../../../common/style"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function Checkbox(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box({
        type: "full",
        title: "checkbox",
        body: [
            form({
                title: "inline",
                body: [
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
                ],
                help: [],
            }),
            form({
                title: "block",
                body: [
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
                ],
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
