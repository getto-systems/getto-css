import { VNode } from "preact"

import { container, box, box_double } from "../../../../z_external/css/getto/preact/design/box"
import { form } from "../../../../z_external/css/getto/preact/design/form"

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
