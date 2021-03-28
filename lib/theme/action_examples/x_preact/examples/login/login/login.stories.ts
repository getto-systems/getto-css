import "../../../../../../theme/css"
import { h } from "preact"

import { LoginComponent } from "./login"
import { LoginAction, LoginState } from "./container"
import { enumKeys, storyTemplate } from "../../../../../../z_vendor/storybook/preact/story"

enum LoginEnum {
    "initial",
    "invalid",
    "fill",
    "try-to-login",
}

export default {
    title: "Theme/Examples/Login/Login",
    argTypes: {
        login: {
            control: { type: "select", options: enumKeys(LoginEnum) },
        },
    },
}

type MockProps = Readonly<{
    login: keyof typeof LoginEnum
}>
const template = storyTemplate<MockProps>((props) => {
    return h(LoginComponent, {
        state: state(),
        action: mockAction(),
    })

    function state(): LoginState {
        switch (props.login) {
            case "initial":
                return {
                    type: "login",
                    state: {
                        fill: false,
                        invalid: false,
                    },
                }

            case "invalid":
                return {
                    type: "login",
                    state: {
                        fill: false,
                        invalid: true,
                    },
                }

            case "fill":
                return {
                    type: "login",
                    state: {
                        fill: true,
                        invalid: false,
                    },
                }

            case "try-to-login":
                return {
                    type: "try-to-login",
                }
        }
    }
})

function mockAction(): LoginAction {
    return {
        inputInvalidValue: noop,
        inputValidValue: noop,
        login: noop,
    }
}
function noop() {
    // 何もしない
}

export const Login = template({ login: "initial" })
