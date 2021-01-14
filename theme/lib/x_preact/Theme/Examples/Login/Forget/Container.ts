import { h, VNode } from "preact"
import { useState } from "preact/hooks"

import { Forget } from "./Forget"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
    return h(Forget, useResetProps())

    function useResetProps(): ForgetProps {
        const [state, setState] = useState<ForgetState>({ type: "reset", state: initialEditState })
        const component: ForgetComponent = {
            inputValidValue: () => {
                setState({
                    type: "reset",
                    state: {
                        fill: true,
                        invalid: false,
                    },
                })
            },
            inputInvalidValue: () => {
                setState({
                    type: "reset",
                    state: {
                        fill: true,
                        invalid: true,
                    },
                })
            },
            reset: () => {
                setState({
                    type: "try-to-reset",
                })

                setTimeout(() => {
                    setState({ type: "succeed-to-send-token" })
                }, 3000)
            },
        }
        return { state, component }
    }
}

export type ForgetProps = Readonly<{
    state: ForgetState
    component: ForgetComponent
}>
export interface ForgetComponent {
    inputValidValue: Post<null>
    inputInvalidValue: Post<null>
    reset: Post<null>
}
export type ForgetState =
    | Readonly<{ type: "reset"; state: EditState }>
    | Readonly<{ type: "try-to-reset" }>
    | Readonly<{ type: "succeed-to-send-token" }>

export type EditState = Readonly<{
    fill: boolean
    invalid: boolean
}>

const initialEditState: EditState = {
    fill: false,
    invalid: false,
}

interface Post<T> {
    (event: T): void
}
