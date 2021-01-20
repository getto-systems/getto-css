import { VNode } from "preact"
import { html } from "htm/preact"

import { box_grow, form, VNodeContent } from "../../../common/style"

type Props = {
    // no props
}
export function SearchColumn(_: Props): VNode {
    return box_grow({
        type: "simple",
        body: [
            form({
                title: "表示する列",
                body: columns([
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

    function columns(content: VNodeContent) {
        return html`<section class="search__column">${content}</section>`
    }
    function column(label: VNodeContent, checked: boolean) {
        if (checked) {
            return html`<label class="search__column__item input__checkbox input_checked"
                ><input type="checkbox" checked />${label}</label
            >`
        } else {
            return html`<label class="search__column__item input__checkbox"
                ><input type="checkbox" />${label}</label
            >`
        }
    }
}
