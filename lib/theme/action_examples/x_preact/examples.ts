import { h, VNode } from "preact"
import { useErrorBoundary } from "preact/hooks"

import { useApplicationView } from "../../../z_vendor/getto-application/action/x_preact/hooks"
import { useDocumentTitle } from "../../../x_preact/hooks"

import {
    appLayout,
    appMain,
    mainBody,
    mainHeader,
    mainTitle,
} from "../../../z_vendor/getto-css/preact/layout/app"

import { copyright, siteInfo } from "../../site"

import { ApplicationErrorComponent } from "../../../avail/common/x_preact/application_error"
import { LoadMenuEntry } from "../../../outline/menu/action_load_menu/x_preact/load_menu"
import { LoadBreadcrumbListComponent } from "../../../outline/menu/action_load_breadcrumb_list/x_preact/load_breadcrumb_list"
import { GlobalInfoComponent } from "../../action_base/x_preact/global_info"

import { ExamplesView, ExamplesResource } from "../resource"

export type ExamplesContent = Readonly<{
    title: string
    component: Component
}>
interface Component {
    (props: EmptyProps): VNode
}
type EmptyProps = {
    // no props
}

type EntryProps = Readonly<{
    view: ExamplesView
    content: ExamplesContent
}>
export function ExamplesEntry(props: EntryProps): VNode {
    const resource = useApplicationView(props.view)

    const [err] = useErrorBoundary((err) => {
        // 認証がないのでエラーはどうしようもない
        console.log(err)
    })
    if (err) {
        return h(ApplicationErrorComponent, { err: `${err}` })
    }

    return h(ExamplesComponent, { ...resource, content: props.content })
}

type Props = ExamplesResource & Readonly<{ content: ExamplesContent }>
export function ExamplesComponent(resource: Props): VNode {
    useDocumentTitle(resource.content.title)

    return appLayout({
        siteInfo,
        header: [h(GlobalInfoComponent, resource)],
        main: appMain({
            header: mainHeader([
                mainTitle(resource.content.title),
                h(LoadBreadcrumbListComponent, resource),
            ]),
            body: mainBody(h(resource.content.component, {})),
            copyright,
        }),
        menu: h(LoadMenuEntry, resource),
    })
}
