import { VNode } from "preact"
import { useEffect } from "preact/hooks"
import { html } from "htm/preact"

import {
    mainBreadcrumbLink,
    mainBreadcrumb,
    mainBreadcrumbSeparator,
} from "../../../z_vendor/getto-css/preact/layout/app"

import { useComponent } from "../hooks"
import { siteInfo } from "../site"
import { icon } from "../icon"

import { MENU_ID } from "./MenuList"

import {
    BreadcrumbListComponent,
    initialBreadcrumbListState,
} from "../../../auth/x_components/Outline/breadcrumbList/component"

import { Breadcrumb, BreadcrumbNode, MenuCategory, MenuItem } from "../../../auth/permission/menu/data"
import { linky } from "../../../z_vendor/getto-css/preact/design/highlight"

type Props = Readonly<{
    breadcrumbList: BreadcrumbListComponent
}>
export function BreadcrumbList({ breadcrumbList }: Props): VNode {
    const state = useComponent(breadcrumbList, initialBreadcrumbListState)
    useEffect(() => {
        breadcrumbList.load()
    }, [])

    switch (state.type) {
        case "initial-breadcrumb-list":
            return mainBreadcrumb(EMPTY_CONTENT)

        case "succeed-to-load":
            return content(state.breadcrumb)
    }
}

function content(breadcrumb: Breadcrumb): VNode {
    return mainBreadcrumb(breadcrumbNodes(breadcrumb))
}
function breadcrumbNodes(breadcrumb: Breadcrumb): VNode[] {
    return [breadcrumbTop()].concat(breadcrumb.map((node) => withSeparator(...map(node))))

    function map(node: BreadcrumbNode): [string, VNode] {
        switch (node.type) {
            case "category":
                return [node.category.label, breadcrumbCategory(node.category)]

            case "item":
                return [node.item.href, breadcrumbItem(node.item)]
        }
    }
}
function breadcrumbTop(): VNode {
    return mainBreadcrumbLink(CATEGORY_HREF, html`${icon("menu-alt-3")} ${siteInfo().title}`)
}
function breadcrumbCategory({ label }: MenuCategory): VNode {
    return linky(label)
}
function breadcrumbItem({ label, icon, href }: MenuItem): VNode {
    const content = html`<i class="${icon}"></i> ${label}`
    return mainBreadcrumbLink(href, content)
}

function withSeparator(key: string, content: VNode): VNode {
    return html`<span class="noWrap" key=${key}>${SEPARATOR}${content}</span>`
}

// カテゴリーのリンク href="#menu" は menu の id="menu" と対応
// mobile レイアウトで menu の位置に移動
const CATEGORY_HREF = `#${MENU_ID}`
const SEPARATOR = mainBreadcrumbSeparator(icon("chevron-right"))

const EMPTY_CONTENT = html``