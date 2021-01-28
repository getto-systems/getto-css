import { VNode } from "preact"
import { html } from "htm/preact"

import { pagerCount, pagerParams } from "../../../../common/data"

import { box_fill } from "../../../../../z_external/getto-css/preact/design/box"
import { pagerOptions } from "../../../../../z_external/getto-css/preact/design/data"
import { button_search, form, pager } from "../../../../../z_external/getto-css/preact/design/form"

type PagerProps = {
    // no props
}
export function Pager(_: PagerProps): VNode {
    const all = 5532
    const offset = 0
    return box_fill({
        type: "simple",
        body: [form({ title: pagerCount(all), body: [select(), button()], help: [] })],
    })

    function select() {
        return pager(html`<select value=${offset}>
            ${options()}
        </select>`)

        function options() {
            return pagerOptions(pagerParams(all))
        }
    }
    function button() {
        return button_search({ state: "normal", label: "移動", onClick: () => null })
    }
}
