import { VNode } from "preact"
import { html } from "htm/preact"

import { box_grow, checkbox, form, searchColumn } from "../../../common/style"

type Props = {
    // no props
}
export function SearchColumn(_: Props): VNode {
    return box_grow({
        type: "simple",
        body: [
            form({
                title: "表示する列",
                body: searchColumn([
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
