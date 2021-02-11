import { h, VNode } from "preact"
import { useErrorBoundary } from "preact/hooks"
import { useDocumentTitle } from "../../../z_common/hooks"

import { ApplicationError } from "../../../z_common/System/ApplicationError"
import { Container } from "./Login/Container"

type Props = Readonly<{
    // no props
}>
export function Login(_: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })
    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useDocumentTitle("Login")

    return h(Container, NO_PROPS)
}

const NO_PROPS = {}
