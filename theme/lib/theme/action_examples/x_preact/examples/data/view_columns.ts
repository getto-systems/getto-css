import { VNode } from "preact"
import { html } from "htm/preact"

import { TableDataView } from "../../../../../z_vendor/getto-table/preact/core"

import { box_grow } from "../../../../../z_vendor/getto-css/preact/design/box"
import { field, checkbox } from "../../../../../z_vendor/getto-css/preact/design/form"
import { tableViewColumns } from "../../../../../z_vendor/getto-css/preact/design/data"

type Props = Readonly<{
    view: TableDataView[]
}>
export function DataViewColumnsComponent({view}: Props): VNode {
    return box_grow({
        body: [
            field({
                title: "表示する列",
                body: tableViewColumns(
                    view.map(({ isVisible, content, key }) =>
                        checkbox({
                            isChecked: isVisible,
                            input: html`<input type="checkbox" checked=${isVisible} />${content}`,
                            key,
                        })
                    )
                ),
                help: [],
            }),
        ],
    })
}
