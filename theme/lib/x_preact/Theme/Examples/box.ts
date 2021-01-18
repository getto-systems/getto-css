import { VNode } from "preact"
import { html } from "htm/preact"

import { VNodeContent } from "../../common/layout"

export function simpleBox(content: VNodeContent): VNode {
    return simpleBoxContent("", content)
}
export function simpleBox_grow(content: VNodeContent): VNode {
    return simpleBoxContent("box_grow", content)
}
export function simpleBox_fill(content: VNodeContent): VNode {
    return simpleBoxContent("box_fill", content)
}
function simpleBoxContent(boxClass: string, content: VNodeContent): VNode {
    return html`<article class="box ${boxClass}">${boxBody(content)}</article>`
}

export function box(title: VNodeContent, content: VNodeContent): VNode {
    return boxContent("", title, content)
}
export function box_double(title: VNodeContent, content: VNodeContent): VNode {
    return boxContent("", title, content)
}
function boxContent(boxClass: string, title: VNodeContent, content: VNodeContent): VNode {
    return html`<article class="box ${boxClass}">
        <main>${boxHeader(title)} ${boxBody(content)}</main>
    </article>`
}

export function fullBox(title: VNodeContent, content: VNodeContent, footer: VNodeContent): VNode {
    return fullBoxContent("", title, content, footer)
}
export function fullBox_double(title: VNodeContent, content: VNodeContent, footer: VNodeContent): VNode {
    return fullBoxContent("box_double", title, content, footer)
}
function fullBoxContent(
    boxClass: string,
    title: VNodeContent,
    content: VNodeContent,
    footer: VNodeContent
): VNode {
    return html`<article class="box ${boxClass}">
        <main>${boxHeader(title)} ${boxBody(content)}</main>
        ${boxFooter(footer)}
    </article>`
}

export function noTitleBox(content: VNodeContent, footer: VNodeContent): VNode {
    return noTitleBoxContent("", content, footer)
}
export function noTitleBox_fill(content: VNodeContent, footer: VNodeContent): VNode {
    return noTitleBoxContent("box_fill", content, footer)
}
export function noTitleBoxContent(boxClass: string, content: VNodeContent, footer: VNodeContent): VNode {
    return html`<article class="box ${boxClass}">${boxBody(content)} ${footer}</article>`
}

function boxHeader(title: VNodeContent) {
    return html`<header class="box__header">
        <h2>${title}</h2>
    </header>`
}
function boxBody(content: VNodeContent) {
    return html`<section class="box__body">${content}</section>`
}
function boxFooter(footer: VNodeContent) {
    return html`<footer class="box__footer">${footer}</footer>`
}

export function form(title: VNodeContent, content: VNodeContent): VNode {
    return formContent("", title, content)
}
export function form_error(title: VNodeContent, content: VNodeContent): VNode {
    return formContent("form_error", title, content)
}
export function form_warning(title: VNodeContent, content: VNodeContent): VNode {
    return formContent("form_warning", title, content)
}
export function search(title: VNodeContent, content: VNodeContent): VNode {
    return formContent("search", title, content)
}
export function search_double(title: VNodeContent, content: VNodeContent): VNode {
    return formContent("search search_double", title, content)
}
export function formContent(formClass: string, title: VNodeContent, content: VNodeContent): VNode {
    return html`<dl class="form ${formClass}">
        <dt class="form__header">${title}</dt>
        <dd class="form__field">${content}</dd>
    </dl>`
}

export function formWithHelp(title: VNodeContent, content: VNodeContent, help: VNodeContent[]): VNode {
    return form(title, html`${content} ${formHelp(help.map(toFormHelp))}`)
}
export function formWithHelp_error(
    title: VNodeContent,
    content: VNodeContent,
    help: VNodeContent[],
    notices: VNodeContent[]
): VNode {
    return form_error(
        title,
        html`${content} ${formHelp([...help.map(toFormHelp), ...notices.map(toFormNotice)])}`
    )
}
export function formWithHelp_warning(
    title: VNodeContent,
    content: VNodeContent,
    help: VNodeContent[],
    notices: VNodeContent[]
): VNode {
    return form_warning(
        title,
        html`${content} ${formHelp([...help.map(toFormHelp), ...notices.map(toFormNotice)])}`
    )
}
export function searchWithHelp(title: VNodeContent, content: VNodeContent, help: VNodeContent[]): VNode {
    return search(title, html`${content} ${formHelp(help.map(toFormHelp))}`)
}

function formHelp(content: VNodeContent) {
    return html`<aside class="form__help">${content}</aside>`
}
function toFormNotice(message: VNodeContent) {
    return html`<p class="form__notice">${message}</p>`
}
function toFormHelp(message: VNodeContent) {
    return html`<p>${message}</p>`
}

export function modal(title: VNodeContent, content: VNodeContent): VNode {
    return html`<section class="modal__box">${modalHeader(title)} ${modalBody(content)}</section>`
}
export function fullModal(title: VNodeContent, content: VNodeContent, footer: VNodeContent): VNode {
    return html`<section class="modal__box">
        ${modalHeader(title)} ${modalBody(content)} ${modalFooter(footer)}
    </section>`
}

function modalHeader(title: VNodeContent) {
    return html`<header class="modal__header">
        <h3 class="modal__title">${title}</h3>
    </header>`
}
function modalBody(content: VNodeContent) {
    return html`<section class="modal__body">${content}</section>`
}
function modalFooter(footer: VNodeContent) {
    return html`<big>
        <footer class="modal__footer">${footer}</footer>
    </big>`
}
