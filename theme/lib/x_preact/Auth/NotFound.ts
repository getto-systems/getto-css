import { h, VNode } from "preact"
import { useEffect, useErrorBoundary, useState } from "preact/hooks"
import { html } from "htm/preact"

import { useTerminate } from "../common/hooks"
import { fullScreenError } from "../common/layout"

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

    return fullScreenError(
        "見つかりませんでした",
        [
            html`<p>リンクされたページは存在しません</p>`,
            html`<p>お手数ですが、管理者にクリックしたリンクをお伝えください</p>`,
        ],
        html`<section class="button__container">
            <div></div>
            <div class="loginBox__link">
                <a href="${homeHref()}"><i class="lnir lnir-home"></i> ホームへ</a>
            </div>
        </section>`
    )

    function homeHref() {
        switch (state.type) {
            case "initial-current-version":
                return "#"

            case "succeed-to-find":
                return `/${state.currentVersion}/index.html`
        }
    }
}
