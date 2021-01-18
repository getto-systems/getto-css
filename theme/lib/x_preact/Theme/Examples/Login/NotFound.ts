import { h, VNode } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"
import { html } from "htm/preact"

import { ApplicationError } from "../../../common/System/ApplicationError"

import { buttons, loginBox } from "../../../common/layout"

type Props = Readonly<{
    // no props
}>
export function NotFound(_: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })

    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useEffect(() => {
        document.title = `Not Found | ${document.title}`
    }, [])

    return loginBox(
        "リンクが切れていました",
        [
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
        buttons([], [html`<a href="#"><i class="lnir lnir-home"></i> ホームへ</a>`])
    )
}
