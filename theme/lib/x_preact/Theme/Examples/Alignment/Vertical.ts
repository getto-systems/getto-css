import { VNode } from "preact"
import { html } from "htm/preact"

import { box } from "../box"
import { v_large, v_medium, v_small } from "../../../common/layout"

type Props = {
    // no props
}
export function Vertical(_: Props): VNode {
    return box("vertical", [
        html`<p>small 間隔</p>`,
        v_small(),
        html`<p>medium 間隔</p>`,
        v_medium(),
        html`<p>large 間隔</p>`,
        v_large(),
        html`<p>テキスト</p>`,
    ])
}
