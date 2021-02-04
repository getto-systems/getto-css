import { h, VNode } from "preact"
import { useErrorBoundary } from "preact/hooks"

import { appLayout } from "../../z_vendor/getto-css/preact/layout/app"

import { useTerminate } from "../common/hooks"
import { siteInfo } from "../common/site"

import { ApplicationError } from "../common/System/ApplicationError"
import { MenuList } from "../Outline/MenuList"
import { Content } from "./Content"

import { DocumentEntryPoint } from "../../document/Document/Document/entryPoint"

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
        siteInfo: siteInfo(),
        header: [],
        main: h(Content, resource),
        menu: h(MenuList, resource),
    })
}
