import { VNode } from "preact"
import { html } from "htm/preact"

import { form, simpleBox } from "../box"

type Props = {
    // no props
}
export function Pager(_: Props): VNode {
    return simpleBox([form("全 5532 件中", [select(), button()])])

    function select() {
        return html`<select class="pager__select">
            <option>1 ～ 1000 件</option>
            <option>1001 ～ 2000 件</option>
            <option>2001 ～ 3000 件</option>
            <option>3001 ～ 4000 件</option>
            <option>4001 ～ 5000 件</option>
            <option>5001 ～ 5532 件</option>
        </select>`
    }
    function button() {
        return html`<button class="button button_edit">移動</button>`
    }
}
