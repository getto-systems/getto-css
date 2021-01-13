import { VNode } from "preact"
import { html } from "htm/preact"

import { big, loginHeader, VNodeContent } from "../../../common/layout"
import { formWithHelp, formWithHelp_error } from "../box"

import { EditState, ResetProps } from "./Container"

type Props = ResetProps
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

    return html`<aside class="login">
        <section class="login__box">${loginHeader()}${content()}</section>
    </aside>`

    function content() {
        switch (state.type) {
            case "try-to-reset":
                return html`${resetMessage()}
                    <div></div>`

            case "succeed-to-send-token":
                return html`${completeMessage()}
                    <div></div>`

            case "reset":
                return html`${resetForm(state.state)}${resetFooter(state.state)}`
        }
    }

    function resetMessage() {
        return html`<big>
            <div class="loading loading_login">
                <p class="loading__message">リセットトークンを送信中です</p>
                <i class="lnir lnir-spinner lnir-is-spinning"></i>
                <p class="loading__message">
                    30秒以上かかる場合は何かがおかしいので、
                    <br />
                    お手数ですが管理者に連絡お願いします
                </p>
            </div>
        </big>`
    }
    function completeMessage() {
        return html`<big>
            <div class="loading loading_login">
                <p class="loading__message">
                    リセットトークンを送信しました<br />
                    記載されている URL から処理を続行してください
                </p>
            </div>
        </big>`
    }
    function resetForm(state: EditState) {
        if (state.invalid) {
            return big(
                body([
                    formWithHelp_error(
                        "ログインID",
                        html`<input type="text" class="input_fill" onInput=${onInput} />`,
                        ["ログインIDを入力してください"],
                        ["登録されたメールアドレスにリセットトークンを送信します"]
                    ),
                ])
            )
        } else {
            return big(
                body([
                    formWithHelp(
                        "ログインID",
                        html`<input type="text" class="input_fill" onInput=${onInputAsInvalid} />`,
                        ["登録されたメールアドレスにリセットトークンを送信します"]
                    ),
                ])
            )
        }

        function body(content: VNodeContent) {
            return html`<section class="login__body">${content}</section>`
        }
    }

    function resetFooter(state: EditState) {
        return big(footer([button(), resetLink()]))

        function footer(content: VNodeContent) {
            return html`<footer class="login__footer button__container">${content}</footer>`
        }

        function button() {
            return html`<button
                type="button"
                class="button button_save ${modified()}"
                onClick="${onResetClick}"
            >
                リセットトークン送信
            </button>`

            function modified() {
                if (!state.fill) {
                    return ""
                }
                return "button_modified"
            }
        }
        function resetLink() {
            return html`<div class="login__link">
                <a href="#"><i class="lnir lnir-enter"></i> ログインフォームを表示</a>
            </div>`
        }
    }
}
