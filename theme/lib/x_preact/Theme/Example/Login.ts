import { h, VNode } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"

import { ApplicationError } from "../../common/System/ApplicationError"
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

    useEffect(() => {
        document.title = `Login | ${document.title}`
    }, [])

    return h(Container, NO_PROPS)
}

const NO_PROPS = {}
