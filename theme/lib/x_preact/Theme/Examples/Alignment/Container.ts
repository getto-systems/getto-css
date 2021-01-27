import { h, VNode } from "preact"
import { html } from "htm/preact"

import { container } from "../../../../z_external/getto-css/preact/design/box"

import { Vertical } from "./Vertical"
import { Visibility } from "./Visibility"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
    return html` ${container([h(Vertical, NO_PROPS), h(Visibility, NO_PROPS)])} `
}

const NO_PROPS = {}
