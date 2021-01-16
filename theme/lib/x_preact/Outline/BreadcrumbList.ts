import { VNode } from "preact"
import { useState, useEffect } from "preact/hooks"
import { html } from "htm/preact"

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
    return html`<aside class="main__breadcrumb">${breadcrumbNodes(breadcrumb)}</aside>`
}
function breadcrumbNodes(breadcrumb: Breadcrumb): VNode[] {
    return insertSeparator(breadcrumb.map(toNode))

    function toNode(node: BreadcrumbNode): VNode {
        switch (node.type) {
            case "category":
                return breadcrumbCategory(node.category)

            case "item":
                return breadcrumbItem(node.item)
        }
    }
    function insertSeparator(nodes: VNode[]): VNode[] {
        return nodes.reduce((acc, item) => {
            if (acc.length > 0) {
                acc.push(SEPARATOR)
            }
            acc.push(item)
            return acc
        }, [] as VNode[])
    }
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
const SEPARATOR: VNode = html`
    <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
`

const EMPTY_CONTENT = html``