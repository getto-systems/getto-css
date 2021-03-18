import { VNode } from "preact"

import { container, box, box_double } from "../../../../../z_vendor/getto-css/preact/design/box"
import { field } from "../../../../../z_vendor/getto-css/preact/design/form"

type Props = {
    // no props
}
export function SidebarBoxComponent(_: Props): VNode {
    return container([
        box_double({
            title: "title",
            body: [field({ title: "content", body: ["コンテンツ"], help: [] })],
        }),
        box({
            title: "title",
            body: [field({ title: "content", body: ["コンテンツ"], help: [] })],
        }),
    ])
}
