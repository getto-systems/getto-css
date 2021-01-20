import { VNode } from "preact"
import { html } from "htm/preact"

import { label_gray, box } from "../../../common/style"

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
