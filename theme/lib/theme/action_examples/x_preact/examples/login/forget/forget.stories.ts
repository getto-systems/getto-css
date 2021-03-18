import "../../../../../../theme/css"
import { h } from "preact"

import { ForgetComponent } from "./forget"
import { ForgetAction, ForgetState } from "./container"
import { enumKeys, storyTemplate } from "../../../../../../z_vendor/storybook/preact/story"

enum ForgetEnum {
    "initial",
    "invalid",
    "fill",
    "try-to-reset",
}

export default {
    title: "Theme/Examples/Login/Forget",
    argTypes: {
        forget: {
            control: { type: "select", options: enumKeys(ForgetEnum) },
        },
    },
}

type MockProps = Readonly<{
    forget: keyof typeof ForgetEnum
}>
const template = storyTemplate<MockProps>((props) => {
    return h(ForgetComponent, {
        state: state(),
        action: mockAction(),
    })

    function state(): ForgetState {
        switch (props.forget) {
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
})

function mockAction(): ForgetAction {
    return {
        inputInvalidValue: noop,
        inputValidValue: noop,
        reset: noop,
    }
}
function noop() {
    // 何もしない
}

export const Forget = template({ forget: "initial" })
