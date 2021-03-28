import { h, VNode } from "preact"
import { useErrorBoundary } from "preact/hooks"

import { useDocumentTitle } from "../../../x_preact/common/hooks"

import { ApplicationErrorComponent } from "../../../avail/common/x_preact/application_error"
import { ExamplesContent } from "./examples"

export function ExamplesLoginEntry(props: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証がないのでエラーはどうしようもない
        console.log(err)
    })
    if (err) {
        return h(ApplicationErrorComponent, { err: `${err}` })
    }

    return h(ExamplesLoginComponent, props)
}

type Props = Readonly<{ content: ExamplesContent }>
export function ExamplesLoginComponent(resource: Props): VNode {
    useDocumentTitle(resource.content.title)
    return h(resource.content.component, {})
}
