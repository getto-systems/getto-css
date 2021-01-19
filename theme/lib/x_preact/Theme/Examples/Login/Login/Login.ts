import { VNode } from "preact"
import { html } from "htm/preact"

import { big, buttons, loginBox } from "../../../../common/layout"
import { form, formWithHelp_error } from "../../box"

import { EditState, LoginProps } from "./Container"

type Props = LoginProps
export function Login({ state, component }: Props): VNode {
    function onInput() {
        component.inputValidValue(null)
    }
    function onInputAsInvalid() {
        component.inputInvalidValue(null)
    }
    function onLoginClick() {
        component.login(null)
    }

    return loginBox({ title: "ログイン", content: content(), footer: footer() })

    function content() {
        switch (state.type) {
            case "try-to-login":
                return loginMessage()

            case "login":
                return loginForm(state.state)
        }
    }
    function footer() {
        switch (state.type) {
            case "try-to-login":
                return ""

            case "login":
                return loginFooter(state.state)
        }
    }

    function loginMessage() {
        return [
            html`<p><i class="lnir lnir-spinner lnir-is-spinning"></i> 認証中です</p>`,
            html`<p>
                30秒以上かかる場合は何かがおかしいので、
                <br />
                お手数ですが管理者に連絡お願いします
            </p>`,
        ]
    }
    function loginForm(state: EditState) {
        if (state.invalid) {
            return [
                formWithHelp_error(
                    "ログインID",
                    html`<input type="text" class="input_fill" onInput=${onInput} />`,
                    [],
                    ["ログインIDを入力してください"]
                ),
                formWithHelp_error(
                    "パスワード",
                    html`<input type="password" class="input_fill" onInput=${onInput} />`,
                    [],
                    ["パスワードを入力してください"]
                ),
            ]
        } else {
            return [
                form("ログインID", [
                    html`<input type="text" class="input_fill" onInput=${onInputAsInvalid} />`,
                ]),
                form("パスワード", [
                    html`<input type="password" class="input_fill" onInput=${onInputAsInvalid} />`,
                ]),
            ]
        }
    }

    function loginFooter(state: EditState) {
        return buttons({ left: [button()], right: [resetLink()] })

        function button() {
            return html`<button
                type="button"
                class="button button_send ${modified()}"
                onClick="${onLoginClick}"
            >
                ログイン
            </button>`

            function modified() {
                if (!state.fill) {
                    return ""
                }
                return "button_confirm"
            }
        }
        function resetLink() {
            return html`<a href="#"><i class="lnir lnir-question-circle"></i> パスワードを忘れた方</a>`
        }
    }
}
