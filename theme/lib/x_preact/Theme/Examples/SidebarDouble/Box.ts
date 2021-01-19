import { VNode } from "preact"
import { container } from "../../../common/layout"

import { box, form } from "../box"

type Props = {
    // no props
}
export function Box(_: Props): VNode {
    return container([
        box("title", [form("content", ["コンテンツ"])]),
        box("title", [form("content", ["コンテンツ"])]),
    ])
}
