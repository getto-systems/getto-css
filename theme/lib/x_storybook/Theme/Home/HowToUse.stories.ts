import { h, VNode } from "preact"
import { useEffect } from "preact/hooks"

import { HowToUse } from "../../../x_preact/Theme/Home/HowToUse"

import { initMockPropsPasser } from "../../../sub/getto-example/application/mock"
import { HowToUseMockProps, initMockHowToUseComponent } from "../../../theme/Home/howToUse/mock"

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
    const passer = initMockPropsPasser<HowToUseMockProps>()
    const howToUse = initMockHowToUseComponent(passer)
    return h(Preview, { args })

    function Preview(props: { args: MockProps }) {
        useEffect(() => {
            passer.update(props.args)
        })
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
