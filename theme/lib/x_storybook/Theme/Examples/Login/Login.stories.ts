import { h, VNode } from "preact"

import { Login } from "../../../../x_preact/Theme/Examples/Login/Login/Login"
import { LoginComponent, LoginState } from "../../../../x_preact/Theme/Examples/Login/Login/Container"

import "../../../../../css/getto.css"

export default {
    title: "Theme/Examples/Login/Login",
    argTypes: {
        type: {
            table: { disable: true },
        },
    },
}

type MockProps =
    | Readonly<{ type: "initial" }>
    | Readonly<{ type: "invalid" }>
    | Readonly<{ type: "fill" }>
    | Readonly<{ type: "try-to-login" }>

const Template: Story<MockProps> = (args) => {
    return h(Login, { state: map(args), component: initMockComponent() })

    function map(args: MockProps): LoginState {
        switch (args.type) {
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
}

function initMockComponent(): LoginComponent {
    return {
        inputInvalidValue: () => {
            // 何もしない
        },
        inputValidValue: () => {
            // 何もしない
        },
        login: () => {
            // 何もしない
        },
    }
}

interface Story<T> {
    args?: T
    (args: T): VNode
}

export const Initial = Template.bind({})
Initial.args = {
    type: "initial",
}

export const Invalid = Template.bind({})
Invalid.args = {
    type: "invalid",
}

export const Fill = Template.bind({})
Fill.args = {
    type: "fill",
}

export const TryToLogin = Template.bind({})
TryToLogin.args = {
    type: "try-to-login",
}
