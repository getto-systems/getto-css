import { VNode } from "preact"
import { html } from "htm/preact"

import { VNodeContent } from "../../../../z_external/preact/common"

import { box_grow } from "../../../../z_external/getto-css/preact/design/box"
import { form, checkbox } from "../../../../z_external/getto-css/preact/design/form"

type Props = {
    // no props
}
export function SearchColumn(_: Props): VNode {
    return box_grow({
        type: "simple",
        body: [
            form({
                title: "表示する列",
                body: tableViewColumns([
                    column("ID", true),
                    column("名前", true),
                    column("状態", true),
                    column("メールアドレス", true),
                    column("更新日時", true),
                    column("メモ", true),
                    column("正式名称", false),
                    column("問い合わせ電話番号", false),
                ]),
                help: [],
            }),
        ],
    })

    function column(label: string, isChecked: boolean) {
        return checkbox({
            isChecked,
            input: html`<input type="checkbox" checked />${label}`,
            key: label,
        })
    }
}

// TODO data に定義したやつを使用する
function tableViewColumns(content: VNodeContent): VNode {
    return html`<section class="table__viewColumns">${content}</section>`
}
