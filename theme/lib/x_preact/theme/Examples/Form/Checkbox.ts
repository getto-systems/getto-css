import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box } from "../../../../z_vendor/getto-css/preact/design/box"
import { field, checkbox, checkbox_block } from "../../../../z_vendor/getto-css/preact/design/form"

import { FormProps } from "./Container"
import { FormFooter } from "./FormFooter"

type Props = FormProps
export function Checkbox(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box({
        title: "checkbox",
        body: [
            field({
                title: "inline",
                body: [
                    checkbox({
                        isChecked: true,
                        input: html`<input
                                type="checkbox"
                                name="checkbox"
                                checked
                                onInput=${onInput}
                            />仮`,
                        key: "仮",
                    }),
                    checkbox({
                        isChecked: false,
                        input: html`<input type="checkbox" name="checkbox" onInput=${onInput} />作業中`,
                        key: "作業中",
                    }),
                    checkbox({
                        isChecked: false,
                        input: html`<input type="checkbox" name="checkbox" onInput=${onInput} />完了`,
                        key: "完了",
                    }),
                    checkbox({
                        isChecked: false,
                        input: html`<input type="checkbox" name="checkbox" onInput=${onInput} />審査中`,
                        key: "審査中",
                    }),
                ],
                help: [],
            }),
            field({
                title: "block",
                body: [
                    checkbox_block({
                        isChecked: true,
                        input: html`<input
                                type="checkbox"
                                name="checkbox"
                                checked
                                onInput=${onInput}
                            />仮`,
                        key: "仮",
                    }),
                    checkbox_block({
                        isChecked: false,
                        input: html`<input type="checkbox" name="checkbox" onInput=${onInput} />作業中`,
                        key: "作業中",
                    }),
                    checkbox_block({
                        isChecked: false,
                        input: html`<input type="checkbox" name="checkbox" onInput=${onInput} />完了`,
                        key: "完了",
                    }),
                    checkbox_block({
                        isChecked: false,
                        input: html`<input type="checkbox" name="checkbox" onInput=${onInput} />審査中`,
                        key: "審査中",
                    }),
                ],
                help: [],
            }),
        ],
        footer: h(FormFooter, props),
    })
}
