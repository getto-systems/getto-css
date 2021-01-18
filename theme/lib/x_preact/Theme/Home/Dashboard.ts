import { h, VNode } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"
import { html } from "htm/preact"

import { useTerminate } from "../../common/hooks"
import { footer, menuHeader, menuFooter } from "../../common/layout"

import { ApplicationError } from "../../common/System/ApplicationError"
import { MenuList } from "../../Outline/MenuList"
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

    const title = html`ホーム`

    return html`
        <main class="layout__app">
            <article class="layout__app__main">
                <header class="main__header">
                    <h1 class="main__title">${title}</h1>
                    ${h(BreadcrumbList, resource)}
                </header>
                <section class="main__body container">${h(HowToUse, resource)}</section>
                ${footer()}
            </article>
            <aside class="layout__app__menu menu">
                ${menuHeader()} ${h(MenuList, resource)} ${menuFooter()}
            </aside>
        </main>
    `
}
