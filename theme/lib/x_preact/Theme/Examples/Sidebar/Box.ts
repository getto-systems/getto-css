import { VNode } from "preact"
import { container } from "../../../common/style"

import { box, box_double, form } from "../../../common/style"

type Props = {
    // no props
}
export function Box(_: Props): VNode {
    return container([
        box_double({
            type: "title",
            title: "title",
            body: [form({ title: "content", body: ["コンテンツ"], help: [] })],
        }),
        box({
            type: "title",
            title: "title",
            body: [form({ title: "content", body: ["コンテンツ"], help: [] })],
        }),
    ])
}
