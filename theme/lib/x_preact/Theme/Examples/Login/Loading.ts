import { h, VNode } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"
import { html } from "htm/preact"

import { big, fullScreenError, v_medium } from "../../../common/layout"

import { ApplicationError } from "../../../common/System/ApplicationError"

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

    useEffect(() => {
        document.title = `Loading | ${document.title}`
    }, [])

    return fullScreenError(
        "アプリケーションの読み込みに時間がかかっています",
        [
            big(html`<div class="loading loading_box">
                <i class="lnir lnir-spinner lnir-is-spinning"></i>
                <p class="loading__message">読み込み中です</p>
            </div>`),
            v_medium(),
            html`<p>
                30秒以上かかるようであれば何かがおかしいので、<br />
                お手数ですが管理者に連絡してください
            </p>`,
        ],
        ""
    )
}
