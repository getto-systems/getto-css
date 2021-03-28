import { h, VNode } from "preact"

import {
    appLayout,
    appMain,
    mainBody,
    mainHeader,
    mainTitle,
} from "../../../z_vendor/getto-css/preact/layout/app"

import { useApplicationView } from "../../../z_vendor/getto-application/action/x_preact/hooks"
import { useDocumentTitle } from "../../../x_preact/hooks"

import { copyright, siteInfo } from "../../site"

import { ApplicationErrorComponent } from "../../../avail/common/x_preact/application_error"
import { LoadMenuEntry } from "../../../outline/menu/action_load_menu/x_preact/load_menu"
import { LoadBreadcrumbListComponent } from "../../../outline/menu/action_load_breadcrumb_list/x_preact/load_breadcrumb_list"

import { DashboardView, DashboardResource } from "../resource"
import { useErrorBoundary } from "preact/hooks"
import { GlobalInfoComponent } from "../../action_base/x_preact/global_info"
import { HowToUseComponent } from "./how_to_use"

export function DashboardEntry(view: DashboardView): VNode {
    const resource = useApplicationView(view)

    const [err] = useErrorBoundary((err) => {
        // 認証がないのでエラーはどうしようもない
        console.log(err)
    })
    if (err) {
        return h(ApplicationErrorComponent, { err: `${err}` })
    }

    return h(DashboardComponent, resource)
}
export function DashboardComponent(resource: DashboardResource): VNode {
    useDocumentTitle("ホーム")

    return appLayout({
        siteInfo,
        header: [h(GlobalInfoComponent, resource)],
        main: appMain({
            header: mainHeader([mainTitle("ホーム"), h(LoadBreadcrumbListComponent, resource)]),
            body: mainBody(h(HowToUseComponent, resource)),
            copyright,
        }),
        menu: h(LoadMenuEntry, resource),
    })
}
