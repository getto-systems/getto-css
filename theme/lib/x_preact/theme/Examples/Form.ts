import { h, VNode } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"

import {
    appLayout,
    mainHeader,
    mainBody,
    mainTitle,
    appMain,
} from "../../../z_vendor/getto-css/preact/layout/app"

import { useTerminate } from "../../z_common/hooks"
import { copyright, siteInfo } from "../../z_common/site"

import { ApplicationError } from "../../z_common/System/ApplicationError"
import { GlobalInfo } from "../../z_common/Outline/GlobalInfo"
import { MenuList } from "../../z_common/Outline/MenuList"
import { BreadcrumbList } from "../../z_common/Outline/BreadcrumbList"
import { Container } from "./Form/Container"

import { ExampleEntryPoint } from "../../../theme/x_components/Example/EntryPoint/entryPoint"

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
        document.title = `Form | ${document.title}`
    }, [])

    return appLayout({
        siteInfo: siteInfo(),
        header: [h(GlobalInfo, resource)],
        main: appMain({
            header: mainHeader([mainTitle("Form"), h(BreadcrumbList, resource)]),
            body: mainBody(h(Container, NO_PROPS)),
            copyright: copyright(),
        }),
        menu: h(MenuList, resource),
    })
}

const NO_PROPS = {}