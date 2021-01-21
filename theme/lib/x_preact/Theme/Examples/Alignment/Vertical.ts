import { VNode } from "preact"
import { html } from "htm/preact"

import { box } from "../../../../z_external/css/getto/preact/design/box"
import { v_large, v_medium, v_small } from "../../../../z_external/css/getto/preact/design/alignment"

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
