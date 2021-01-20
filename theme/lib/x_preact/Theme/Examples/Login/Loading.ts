import { h, VNode } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"
import { html } from "htm/preact"

import { loginBox } from "../../../common/style"

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

    return loginBox({
        title: "アプリケーション読み込み中",
        content: [
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
