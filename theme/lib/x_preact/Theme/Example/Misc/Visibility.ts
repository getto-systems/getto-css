import { VNode } from "preact"
import { html } from "htm/preact"

import { box } from "../box"
import { label_gray } from "../../../common/layout"

type Props = {
    // no props
}
export function Visibility(_: Props): VNode {
    return box("visibility", [
        html`<p>${label_gray("コンテンツ")} ${label_gray("コンテンツ")} ${label_gray("コンテンツ")}</p>`,
        html`<p>
            ${label_gray("コンテンツ")} ${" "}
            ${label_gray(html`<span class="visibility_hidden">コンテンツ</span>`)} ${" "}
            ${label_gray("コンテンツ")}
        </p>`,
    ])
}
