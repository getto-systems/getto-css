import { VNode } from "preact"
import { html } from "htm/preact"

import { fullScreenError, v_medium } from "../layout"

type Props = Readonly<{
    err: string
}>

export function ApplicationError({ err }: Props): VNode {
    return fullScreenError(
        html`システムエラーが発生しました`,
        [
            html`<p>エラーが発生したため、処理を中断しました</p>`,
            html`<p>詳細: ${err}</p>`,
            v_medium(),
            html`<p>お手数ですが、管理者にご連絡お願いします</p>`,
        ],
        html`<section class="button__container">
            <div></div>
            <div class="loginBox__link">${reloadLink()}</div>
        </section>`
    )

    function reloadLink() {
        // search param をリセットしてやり直してみる
        return html`<a href="?"><i class="lnir lnir-reload"></i> 再読み込み</a>`
    }
}
