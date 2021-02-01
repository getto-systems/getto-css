import { h, VNode } from "preact"
import { useState } from "preact/hooks"

import { Login } from "./Login"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
    return h(Login, useLoginProps())

    function useLoginProps(): LoginProps {
        const [state, setState] = useState<LoginState>({ type: "login", state: initialEditState })
        const component: LoginComponent = {
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
        return { state, component }
    }
}

export type LoginProps = Readonly<{
    state: LoginState
    component: LoginComponent
}>
export interface LoginComponent {
    inputValidValue: Action<null>
    inputInvalidValue: Action<null>
    login: Action<null>
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

interface Action<T> {
    (event: T): void
}
