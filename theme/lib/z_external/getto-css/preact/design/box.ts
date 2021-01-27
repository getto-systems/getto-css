import { VNode } from "preact"
import { html } from "htm/preact"

import { VNodeContent } from "../../../preact/common"

export function container(content: VNodeContent): VNode {
    return html`<section class="container">${content}</section>`
}

export type BoxContent =
    | Readonly<{ type: "simple"; body: VNodeContent }>
    | Readonly<{ type: "title"; title: VNodeContent; body: VNodeContent }>
    | Readonly<{ type: "footer"; body: VNodeContent; footer: VNodeContent }>
    | Readonly<{ type: "full"; title: VNodeContent; body: VNodeContent; footer: VNodeContent }>

type BoxClass = "single" | "double" | "grow" | "fill"
function mapBoxClass(boxClass: BoxClass): string {
    switch (boxClass) {
        case "single":
            return ""

        default:
            return `box_${boxClass}`
    }
}

export function box(content: BoxContent): VNode {
    return boxContent("single", content)
}
export function box_double(content: BoxContent): VNode {
    return boxContent("double", content)
}
export function box_grow(content: BoxContent): VNode {
    return boxContent("grow", content)
}
export function box_fill(content: BoxContent): VNode {
    return boxContent("fill", content)
}

function boxContent(boxClass: BoxClass, content: BoxContent): VNode {
    return html`<article class="box ${mapBoxClass(boxClass)}">
        <main>${header()} ${boxBody(content)}</main>
        ${footer()}
    </article>`

    function header(): VNodeContent {
        switch (content.type) {
            case "simple":
            case "footer":
                return ""

            case "title":
            case "full":
                return boxHeader(content)
        }
    }
    function footer() {
        switch (content.type) {
            case "simple":
            case "title":
                return ""

            case "footer":
            case "full":
                return boxFooter(content)
        }
    }
}

function boxHeader({ title }: { title: VNodeContent }) {
    return html`<header class="box__header">
        <h2>${title}</h2>
    </header>`
}
function boxBody({ body }: { body: VNodeContent }) {
    return html`<section class="box__body">${body}</section>`
}
function boxFooter({ footer }: { footer: VNodeContent }) {
    return html`<footer class="box__footer">${footer}</footer>`
}

export type ModalContent = Readonly<{
    title: VNodeContent
    body: VNodeContent
    footer: VNodeContent
}>

export function modalBox({ title, body, footer }: ModalContent): VNode {
    return html`<aside class="modal">
        <section class="modal__box">
            ${modalHeader(title)} ${modalBody(body)} ${modalFooter(footer)}
        </section>
    </aside>`
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
    return html`<footer class="modal__footer">${footer}</footer>`
}
