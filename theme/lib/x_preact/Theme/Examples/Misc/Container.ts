import { h, VNode } from "preact"
import { html } from "htm/preact"

import { container } from "../../../common/layout"

import { Badge } from "./Badge"
import { Label } from "./Label"
import { NoticeBasic, NoticeOther } from "./Notice"
import { Vertical } from "./Vertical"
import { Visibility } from "./Visibility"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
    return html`
        ${container([
            h(Badge, NO_PROPS),
            h(Label, NO_PROPS),
            h(NoticeBasic, NO_PROPS),
            h(NoticeOther, NO_PROPS),
            h(Vertical, NO_PROPS),
            h(Visibility, NO_PROPS),
        ])}
    `
}

const NO_PROPS = {}
