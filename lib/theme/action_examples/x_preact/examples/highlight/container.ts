import { h, VNode } from "preact"
import { html } from "htm/preact"

import {
    box_double_transparent,
    box_fill_transparent,
    box_grow_transparent,
    box_transparent,
    container,
} from "../../../../../z_vendor/getto-css/preact/design/box"
import { notice_info } from "../../../../../z_vendor/getto-css/preact/design/highlight"

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
        ${container([box_fill_transparent(notice_info("transparent fill"))])}
        ${container([
            box_transparent(notice_info("transparent")),
            box_grow_transparent(notice_info("transparent grow")),
        ])}
        ${container([box_double_transparent(notice_info("transparent double"))])}
    `
}

const NO_PROPS = {}
