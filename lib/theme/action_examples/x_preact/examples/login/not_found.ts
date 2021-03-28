import { VNode } from "preact"
import { html } from "htm/preact"

import { loginBox } from "../../../../../z_vendor/getto-css/preact/layout/login"
import { buttons } from "../../../../../z_vendor/getto-css/preact/design/form"

import { siteInfo } from "../../../../site"

type Props = Readonly<{
    // no props
}>
export function NotFoundComponent(_: Props): VNode {
    return loginBox(siteInfo, {
        title: "リンクが切れていました",
        body: [
            html`<p>
                リンクされたページが見つかりませんでした<br />
                これはシステム側の不備です
            </p>`,
            html`<p>
                お手数ですが、管理者にクリックしたリンクをお伝えください<br />
                直前まで行っていた作業も教えていただけると助かります
            </p>`,
            html`<p>作業は右下のリンクからホームに戻って続けられます</p>`,
        ],
        footer: buttons({
            right: [html`<a href="#"><i class="lnir lnir-home"></i> ホームへ</a>`],
        }),
    })
}
