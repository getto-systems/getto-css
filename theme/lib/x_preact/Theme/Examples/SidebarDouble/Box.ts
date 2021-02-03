import { VNode } from "preact"

import { container, box } from "../../../../z_vendor/getto-css/preact/design/box"
import { field } from "../../../../z_vendor/getto-css/preact/design/form"

type Props = {
    // no props
}
export function Box(_: Props): VNode {
    return container([
        box({
            title: "title",
            body: [field({ title: "content", body: ["コンテンツ"], help: [] })],
        }),
        box({
            title: "title",
            body: [field({ title: "content", body: ["コンテンツ"], help: [] })],
        }),
    ])
}
