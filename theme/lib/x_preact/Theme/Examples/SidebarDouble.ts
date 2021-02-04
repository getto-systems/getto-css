import { h, VNode } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"
import { html } from "htm/preact"

import {
    appLayout_sidebar_double,
    mainHeader,
    mainBody,
    sidebarBody,
    sidebarBody_grow,
    mainTitle,
    appMain,
    appSidebar,
} from "../../../z_vendor/getto-css/preact/layout/app"

import { useTerminate } from "../../common/hooks"
import { copyright, siteInfo } from "../../common/site"

import { ApplicationError } from "../../common/System/ApplicationError"
import { GlobalInfo } from "../../Outline/GlobalInfo"
import { MenuList } from "../../Outline/MenuList"
import { BreadcrumbList } from "../../Outline/BreadcrumbList"
import { Container } from "./SidebarDouble/Container"

import { ExampleEntryPoint } from "../../../theme/Example/entryPoint"
import { Table } from "./SidebarDouble/Sidebar/Table"
import { Pager } from "./SidebarDouble/Sidebar/Pager"

type Props = Readonly<{
    example: ExampleEntryPoint
}>
export function Form({ example: { resource, terminate } }: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })

    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useTerminate(terminate)

    useEffect(() => {
        document.title = `Sidebar (double size) | ${document.title}`
    }, [])

    return appLayout_sidebar_double({
        siteInfo: siteInfo(),
        header: [h(GlobalInfo, resource)],
        main: appMain({
            header: mainHeader([
                mainTitle(html`Sidebar <small><span class="noWrap">(double size)</span></small>`),
                h(BreadcrumbList, resource),
            ]),
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
