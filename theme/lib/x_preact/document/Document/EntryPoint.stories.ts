import { h, VNode } from "preact"
import { useEffect } from "preact/hooks"
import { html } from "htm/preact"

import { EntryPoint } from "./EntryPoint"

import { DocumentMockPropsPasser, newMockDocument } from "../../../document/x_components/Document/EntryPoint/mock"
import { initMockPropsPasser } from "../../../sub/getto-example/x_components/Application/mock"
import { MenuListMockProps } from "../../../auth/x_components/Outline/menuList/mock"
import { BreadcrumbListMockProps } from "../../../auth/x_components/Outline/breadcrumbList/mock"
import { ContentMockProps } from "../../../document/x_components/Document/content/mock"

import "../../../css/getto.css"

export default {
    title: "Document/Document",
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
    const passer: DocumentMockPropsPasser = {
        menuList: initMockPropsPasser<MenuListMockProps>(),
        breadcrumbList: initMockPropsPasser<BreadcrumbListMockProps>(),
        content: initMockPropsPasser<ContentMockProps>(),
    }
    const entryPoint = newMockDocument(passer)
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
            passer.content.update({ type: "success" })
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
