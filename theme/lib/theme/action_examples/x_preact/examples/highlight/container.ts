import { h, VNode } from "preact"
import { html } from "htm/preact"

import { container } from "../../../../../z_vendor/getto-css/preact/design/box"

import { BadgeComponent } from "./badge"
import { LabelComponent } from "./label"
import { NoticeBasicComponent, NoticeOtherComponent } from "./notice"

type ContainerProps = {
    // no props
}
export function HighlightContainerComponent(_: ContainerProps): VNode {
    return html`
        ${container([
            h(BadgeComponent, NO_PROPS),
            h(LabelComponent, NO_PROPS),
            h(NoticeBasicComponent, NO_PROPS),
            h(NoticeOtherComponent, NO_PROPS),
        ])}
    `
}

const NO_PROPS = {}
