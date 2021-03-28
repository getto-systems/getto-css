import { VNode } from "preact"
import { html } from "htm/preact"

import { loginBox } from "../../../../../z_vendor/getto-css/preact/layout/login"

import { siteInfo } from "../../../../../x_preact/common/site"

type Props = Readonly<{
    // no props
}>
export function LoadingComponent(_: Props): VNode {
    return loginBox(siteInfo(), {
        title: "アプリケーション読み込み中",
        body: [
            html`<p>
                <i class="lnir lnir-spinner lnir-is-spinning"></i> ${" "}
                アプリケーションの読み込みに時間がかかっています
            </p>`,
            html`<p>
                30秒以上かかるようであれば何かがおかしいので、<br />
                お手数ですが、管理者にお伝えください
            </p>`,
        ],
        footer: "",
    })
}
