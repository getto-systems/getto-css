import { h } from "preact"

import { storyTemplate } from "../../../z_vendor/storybook/preact/story"

import { DashboardComponent } from "./dashboard"

import { mockDashboardResource } from "../mock"

export default {
    title: "main/secure/Example/Dashboard",
    parameters: {
        layout: "fullscreen",
    },
}

type MockProps = {
    // no props
}
const template = storyTemplate<MockProps>(() => {
    return h(DashboardComponent, mockDashboardResource())
})

export const Dashboard = template({})
