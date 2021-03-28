import { h, VNode } from "preact"

import { container } from "../../../../../z_vendor/getto-css/preact/design/box"

import { VerticalComponent } from "./vertical"
import { VisibilityComponent } from "./visibility"

type ContainerProps = {
    // no props
}
export function AlignmentContainerComponent(_: ContainerProps): VNode {
    return container([h(VerticalComponent, NO_PROPS), h(VisibilityComponent, NO_PROPS)])
}

const NO_PROPS = {}
