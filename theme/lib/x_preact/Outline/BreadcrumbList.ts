import { VNode } from "preact"
import { useState, useEffect } from "preact/hooks"
import { html } from "htm/preact"

import {
    breadcrumbLink,
    breadcrumbList,
    breadcrumbSeparator,
} from "../../z_external/getto-css/preact/layout/app"

import { siteInfo } from "../common/site"
import { icon } from "../common/icon"

import { MENU_ID } from "./MenuList"

import {
    BreadcrumbListComponent,
    initialBreadcrumbListState,
} from "../../auth/Outline/breadcrumbList/component"

import { Breadcrumb, BreadcrumbNode, MenuCategory, MenuItem } from "../../auth/permission/menu/data"

type Props = Readonly<{
    breadcrumbList: BreadcrumbListComponent
}>
export function BreadcrumbList({ breadcrumbList }: Props): VNode {
    const [state, setState] = useState(initialBreadcrumbListState)
    useEffect(() => {
        breadcrumbList.onStateChange(setState)
        breadcrumbList.load()
    }, [])

    switch (state.type) {
        case "initial-breadcrumb-list":
            return EMPTY_CONTENT

        case "succeed-to-load":
            return content(state.breadcrumb)
    }
}

function content(breadcrumb: Breadcrumb): VNode {
    return breadcrumbList(breadcrumbNodes(breadcrumb))
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
    return breadcrumbLink(CATEGORY_HREF, siteInfo().title)
}
function breadcrumbCategory({ label }: MenuCategory): VNode {
    return breadcrumbLink(CATEGORY_HREF, label)
}
function breadcrumbItem({ label, icon, href }: MenuItem): VNode {
    const content = html`<i class="${icon}"></i> ${label}`
    return breadcrumbLink(href, content)
}

function withSeparator(key: string, content: VNode): VNode {
    return html`<span class="noWrap" key=${key}>${SEPARATOR}${content}</span>`
}

// カテゴリーのリンク href="#menu" は menu の id="menu" と対応
// mobile レイアウトで menu の位置に移動
const CATEGORY_HREF = `#${MENU_ID}`
const SEPARATOR = breadcrumbSeparator(icon("chevron-right"))

const EMPTY_CONTENT = html``
