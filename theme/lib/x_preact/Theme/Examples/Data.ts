import { h, VNode } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"

import {
    appLayout,
    appMain,
    mainHeader,
    mainTitle,
    mainBody,
} from "../../../z_vendor/getto-css/preact/layout/app"

import { useTerminate } from "../../common/hooks"

import { ApplicationError } from "../../common/System/ApplicationError"
import { MainMenu } from "../../Outline/Menu/MainMenu"
import { BreadcrumbList } from "../../Outline/BreadcrumbList"
import { Container } from "./Data/Container"

import { ExampleEntryPoint } from "../../../theme/Example/view"

type Props = Readonly<{
    example: ExampleEntryPoint
}>
export function Data({ example: { resource, terminate } }: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })

    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useTerminate(terminate)

    useEffect(() => {
        document.title = `Data | ${document.title}`
    }, [])

    return appLayout({
        main: appMain({
            header: mainHeader([mainTitle("Data"), h(BreadcrumbList, resource)]),
            body: mainBody(h(Container, NO_PROPS)),
        }),
        menu: MainMenu(resource),
    })
}

const NO_PROPS = {}
