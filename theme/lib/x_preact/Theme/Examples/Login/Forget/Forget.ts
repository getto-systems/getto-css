import { VNode } from "preact"
import { html } from "htm/preact"

import { buttons, loginBox, form, form_error } from "../../../../common/style"

import { EditState, ForgetProps } from "./Container"

type Props = ForgetProps
export function Forget({ state, component }: Props): VNode {
    function onInput() {
        component.inputValidValue(null)
    }
    function onInputAsInvalid() {
        component.inputInvalidValue(null)
    }
    function onResetClick() {
        component.reset(null)
    }

    return loginBox({ title: "パスワードリセット", content: content(), footer: footer() })

    function content() {
        switch (state.type) {
            case "try-to-reset":
                return resetMessage()

            case "succeed-to-send-token":
                return completeMessage()

            case "reset":
                return resetForm(state.state)
        }
    }
    function footer() {
        switch (state.type) {
            case "try-to-reset":
            case "succeed-to-send-token":
                return ""

            case "reset":
                return resetFooter(state.state)
        }
    }

    function resetMessage() {
        return [
            html`<p><i class="lnir lnir-spinner lnir-is-spinning"></i> リセットトークンを送信中です</p>`,
            html`<p>
                30秒以上かかる場合は何かがおかしいので、
                <br />
                お手数ですが管理者に連絡お願いします
            </p>`,
        ]
    }
    function completeMessage() {
        return [
            html`<p>
                リセットトークンを送信しました<br />
                記載されている URL から処理を続行してください
            </p>`,
        ]
    }
    function resetForm(state: EditState) {
        if (state.invalid) {
            return [
                form_error({
                    title: "ログインID",
                    body: html`<input type="text" class="input_fill" onInput=${onInput} />`,
                    help: ["登録されたメールアドレスにリセットトークンを送信します"],
                    notice: ["ログインIDを入力してください"],
                }),
            ]
        } else {
            return [
                form({
                    title: "ログインID",
                    body: html`<input type="text" class="input_fill" onInput=${onInputAsInvalid} />`,
                    help: ["登録されたメールアドレスにリセットトークンを送信します"],
                }),
            ]
        }
    }

    function resetFooter(state: EditState) {
        return buttons({ left: [button()], right: [loginLink()] })

        function button() {
            return html`<button
                type="button"
                class="button button_send ${modified()}"
                onClick="${onResetClick}"
            >
                リセットトークン送信
            </button>`

            function modified() {
                if (!state.fill) {
                    return ""
                }
                return "button_confirm"
            }
        }
        function loginLink() {
            return html`<a href="#"><i class="lnir lnir-enter"></i> ログインフォームを表示</a>`
        }
    }
}
