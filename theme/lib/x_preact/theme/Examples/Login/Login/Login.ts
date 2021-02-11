import { VNode } from "preact"
import { html } from "htm/preact"

import { loginBox } from "../../../../../z_vendor/getto-css/preact/layout/login"
import {
    field,
    field_error,
    buttons,
    button_send,
    label_text_fill,
    label_password_fill,
} from "../../../../../z_vendor/getto-css/preact/design/form"

import { icon, spinner } from "../../../../z_common/icon"
import { siteInfo } from "../../../../z_common/site"

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

    return loginBox(siteInfo(), { title: "ログイン", body: content(), footer: footer() })

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
                label_text_fill(
                    field_error({
                        title: "ログインID",
                        body: html`<input type="text" onInput=${onInput} />`,
                        help: [],
                        notice: ["ログインIDを入力してください"],
                    })
                ),
                label_password_fill(
                    field_error({
                        title: "パスワード",
                        body: html`<input type="password" onInput=${onInput} />`,
                        help: [],
                        notice: ["パスワードを入力してください"],
                    })
                ),
            ]
        } else {
            return [
                label_text_fill(
                    field({
                        title: "ログインID",
                        body: [html`<input type="text" onInput=${onInputAsInvalid} />`],
                        help: [],
                    })
                ),
                label_password_fill(
                    field({
                        title: "パスワード",
                        body: [html`<input type="password" onInput=${onInputAsInvalid} />`],
                        help: [],
                    })
                ),
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
