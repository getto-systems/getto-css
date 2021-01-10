import { h, VNode } from "preact"

import { HowToUse } from "../../../x_preact/Theme/Home/HowToUse"

import {
    HowToUseMockProps,
    initHowToUseComponent,
    mapHowToUseMockProps,
} from "../../../theme/Home/howToUse/mock"

import { initialHowToUseState } from "../../../theme/Home/howToUse/component"

import "../../../../css/getto.css"

export default {
    title: "Theme/Home/HowToUse",
    argTypes: {
        type: {
            table: { disable: true },
        },
    },
}

type MockProps = HowToUseMockProps
const Template: Story<MockProps> = (args) => {
    const howToUse = initHowToUseComponent(initialHowToUseState)
    return h(Preview, { args })

    function Preview(props: { args: MockProps }) {
        howToUse.update(mapHowToUseMockProps(props.args))
        return h(HowToUse, { howToUse })
    }
}

interface Story<T> {
    args?: T
    (args: T): VNode
}

export const Success = Template.bind({})
Success.args = {
    type: "success",
}

export const Try = Template.bind({})
Try.args = {
    type: "try",
}

export const Delayed = Template.bind({})
Delayed.args = {
    type: "delayed",
}

export const Failed = Template.bind({})
Failed.args = {
    type: "failed",
    err: "load error",
}
