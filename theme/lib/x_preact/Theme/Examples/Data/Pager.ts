import { VNode } from "preact"
import { html } from "htm/preact"

import { form, box } from "../../../common/style"

type Props = {
    // no props
}
export function Pager(_: Props): VNode {
    return box({
        type: "simple",
        body: [form({ title: "全 5532 件中", body: [select(), button()], help: [] })],
    })

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
        return html`<button class="button button_search">移動</button>`
    }
}
