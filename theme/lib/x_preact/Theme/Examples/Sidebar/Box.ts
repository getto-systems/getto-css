import { VNode } from "preact"
import { container } from "../../../common/layout"

import { box, box_double, form } from "../box"

type Props = {
    // no props
}
export function Box(_: Props): VNode {
    return container([
        box_double("title", [form("content", ["コンテンツ"])]),
        box("title", [form("content", ["コンテンツ"])]),
    ])
}
