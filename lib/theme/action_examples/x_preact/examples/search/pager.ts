import { VNode } from "preact"
import { html } from "htm/preact"

import { pagerCount, pagerParams } from "../../../../../x_preact/common/design/table"

import { box } from "../../../../../z_vendor/getto-css/preact/design/box"
import { field, button_search, pager } from "../../../../../z_vendor/getto-css/preact/design/form"
import { pagerOptions } from "../../../../../z_vendor/getto-css/preact/design/data"

type Props = {
    // no props
}
export function SearchPagerComponent(_: Props): VNode {
    const all = 5532
    const offset = 0
    return box({
        body: [field({ title: pagerCount(all), body: [select(), button()], help: [] })],
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
