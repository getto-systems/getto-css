import { VNode } from "preact"
import { html } from "htm/preact"

import { loginBox } from "../../../../../z_vendor/getto-css/preact/layout/login"
import {
    field,
    field_error,
    buttons,
    button_send,
    label_text_fill,
} from "../../../../../z_vendor/getto-css/preact/design/form"

import { icon, spinner } from "../../../../z_common/icon"
import { siteInfo } from "../../../../z_common/site"

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

    return loginBox(siteInfo(), { title: "パスワードリセット", body: content(), footer: footer() })

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
            html`<p>${spinner} リセットトークンを送信中です</p>`,
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
                label_text_fill(
                    field_error({
                        title: "ログインID",
                        body: html`<input type="text" onInput=${onInput} />`,
                        help: ["登録されたメールアドレスにリセットトークンを送信します"],
                        notice: ["ログインIDを入力してください"],
                    })
                ),
            ]
        } else {
            return [
                label_text_fill(
                    field({
                        title: "ログインID",
                        body: html`<input type="text" onInput=${onInputAsInvalid} />`,
                        help: ["登録されたメールアドレスにリセットトークンを送信します"],
                    })
                ),
            ]
        }
    }

    function resetFooter(state: EditState) {
        return buttons({ left: button(), right: loginLink() })

        function button() {
            const buttonState = state.fill ? "confirm" : "normal"
            return button_send({
                state: buttonState,
                label: "リセットトークン送信",
                onClick: onResetClick,
            })
        }
        function loginLink() {
            return html`<a href="#">${icon("enter")} ログインフォームを表示</a>`
        }
    }
}
