import { VNode } from "preact"
import { html } from "htm/preact"

import { VNodeContent } from "../../common/layout"

export function box(title: VNodeContent, content: VNodeContent): VNode {
    return box_content("", title, content, emptyVNodeContent)
}
export function box_double(title: VNodeContent, content: VNodeContent): VNode {
    return box_content("box_double", title, content, emptyVNodeContent)
}
export function fullBox(title: VNodeContent, content: VNodeContent, footer: VNodeContent): VNode {
    return box_content("", title, content, specifyVNodeContent(footer))
}
export function fullBox_double(title: VNodeContent, content: VNodeContent, footer: VNodeContent): VNode {
    return box_content("box_double", title, content, specifyVNodeContent(footer))
}
export function fullBox_editing(
    title: VNodeContent,
    content: VNodeContent,
    footer: VNodeContent
): VNode {
    return box_content("box_editing", title, content, specifyVNodeContent(footer))
}
export function fullBox_double_editing(
    title: VNodeContent,
    content: VNodeContent,
    footer: VNodeContent
): VNode {
    return box_content("box_double box_editing", title, content, specifyVNodeContent(footer))
}

type OptionalVNodeContent =
    | Readonly<{ specified: true; content: VNodeContent }>
    | Readonly<{ specified: false }>
function specifyVNodeContent(content: VNodeContent): OptionalVNodeContent {
    return { specified: true, content }
}
const emptyVNodeContent: OptionalVNodeContent = { specified: false }

function box_content(
    boxClass: string,
    title: VNodeContent,
    content: VNodeContent,
    footer: OptionalVNodeContent
): VNode {
    return html`<section class="box ${boxClass}">
        <div>
            <header class="box__header">
                <h2 class="box__title">${title}</h2>
            </header>
            <section class="box__body">${content}</section>
        </div>
        ${footerContent()}
    </section>`

    function footerContent() {
        if (!footer.specified) {
            return html``
        }
        return html`<footer class="box__footer">${footer.content}</footer>`
    }
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
export function formContent(formClass: string, title: VNodeContent, content: VNodeContent): VNode {
    return html`
        <dl class="form ${formClass}">
            <dt class="form__header">${title}</dt>
            <dd class="form__field">${content}</dd>
        </dl>
    `
}

export function formWithHelp(title: VNodeContent, content: VNodeContent, help: VNodeContent[]): VNode {
    return form(title, html`${content} ${help.map(toFormHelp)}`)
}
export function formWithHelp_error(
    title: VNodeContent,
    content: VNodeContent,
    messages: VNodeContent[],
    help: VNodeContent[]
): VNode {
    return form_error(title, html`${content} ${messages.map(toFormMessage)} ${help.map(toFormHelp)}`)
}
export function formWithHelp_warning(
    title: VNodeContent,
    content: VNodeContent,
    messages: VNodeContent[],
    help: VNodeContent[]
): VNode {
    return form_warning(title, html`${content} ${messages.map(toFormMessage)} ${help.map(toFormHelp)}`)
}

function toFormMessage(message: VNodeContent) {
    return html`<p class="form__message">${message}</p>`
}
function toFormHelp(message: VNodeContent) {
    return html`<p class="form__help">${message}</p>`
}

export function modal(title: VNodeContent, content: VNodeContent): VNode {
    return html`
        <section class="modal__box">
            <header class="modal__header">
                <h3 class="modal__title">${title}</h3>
            </header>
            <section class="modal__body">${content}</section>
        </section>
    `
}
export function fullModal(title: VNodeContent, content: VNodeContent, footer: VNodeContent): VNode {
    return html`
        <section class="modal__box">
            <header class="modal__header">
                <h3 class="modal__title">${title}</h3>
            </header>
            <section class="modal__body">${content}</section>
            <big>
                <footer class="modal__footer">${footer}</footer>
            </big>
        </section>
    `
}
