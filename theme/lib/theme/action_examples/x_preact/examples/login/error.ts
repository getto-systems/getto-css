import { h, VNode } from "preact"

import { ApplicationErrorComponent } from "../../../../../avail/common/x_preact/application_error"

type Props = Readonly<{
    // no props
}>
export function LoginErrorComponent(_: Props): VNode {
    return h(ApplicationErrorComponent, { err: "アプリケーションエラー" })
}
