import { VNode } from "preact"
import { html } from "htm/preact"

import { buttons, loginBox, form, form_error, button_send } from "../../../../common/style"

import { EditState, LoginProps } from "./Container"
import { icon, spinner } from "../../../../common/icon"

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
            html`<p>${spinner} 認証中です</p>`,
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
                form_error({
                    title: "ログインID",
                    body: html`<input type="text" class="input_fill" onInput=${onInput} />`,
                    help: [],
                    notice: ["ログインIDを入力してください"],
                }),
                form_error({
                    title: "パスワード",
                    body: html`<input type="password" class="input_fill" onInput=${onInput} />`,
                    help: [],
                    notice: ["パスワードを入力してください"],
                }),
            ]
        } else {
            return [
                form({
                    title: "ログインID",
                    body: [html`<input type="text" class="input_fill" onInput=${onInputAsInvalid} />`],
                    help: [],
                }),
                form({
                    title: "パスワード",
                    body: [
                        html`<input type="password" class="input_fill" onInput=${onInputAsInvalid} />`,
                    ],
                    help: [],
                }),
            ]
        }
    }

    function loginFooter(state: EditState) {
        return buttons({ left: button(), right: resetLink() })

        function button() {
            const buttonState = state.fill ? "confirm" : "normal"
            return button_send({
                state: buttonState,
                label: "ログイン",
                onClick: onLoginClick,
            })
        }
        function resetLink() {
            return html`<a href="#">${icon("question-circle")} パスワードを忘れた場合</a>`
        }
    }
}
