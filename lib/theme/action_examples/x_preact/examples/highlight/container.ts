import { h, VNode } from "preact"
import { html } from "htm/preact"

import { container } from "../../../../../z_vendor/getto-css/preact/design/box"

import { BadgeComponent } from "./badge"
import { LabelComponent } from "./label"
import { BasicNoticeComponent, OtherNoticeComponent } from "./notice"

type ContainerProps = {
    // no props
}
export function HighlightContainerComponent(_: ContainerProps): VNode {
    return html`
        ${container([
            h(BadgeComponent, NO_PROPS),
            h(LabelComponent, NO_PROPS),
            h(BasicNoticeComponent, NO_PROPS),
            h(OtherNoticeComponent, NO_PROPS),
        ])}
    `
}

const NO_PROPS = {}
