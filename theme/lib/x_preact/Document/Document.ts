import { h, VNode } from "preact"
import { useErrorBoundary } from "preact/hooks"

import { useTerminate } from "../common/hooks"
import { menuHeader, menuFooter, appLayout, appMenu } from "../common/layout"

import { ApplicationError } from "../common/System/ApplicationError"
import { MenuList } from "../Outline/MenuList"
import { Content } from "./Content"

import { DocumentEntryPoint } from "../../document/Document/Document/view"

type Props = {
    document: DocumentEntryPoint
}
export function Document({ document: { resource, terminate } }: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })

    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useTerminate(terminate)

    return appLayout({
        main: h(Content, resource),
        menu: appMenu([menuHeader(), h(MenuList, resource), menuFooter()]),
    })
}
