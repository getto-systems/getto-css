import { h, VNode } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"

import {
    appLayout,
    appMain,
    mainHeader,
    mainTitle,
    mainBody,
} from "../../../z_external/css/getto/preact/layout/app"

import { useTerminate } from "../../common/hooks"

import { ApplicationError } from "../../common/System/ApplicationError"
import { MainMenu } from "../../Outline/Menu/MainMenu"
import { BreadcrumbList } from "../../Outline/BreadcrumbList"
import { HowToUse } from "./HowToUse"

import { DashboardEntryPoint } from "../../../theme/Home/Dashboard/view"

type Props = Readonly<{
    dashboard: DashboardEntryPoint
}>
export function Dashboard({ dashboard: { resource, terminate } }: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })

    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useTerminate(terminate)

    useEffect(() => {
        document.title = `ホーム | ${document.title}`
    }, [])

    return appLayout({
        main: appMain({
            header: mainHeader([mainTitle("ホーム"), h(BreadcrumbList, resource)]),
            body: mainBody(h(HowToUse, resource)),
        }),
        menu: MainMenu(resource),
    })
}
