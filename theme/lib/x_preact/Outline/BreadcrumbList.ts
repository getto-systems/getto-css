import { VNode } from "preact"
import { useState, useEffect } from "preact/hooks"
import { html } from "htm/preact"

import {
    BreadcrumbListComponent,
    initialBreadcrumbListState,
} from "../../auth/Outline/breadcrumbList/component"

import {
    Breadcrumb,
    BreadcrumbNode,
    markMenuCategoryLabel,
    MenuCategory,
    MenuItem,
} from "../../auth/permission/menu/data"
import { siteInfo } from "../common/layout"

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
    return html`<aside class="main__breadcrumb">${breadcrumbNodes(breadcrumb)}</aside>`
}
function breadcrumbNodes(breadcrumb: Breadcrumb): VNode[] {
    return [breadcrumbTop()].concat(breadcrumb.map((node) => withSeparator(map(node))))

    function map(node: BreadcrumbNode): VNode {
        switch (node.type) {
            case "category":
                return breadcrumbCategory(node.category)

            case "item":
                return breadcrumbItem(node.item)
        }
    }
}
function breadcrumbTop(): VNode {
    return html`<a class="main__breadcrumb__item" href="#menu" key="__TOP">${siteInfo().title}</a>`
}
function breadcrumbCategory(category: MenuCategory): VNode {
    const { label } = category
    // href="#menu" は menu の id="menu" と対応
    // mobile レイアウトで menu に移動
    return html`<a class="main__breadcrumb__item" href="#menu" key="${label}">${label}</a>`
}
function breadcrumbItem(item: MenuItem): VNode {
    const { label, icon, href } = item
    const inner = html`<i class="${icon}"></i> ${label}`
    return html`<a class="main__breadcrumb__item" href="${href}" key="${href}">${inner}</a>`
}

function withSeparator(content: VNode): VNode {
    return html`<span class="noWrap">${SEPARATOR}${content}</span>`
}

const SEPARATOR: VNode = html`<span class="main__breadcrumb__separator"
    ><i class="lnir lnir-chevron-right"></i
></span>`

const EMPTY_CONTENT = html``
