import { VNode } from "preact"
import { html } from "htm/preact"

import { big, loginHeader, VNodeContent } from "../../../../common/layout"
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

    return html`<aside class="layout__login">
        <section class="loginBox">${loginHeader()}${content()}</section>
    </aside>`

    function content() {
        switch (state.type) {
            case "try-to-login":
                return html`${loginMessage()}
                    <div></div>`

            case "login":
                return html`${loginForm(state.state)}${loginFooter(state.state)}`
        }
    }

    function loginMessage() {
        return html`<big>
            <div class="loading loading_login">
                <p class="loading__message">認証中です</p>
                <i class="lnir lnir-spinner lnir-is-spinning"></i>
                <p class="loading__message">
                    30秒以上かかる場合は何かがおかしいので、
                    <br />
                    お手数ですが管理者に連絡お願いします
                </p>
            </div>
        </big>`
    }
    function loginForm(state: EditState) {
        if (state.invalid) {
            return big(
                body([
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
                ])
            )
        } else {
            return big(
                body([
                    form("ログインID", [
                        html`<input type="text" class="input_fill" onInput=${onInputAsInvalid} />`,
                    ]),
                    form("パスワード", [
                        html`<input type="password" class="input_fill" onInput=${onInputAsInvalid} />`,
                    ]),
                ])
            )
        }

        function body(content: VNodeContent) {
            return html`<section class="loginBox__body">${content}</section>`
        }
    }

    function loginFooter(state: EditState) {
        return big(footer([button(), resetLink()]))

        function footer(content: VNodeContent) {
            return html`<footer class="loginBox__footer button__container">${content}</footer>`
        }

        function button() {
            return html`<button
                type="button"
                class="button button_save ${modified()}"
                onClick="${onLoginClick}"
            >
                ログイン
            </button>`

            function modified() {
                if (!state.fill) {
                    return ""
                }
                return "button_modified"
            }
        }
        function resetLink() {
            return html`<div class="loginBox__link">
                <a href="#"><i class="lnir lnir-question-circle"></i> パスワードを忘れた方</a>
            </div>`
        }
    }
}
