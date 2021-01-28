import { h, VNode } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"

import {
    mainHeader,
    sidebarBody_grow,
    sidebarBody,
    mainBody,
    appLayout_sidebar,
    mainTitle,
    appMain,
    appSidebar,
} from "../../../z_external/getto-css/preact/layout/app"

import { useTerminate } from "../../common/hooks"

import { ApplicationError } from "../../common/System/ApplicationError"
import { MainMenu } from "../../Outline/Menu/MainMenu"
import { BreadcrumbList } from "../../Outline/BreadcrumbList"
import { Container } from "./Sidebar/Container"

import { ExampleEntryPoint } from "../../../theme/Example/view"
import { Table } from "./Sidebar/Sidebar/Table"
import { Pager } from "./Sidebar/Sidebar/Pager"

type Props = Readonly<{
    example: ExampleEntryPoint
}>
export function Sidebar({ example: { resource, terminate } }: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })

    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useTerminate(terminate)

    useEffect(() => {
        document.title = `Sidebar | ${document.title}`
    }, [])

    return appLayout_sidebar({
        main: appMain({
            header: mainHeader([mainTitle("Sidebar"), h(BreadcrumbList, resource)]),
            body: mainBody(h(Container, NO_PROPS)),
        }),
        sidebar: appSidebar({
            header: mainHeader(mainTitle("List")),
            body: [sidebarBody(h(Pager, NO_PROPS)), sidebarBody_grow(h(Table, NO_PROPS))],
        }),
        menu: MainMenu(resource),
    })
}

const NO_PROPS = {}
