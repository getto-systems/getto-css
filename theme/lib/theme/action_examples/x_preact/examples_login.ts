import { h, VNode } from "preact"
import { useErrorBoundary } from "preact/hooks"

import { useDocumentTitle } from "../../../x_preact/common/hooks"

import { ApplicationErrorComponent } from "../../../avail/common/x_preact/application_error"
import { ExamplesContent } from "./examples"

interface Entry {
    (props: EmptyProps): VNode
}
type EmptyProps = {
    // no props
}

export function ExamplesLoginEntry(content: ExamplesContent): Entry {
    return () => {
        const [err] = useErrorBoundary((err) => {
            // 認証がないのでエラーはどうしようもない
            console.log(err)
        })
        if (err) {
            return h(ApplicationErrorComponent, { err: `${err}` })
        }

        return h(ExamplesLoginComponent, { content })
    }
}

type Props = Readonly<{ content: ExamplesContent }>
export function ExamplesLoginComponent(resource: Props): VNode {
    useDocumentTitle(resource.content.title)
    return h(resource.content.component, {})
}
