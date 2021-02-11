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
} from "../../../z_vendor/getto-css/preact/layout/app"

import { useTermination } from "../../z_common/hooks"
import { copyright, siteInfo } from "../../z_common/site"

import { ApplicationError } from "../../z_common/System/ApplicationError"
import { GlobalInfo } from "../../z_common/Outline/GlobalInfo"
import { MenuList } from "../../z_common/Outline/MenuList"
import { BreadcrumbList } from "../../z_common/Outline/BreadcrumbList"
import { Container } from "./Sidebar/Container"

import { ExampleEntryPoint } from "../../../theme/x_components/Example/EntryPoint/entryPoint"
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

    useTermination(terminate)

    useEffect(() => {
        document.title = `Sidebar | ${document.title}`
    }, [])

    return appLayout_sidebar({
        siteInfo: siteInfo(),
        header: [h(GlobalInfo, resource)],
        main: appMain({
            header: mainHeader([mainTitle("Sidebar"), h(BreadcrumbList, resource)]),
            body: mainBody(h(Container, NO_PROPS)),
            copyright: copyright(),
        }),
        sidebar: appSidebar({
            header: mainHeader(mainTitle("List")),
            body: [sidebarBody(h(Pager, NO_PROPS)), sidebarBody_grow(h(Table, NO_PROPS))],
            copyright: copyright(),
        }),
        menu: h(MenuList, resource),
    })
}

const NO_PROPS = {}
