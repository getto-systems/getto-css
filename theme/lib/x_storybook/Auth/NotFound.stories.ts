import { h, VNode } from "preact"
import { html } from "htm/preact"

import { NotFound } from "../../x_preact/Auth/NotFound"

import { newNotFound } from "../../auth/NotFound/NotFound/mock"
import { mapCurrentVersionMockProps } from "../../auth/NotFound/currentVersion/mock"

import "../../../../css/getto.css"

export default {
    title: "Auth/NotFound",
    argTypes: {
        type: {
            table: { disable: true },
        },
    },
}

type MockProps = {
    // no props
}
const Template: Story<MockProps> = (args) => {
    const { notFound, update } = newNotFound()
    return h(Preview, { args })

    function Preview(_: { args: MockProps }) {
        update.currentVersion(mapCurrentVersionMockProps({ type: "success" }))
        return html`
            <style>
                .sb-main-padded {
                    padding: 0 !important;
                }
            </style>
            ${h(NotFound, { notFound })}
        `
    }
}

interface Story<T> {
    args?: T
    (args: T): VNode
}

export const Success = Template.bind({})
Success.args = {}
