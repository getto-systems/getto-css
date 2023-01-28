import { VNode } from "preact"
import { html } from "htm/preact"

import { pagerCount, pagerParams } from "../../../../../../x_preact/design/table"

import { box_grow, container } from "../../../../../../z_vendor/getto-css/preact/design/box"
import { pagerOptions } from "../../../../../../z_vendor/getto-css/preact/design/table"
import {
    button_search,
    field,
    pager,
} from "../../../../../../z_vendor/getto-css/preact/design/form"

type PagerProps = {
    // no props
}
export function SidebarDoublePagerComponent(_: PagerProps): VNode {
    const all = 5532
    const offset = 0
    return container(
        box_grow({
            body: [field({ title: pagerCount(all), body: [select(), button()], help: [] })],
        }),
    )

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
