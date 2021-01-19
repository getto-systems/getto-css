import { h, VNode } from "preact"
import { useEffect, useErrorBoundary, useState } from "preact/hooks"
import { html } from "htm/preact"

import { useTerminate } from "../common/hooks"
import { buttons, loginBox } from "../common/layout"

import { ApplicationError } from "../common/System/ApplicationError"

import { NotFoundEntryPoint } from "../../auth/NotFound/NotFound/view"
import {
    CurrentVersionComponent,
    initialCurrentVersionState,
} from "../../auth/NotFound/currentVersion/component"

type Props = Readonly<{
    notFound: NotFoundEntryPoint
}>
export function NotFound({ notFound: { resource, terminate } }: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })

    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useTerminate(terminate)

    useEffect(() => {
        document.title = `Not Found | ${document.title}`
    }, [])

    return h(Content, resource)
}

type ContentProps = Readonly<{
    currentVersion: CurrentVersionComponent
}>
function Content({ currentVersion }: ContentProps): VNode {
    const [state, setState] = useState(initialCurrentVersionState)
    useEffect(() => {
        currentVersion.onStateChange(setState)
        currentVersion.load()
    }, [])

    return loginBox({
        title: "リンクが切れていました",
        content: [
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
        footer: buttons([], [html`<a href="${homeHref()}"><i class="lnir lnir-home"></i> ホームへ</a>`]),
    })

    function homeHref() {
        switch (state.type) {
            case "initial-current-version":
                return "#"

            case "succeed-to-find":
                return `/${state.currentVersion}/index.html`
        }
    }
}
