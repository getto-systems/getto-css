import { h, VNode } from "preact"
import { html } from "htm/preact"

import { BoxComponent } from "./box"
import { TableComponent } from "./table"

type ContainerProps = {
    // no props
}
export function SidebarContainerComponent(_: ContainerProps): VNode {
    return html`${h(BoxComponent, NO_PROPS)} ${h(TableComponent, NO_PROPS)}`
}

const NO_PROPS = {}
