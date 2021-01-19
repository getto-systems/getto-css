import { VNode } from "preact"
import { html } from "htm/preact"

export type VNodeContent = VNodeEntry | VNodeEntry[]
type VNodeEntry = string | VNode

export type SiteInfo = Readonly<{
    brand: string
    title: string
    subTitle: string
}>

export function siteInfo(): SiteInfo {
    return {
        brand: "GETTO",
        title: "CSS",
        subTitle: "simple admin theme",
    }
}

export function loginBoxHeader(): VNode {
    const { brand, title, subTitle } = siteInfo()
    return html`
        <header class="loginBox__header">
            <cite class="loginBox__header__brand">${brand}</cite>
            <strong class="loginBox__header__title">${title}</strong>
            <cite class="loginBox__header__subTitle">${subTitle}</cite>
        </header>
    `
}

export function loginBox(title: VNodeContent, content: VNodeContent, footer: VNodeContent): VNode {
    return html`<aside class="layout__login">
        <section class="loginBox">
            ${loginBoxHeader()}
            <article class="loginBox__main">
                <header class="loginBox__main__header">
                    <h1 class="loginBox__main__title">${title}</h1>
                </header>
                <main class="loginBox__main__body">${content}</main>
                <footer class="loginBox__main__footer">${footer}</footer>
            </article>
        </section>
    </aside>`
}

export function menuHeader(): VNode {
    const { brand, title, subTitle } = siteInfo()
    return html`<header class="menu__header">
        <cite class="menu__brand">${brand}</cite>
        <strong class="menu__title">${title}</strong>
        <cite class="menu__subTitle">${subTitle}</cite>
    </header>`
}

export function menuBox(content: VNodeContent): VNode {
    return html`<section class="menu__box">${content}</section>`
}

export function menuFooter(): VNode {
    return html`<footer class="menu__footer">
        <p class="menu__footer__message">
            powered by : LineIcons <span class="noWrap">/ みんなの文字</span>
        </p>
    </footer>`
}

export function mainFooter(): VNode {
    return html`<footer class="main__footer">
        <p class="main__footer__message">GETTO.systems</p>
    </footer>`
}

export function container(content: VNodeContent): VNode {
    return html`<section class="container">${content}</section>`
}

export function small(content: VNodeContent): VNode {
    return html`<small>${content}</small>`
}
export function big(content: VNodeContent): VNode {
    return html`<big>${content}</big>`
}

export function icon(iconClass: string): VNode {
    return html`<i class="${iconClass}"></i>`
}

type Size = "small" | "medium" | "large"

export function v_small(): VNode {
    return vertical("small")
}
export function v_medium(): VNode {
    return vertical("medium")
}
export function v_large(): VNode {
    return vertical("large")
}
function vertical(size: Size): VNode {
    return html`<div class="vertical vertical_${size}"></div>`
}

type Color = "gray" | "alert" | "success" | "warning" | "pending" | "info"

export function notice_gray(content: VNodeContent): VNode {
    return notice("gray", content)
}
export function notice_alert(content: VNodeContent): VNode {
    return notice("alert", content)
}
export function notice_success(content: VNodeContent): VNode {
    return notice("success", content)
}
export function notice_warning(content: VNodeContent): VNode {
    return notice("warning", content)
}
export function notice_pending(content: VNodeContent): VNode {
    return notice("pending", content)
}
export function notice_info(content: VNodeContent): VNode {
    return notice("info", content)
}
function notice(color: Color, content: VNodeContent): VNode {
    return html`<p class="notice notice_${color}">${content}</p>`
}

export function label_gray(content: VNodeContent): VNode {
    return label("gray", content)
}
export function label_alert(content: VNodeContent): VNode {
    return label("alert", content)
}
export function label_success(content: VNodeContent): VNode {
    return label("success", content)
}
export function label_warning(content: VNodeContent): VNode {
    return label("warning", content)
}
export function label_pending(content: VNodeContent): VNode {
    return label("pending", content)
}
export function label_info(content: VNodeContent): VNode {
    return label("info", content)
}
function label(color: Color, content: VNodeContent): VNode {
    return html`<span class="label label_${color}">${content}</span>`
}

export function badge_gray(content: VNodeContent): VNode {
    return badge("gray", content)
}
export function badge_alert(content: VNodeContent): VNode {
    return badge("alert", content)
}
export function badge_success(content: VNodeContent): VNode {
    return badge("success", content)
}
export function badge_warning(content: VNodeContent): VNode {
    return badge("warning", content)
}
export function badge_pending(content: VNodeContent): VNode {
    return badge("pending", content)
}
export function badge_info(content: VNodeContent): VNode {
    return badge("info", content)
}
function badge(color: Color, content: VNodeContent): VNode {
    return html`<span class="badge badge_${color}">${content}</span>`
}

export function buttons(left: VNodeContent, right: VNodeContent): VNode {
    return html`<aside class="button__container">
        <section class="button_left">${left}</section>
        <section class="button_right">${right}</section>
    </aside>`
}
