import { h, VNode } from "preact"

import { Forget } from "../../../../x_preact/Theme/Examples/Login/Forget/Forget"
import { ForgetComponent, ForgetState } from "../../../../x_preact/Theme/Examples/Login/Forget/Container"

import "../../../../../css/getto.css"

export default {
    title: "Theme/Examples/Login/Forget",
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
    | Readonly<{ type: "try-to-reset" }>

const Template: Story<MockProps> = (args) => {
    return h(Forget, { state: map(args), component: initMockComponent() })

    function map(args: MockProps): ForgetState {
        switch (args.type) {
            case "initial":
                return {
                    type: "reset",
                    state: {
                        fill: false,
                        invalid: false,
                    },
                }

            case "invalid":
                return {
                    type: "reset",
                    state: {
                        fill: false,
                        invalid: true,
                    },
                }

            case "fill":
                return {
                    type: "reset",
                    state: {
                        fill: true,
                        invalid: false,
                    },
                }

            case "try-to-reset":
                return {
                    type: "try-to-reset",
                }
        }
    }
}

function initMockComponent(): ForgetComponent {
    return {
        inputInvalidValue: () => {
            // 何もしない
        },
        inputValidValue: () => {
            // 何もしない
        },
        reset: () => {
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

export const TryToReset = Template.bind({})
TryToReset.args = {
    type: "try-to-reset",
}
