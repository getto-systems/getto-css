import { h, VNode } from "preact"
import { html } from "htm/preact"

import { Dashboard } from "../../../x_preact/Theme/Home/Dashboard"

import { newDashboard } from "../../../theme/Home/Dashboard/mock"
import { mapHowToUseMockProps } from "../../../theme/Home/howToUse/mock"
import { mapBreadcrumbMockProps } from "../../../auth/Outline/breadcrumbList/mock"
import { mapMenuMockProps } from "../../../auth/Outline/menuList/mock"

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
    const { dashboard, update } = newDashboard()
    return h(Preview, { args })

    function Preview(props: { args: MockProps }) {
        update.menuList(
            mapMenuMockProps({
                type: "success",
                label: props.args.menuLabel,
                badgeCount: props.args.menuBadgeCount,
            })
        )
        update.breadcrumbList(
            mapBreadcrumbMockProps({
                type: "success",
                label: props.args.menuLabel,
                icon: props.args.breadcrumbIcon,
            })
        )
        update.howToUse(mapHowToUseMockProps({ type: "success" }))
        return html`
            <style>
                .sb-main-padded {
                    padding: 0 !important;
                }
            </style>
            ${h(Dashboard, { dashboard })}
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
