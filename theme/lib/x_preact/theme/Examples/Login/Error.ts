import { h, VNode } from "preact"
import { useErrorBoundary } from "preact/hooks"

import { useDocumentTitle } from "../../../z_common/hooks"

import { ApplicationError } from "../../../z_common/System/ApplicationError"

type Props = Readonly<{
    // no props
}>
export function Error(_: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })
    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useDocumentTitle("Error")

    return h(ApplicationError, { err: "アプリケーションエラー" })
}
