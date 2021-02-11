import { h, VNode } from "preact"
import { useErrorBoundary } from "preact/hooks"
import { html } from "htm/preact"

import { loginBox } from "../../../../z_vendor/getto-css/preact/layout/login"

import { siteInfo } from "../../../z_common/site"

import { ApplicationError } from "../../../z_common/System/ApplicationError"
import { useDocumentTitle } from "../../../z_common/hooks"

type Props = Readonly<{
    // no props
}>
export function Loading(_: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })
    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useDocumentTitle("Loading")

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
