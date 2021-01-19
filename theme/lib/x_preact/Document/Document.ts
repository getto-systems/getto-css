import { h, VNode } from "preact"
import { useErrorBoundary } from "preact/hooks"
import { html } from "htm/preact"

import { useTerminate } from "../common/hooks"
import { mainFooter, menuHeader, menuFooter } from "../common/layout"

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

    return html`<main class="layout__app">
        <section class="layout__app__container">
            <article class="layout__app__main">${h(Content, resource)} ${mainFooter()}</article>
        </section>
        <aside class="layout__app__menu">
            <section class="menu">${menuHeader()} ${h(MenuList, resource)} ${menuFooter()}</section>
        </aside>
    </main>`
}
