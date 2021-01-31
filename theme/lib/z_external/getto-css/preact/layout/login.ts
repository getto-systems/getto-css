import { VNode } from "preact"
import { html } from "htm/preact"

import { VNodeContent } from "../../../getto-example/preact/common"
import { SiteInfo } from "../../site"

export type LoginBoxContent = Readonly<{
    title: VNodeContent
    content: VNodeContent
    footer: VNodeContent
}>

export function loginBox(siteInfo: SiteInfo, { title, content, footer }: LoginBoxContent): VNode {
    return html`<aside class="layout__login">
        <section class="loginBox">
            ${header(siteInfo)}
            <article class="loginBox__main">
                <header class="loginBox__main__header">
                    <h1 class="loginBox__main__title">${title}</h1>
                </header>
                <main class="loginBox__main__body">${content}</main>
                <footer class="loginBox__main__footer">${footer}</footer>
            </article>
        </section>
    </aside>`

    function header({ brand, title, subTitle }: SiteInfo): VNode {
        return html`<header class="loginBox__header">
            <cite class="loginBox__header__brand">${brand}</cite>
            <strong class="loginBox__header__title">${title}</strong>
            <cite class="loginBox__header__subTitle">${subTitle}</cite>
        </header>`
    }
}
