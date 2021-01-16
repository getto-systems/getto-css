import { h, VNode } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"

import { ApplicationError } from "../../../common/System/ApplicationError"

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

    useEffect(() => {
        document.title = `Error | ${document.title}`
    }, [])

    return h(ApplicationError, { err: "アプリケーションエラー" })
}
