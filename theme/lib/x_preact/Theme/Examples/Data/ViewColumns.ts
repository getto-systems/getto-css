import { VNode } from "preact"
import { html } from "htm/preact"

import { TableDataView } from "../../../../z_external/getto-table/preact/core"

import { box_grow } from "../../../../z_external/getto-css/preact/design/box"
import { form, checkbox } from "../../../../z_external/getto-css/preact/design/form"
import { tableViewColumns } from "../../../../z_external/getto-css/preact/design/data"

type Props = Readonly<{
    view: TableDataView[]
}>
export function ViewColumns({view}: Props): VNode {
    return box_grow({
        body: [
            form({
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
