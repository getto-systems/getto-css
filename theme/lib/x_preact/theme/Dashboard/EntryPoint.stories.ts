import { h, VNode } from "preact"
import { useEffect } from "preact/hooks"
import { html } from "htm/preact"

import { EntryPoint } from "./EntryPoint"

import { initMockPropsPasser } from "../../../sub/getto-example/x_components/Application/mock"
import { MenuListMockProps } from "../../../auth/x_components/Outline/menuList/mock"
import { BreadcrumbListMockProps } from "../../../auth/x_components/Outline/breadcrumbList/mock"
import { HowToUseMockProps } from "../../../theme/x_components/Dashboard/howToUse/mock"
import {
    DashboardMockPropsPasser,
    newMockDashboard,
} from "../../../theme/x_components/Dashboard/EntryPoint/mock"

import "../../../../css/getto.css"

export default {
    title: "Theme/Home/Dashboard",
    argTypes: {
        type: {
            table: { disable: true },
        },
    },
}

type MockProps = Readonly<{
    menuLabel: string
    menuBadgeCount: number
    breadcrumbIcon: string
}>
const Template: Story<MockProps> = (args) => {
    const passer: DashboardMockPropsPasser = {
        menuList: initMockPropsPasser<MenuListMockProps>(),
        breadcrumbList: initMockPropsPasser<BreadcrumbListMockProps>(),
        howToUse: initMockPropsPasser<HowToUseMockProps>(),
    }
    const entryPoint = newMockDashboard(passer)
    return h(Preview, { args })

    function Preview(props: { args: MockProps }) {
        useEffect(() => {
            passer.menuList.update({
                type: "success",
                label: props.args.menuLabel,
                badgeCount: props.args.menuBadgeCount,
            })
            passer.breadcrumbList.update({
                type: "success",
                label: props.args.menuLabel,
                icon: props.args.breadcrumbIcon,
            })
            passer.howToUse.update({ type: "success" })
        })
        return html`
            <style>
                .sb-main-padded {
                    padding: 0 !important;
                }
            </style>
            ${h(EntryPoint, entryPoint)}
        `
    }
}

interface Story<T> {
    args?: T
    (args: T): VNode
}

export const Initial = Template.bind({})
Initial.args = {
    menuLabel: "ホーム",
    menuBadgeCount: 99,
    breadcrumbIcon: "home",
}
