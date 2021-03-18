import { h, VNode } from "preact"
import { useState } from "preact/hooks"

import { ForgetComponent } from "./forget"

type ContainerProps = {
    // no props
}
export function ForgetContainerComponent(_: ContainerProps): VNode {
    return h(ForgetComponent, useResetProps())

    function useResetProps(): ForgetProps {
        const [state, setState] = useState<ForgetState>({ type: "reset", state: initialEditState })
        const action: ForgetAction = {
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
        return { state, action }
    }
}

export type ForgetProps = Readonly<{
    state: ForgetState
    action: ForgetAction
}>
export interface ForgetAction {
    inputValidValue: Method<null>
    inputInvalidValue: Method<null>
    reset: Method<null>
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

interface Method<T> {
    (event: T): void
}
