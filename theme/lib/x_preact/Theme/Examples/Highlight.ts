import { h, VNode } from "preact"
import { useEffect, useErrorBoundary } from "preact/hooks"
import { html } from "htm/preact"

import { useTerminate } from "../../common/hooks"
import { mainFooter, menuHeader, menuFooter } from "../../common/layout"

import { ApplicationError } from "../../common/System/ApplicationError"
import { MenuList } from "../../Outline/MenuList"
import { BreadcrumbList } from "../../Outline/BreadcrumbList"
import { Container } from "./Highlight/Container"

import { ExampleEntryPoint } from "../../../theme/Example/view"

type Props = Readonly<{
    example: ExampleEntryPoint
}>
export function Highlight({ example: { resource, terminate } }: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // 認証していないのでエラーはどうしようもない
        console.log(err)
    })

    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useTerminate(terminate)

    useEffect(() => {
        document.title = `Highlight | ${document.title}`
    }, [])

    const title = html`Highlight`

    return html`<main class="layout__app">
        <article class="layout__app__main">
            <header class="main__header">
                <h1 class="main__title">${title}</h1>
                ${h(BreadcrumbList, resource)}
            </header>
            <section class="main__body">${h(Container, NO_PROPS)}</section>
            ${mainFooter()}
        </article>
        <aside class="layout__app__menu">
            <section class="menu">${menuHeader()} ${h(MenuList, resource)} ${menuFooter()}</section>
        </aside>
    </main>`
}

const NO_PROPS = {}
