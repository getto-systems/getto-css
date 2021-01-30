import { VNode } from "preact"

import { container, box } from "../../../../z_external/getto-css/preact/design/box"
import { form } from "../../../../z_external/getto-css/preact/design/form"

type Props = {
    // no props
}
export function Box(_: Props): VNode {
    return container([
        box({
            title: "title",
            body: [form({ title: "content", body: ["コンテンツ"], help: [] })],
        }),
        box({
            title: "title",
            body: [form({ title: "content", body: ["コンテンツ"], help: [] })],
        }),
    ])
}
