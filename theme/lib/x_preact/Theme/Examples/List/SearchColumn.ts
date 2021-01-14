import { VNode } from "preact"
import { html } from "htm/preact"

import { form, simpleBox_grow } from "../box"

import { VNodeContent } from "../../../common/layout"

type Props = {
    // no props
}
export function SearchColumn(_: Props): VNode {
    return simpleBox_grow([
        form(
            "表示する列",
            columns([
                column("ID", true),
                column("名前", true),
                column("状態", true),
                column("メールアドレス", true),
                column("更新日時", true),
                column("メモ", true),
                column("正式名称", false),
                column("問い合わせ電話番号", false),
            ])
        ),
    ])

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
