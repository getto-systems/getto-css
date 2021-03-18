import { h, VNode } from "preact"
import { useState } from "preact/hooks"

import { LoginComponent } from "./login"

type ContainerProps = {
    // no props
}
export function LoginContainerComponent(_: ContainerProps): VNode {
    return h(LoginComponent, useLoginProps())

    function useLoginProps(): LoginProps {
        const [state, setState] = useState<LoginState>({ type: "login", state: initialEditState })
        const action: LoginAction = {
            inputValidValue: () => {
                setState({
                    type: "login",
                    state: {
                        fill: true,
                        invalid: false,
                    },
                })
            },
            inputInvalidValue: () => {
                setState({
                    type: "login",
                    state: {
                        fill: true,
                        invalid: true,
                    },
                })
            },
            login: () => {
                setState({
                    type: "try-to-login",
                })

                setTimeout(() => {
                    setState({ type: "login", state: initialEditState })
                }, 3000)
            },
        }
        return { state, action }
    }
}

export type LoginProps = Readonly<{
    state: LoginState
    action: LoginAction
}>
export interface LoginAction {
    inputValidValue: Method<null>
    inputInvalidValue: Method<null>
    login: Method<null>
}
export type LoginState =
    | Readonly<{ type: "login"; state: EditState }>
    | Readonly<{ type: "try-to-login" }>

export type EditState = Readonly<{
    fill: boolean
    invalid: boolean
}>

const initialEditState: EditState = {
    fill: false,
    invalid: false,
}

interface Method<T> {
    (event: T): void
}
