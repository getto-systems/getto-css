import { VNode } from "preact"
import { html } from "htm/preact"

import { v_large, v_medium, v_small, box } from "../../../common/style"

type Props = {
    // no props
}
export function Vertical(_: Props): VNode {
    return box({
        type: "title",
        title: "vertical",
        body: [
            html`<p>small 間隔</p>`,
            v_small(),
            html`<p>medium 間隔</p>`,
            v_medium(),
            html`<p>large 間隔</p>`,
            v_large(),
            html`<p>テキスト</p>`,
        ],
    })
}
