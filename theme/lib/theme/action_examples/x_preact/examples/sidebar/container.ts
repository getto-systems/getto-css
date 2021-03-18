import { h, VNode } from "preact"
import { html } from "htm/preact"

import { SidebarBoxComponent } from "./box"
import { SidebarTableComponent } from "./table"

type ContainerProps = {
    // no props
}
export function SidebarContainerComponent(_: ContainerProps): VNode {
    return html`${h(SidebarBoxComponent, NO_PROPS)} ${h(SidebarTableComponent, NO_PROPS)}`
}

const NO_PROPS = {}
