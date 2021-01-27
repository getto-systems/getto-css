import { VNode } from "preact"
import { html } from "htm/preact"

import { box } from "../../../../z_external/getto-css/preact/design/box"
import { label_gray } from "../../../../z_external/getto-css/preact/design/highlight"

type Props = {
    // no props
}
export function Visibility(_: Props): VNode {
    return box({
        type: "title",
        title: "visibility",
        body: [
            html`<p>
                ${label_gray("コンテンツ")} ${label_gray("コンテンツ")} ${label_gray("コンテンツ")}
            </p>`,
            html`<p>
                ${label_gray("コンテンツ")} ${" "}
                ${label_gray(html`<span class="visibility_hidden">コンテンツ</span>`)} ${" "}
                ${label_gray("コンテンツ")}
            </p>`,
        ],
    })
}
