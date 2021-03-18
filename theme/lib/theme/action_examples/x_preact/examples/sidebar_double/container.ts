import { h, VNode } from "preact"
import { html } from "htm/preact"

import { SidebarDoubleBoxComponent } from "./box"
import { SidebarDoubleTableComponent } from "./table"

type ContainerProps = {
    // no props
}
export function SidebarDoubleContainerComponent(_: ContainerProps): VNode {
    return html`${h(SidebarDoubleBoxComponent, NO_PROPS)} ${h(SidebarDoubleTableComponent, NO_PROPS)}`
}

const NO_PROPS = {}
