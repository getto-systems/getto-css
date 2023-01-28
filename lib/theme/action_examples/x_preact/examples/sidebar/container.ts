import { h, VNode } from "preact"
import { html } from "htm/preact"

import { SidebarBoxComponent } from "./box"
import { SidebarTableComponent } from "./table"
import { modalBoxFixed } from "../../../../../z_vendor/getto-css/preact/design/box"

type ContainerProps = {
    // no props
}
export function SidebarContainerComponent(_: ContainerProps): VNode {
    return html`${[
        h(SidebarBoxComponent, NO_PROPS),
        h(SidebarTableComponent, NO_PROPS),
        modalBoxFixed({ title: "modal", body: "body" }),
    ]}`
}

const NO_PROPS = {}
