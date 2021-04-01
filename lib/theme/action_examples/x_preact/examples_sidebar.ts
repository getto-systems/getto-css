import { h, VNode } from "preact"
import { useErrorBoundary } from "preact/hooks"

import { useApplicationView } from "../../../z_vendor/getto-application/action/x_preact/hooks"
import { useDocumentTitle } from "../../../x_preact/hooks"

import {
    appLayout,
    appMain,
    appSidebar,
    mainBody,
    mainHeader,
    mainTitle,
    sidebarBody,
    sidebarBody_grow,
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
    sidebar: Readonly<{
        title: string
        body: SidebarBody[]
    }>
}>
interface Component {
    (props: EmptyProps): VNode
}
type SidebarBody = Readonly<{
    isGrow: boolean
    component: Component
}>
type EmptyProps = {
    // no props
}

type EntryProps = Readonly<{
    view: ExamplesView
    content: ExamplesContent
}>
export function ExamplesSidebarEntry(props: EntryProps): VNode {
    const resource = useApplicationView(props.view)

    const [err] = useErrorBoundary((err) => {
        // 認証がないのでエラーはどうしようもない
        console.log(err)
    })
    if (err) {
        return h(ApplicationErrorComponent, { err: `${err}` })
    }

    return h(ExamplesSidebarComponent, { ...resource, content: props.content })
}

type Props = ExamplesResource & Readonly<{ content: ExamplesContent }>
export function ExamplesSidebarComponent(resource: Props): VNode {
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
        sidebar: appSidebar({
            header: mainHeader(mainTitle(resource.content.sidebar.title)),
            body: resource.content.sidebar.body.map((body) => {
                if (body.isGrow) {
                    return sidebarBody_grow(h(body.component, {}))
                } else {
                    return sidebarBody(h(body.component, {}))
                }
            }),
            copyright,
        }),
        menu: h(LoadMenuEntry, resource),
    })
}
