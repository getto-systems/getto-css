import { h, VNode } from "preact"
import { html } from "htm/preact"

import { container } from "../../../../z_external/css/getto/preact/design/box"

import { Badge } from "./Badge"
import { Label } from "./Label"
import { NoticeBasic, NoticeOther } from "./Notice"

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
        ])}
    `
}

const NO_PROPS = {}
