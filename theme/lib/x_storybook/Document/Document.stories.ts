import { h, VNode } from "preact"
import { html } from "htm/preact"

import { Document } from "../../x_preact/Document/Document"

import { newDocument } from "../../document/Document/Document/mock"
import { mapContentMockProps } from "../../document/Document/content/mock"
import { mapBreadcrumbMockProps } from "../../auth/Outline/breadcrumbList/mock"
import { mapMenuMockProps } from "../../auth/Outline/menuList/mock"

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
    const { document, update } = newDocument()
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
        update.content(mapContentMockProps({ type: "success" }))
        return html`
            <style>
                .sb-main-padded {
                    padding: 0 !important;
                }
            </style>
            ${h(Document, { document })}
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
