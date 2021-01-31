import { VNode } from "preact"
import { html } from "htm/preact"

import { VNodeContent } from "../../../getto-example/preact/common"

type FormContent =
    | Readonly<{ type: NormalFormType; content: NormalFormContent }>
    | Readonly<{ type: SearchFormType; content: NormalFormContent }>
    | Readonly<{ type: NoticeFormType; content: NoticeFormContent }>

export type NormalFormContent = Readonly<{
    title: VNodeContent
    body: VNodeContent
    help: VNodeContent[]
}>
export type NoticeFormContent = NormalFormContent &
    Readonly<{
        notice: VNodeContent[]
    }>

type FormType = NormalFormType | SearchFormType | NoticeFormType
type NormalFormType = "normal"
type SearchFormType = "search" | "search_double"
type NoticeFormType = "error" | "warning"
function mapFormType(formType: FormType): string {
    switch (formType) {
        case "normal":
            return ""

        case "search":
            return "search"

        case "search_double":
            return "search search_double"

        default:
            return `form_${formType}`
    }
}

export function form(content: NormalFormContent): VNode {
    return formContent({ type: "normal", content })
}
export function form_error(content: NoticeFormContent): VNode {
    return formContent({ type: "error", content })
}
export function form_warning(content: NoticeFormContent): VNode {
    return formContent({ type: "warning", content })
}
export function search(content: NormalFormContent): VNode {
    return formContent({ type: "search", content })
}
export function search_double(content: NormalFormContent): VNode {
    return formContent({ type: "search_double", content })
}

function formContent(form: FormContent): VNode {
    const help = {
        help: form.content.help,
        notice: notice(),
    }
    return html`<dl class="${mapFormType(form.type)}">
        <dt class="form__title">${form.content.title}</dt>
        <dd class="form__body">${form.content.body} ${formHelp(help)}</dd>
    </dl>`

    function notice(): VNodeContent[] {
        switch (form.type) {
            case "normal":
            case "search":
            case "search_double":
                return []

            case "error":
            case "warning":
                return form.content.notice
        }
    }
}

type FormSectionContent =
    | Readonly<{ type: NormalFormType; content: NormalFormSectionContent }>
    | Readonly<{ type: NoticeFormType; content: NoticeFormSectionContent }>

export type NormalFormSectionContent = Readonly<{
    body: VNodeContent
    help: VNodeContent[]
}>
export type NoticeFormSectionContent = NormalFormSectionContent &
    Readonly<{
        notice: VNodeContent[]
    }>

export function formSection(content: NormalFormSectionContent): VNode {
    return formSectionContent({ type: "normal", content })
}
export function formSection_error(content: NoticeFormSectionContent): VNode {
    return formSectionContent({ type: "error", content })
}
export function formSection_warning(content: NoticeFormSectionContent): VNode {
    return formSectionContent({ type: "warning", content })
}

function formSectionContent(form: FormSectionContent): VNode {
    const help = {
        help: form.content.help,
        notice: notice(),
    }
    return html`<section class="${mapFormType(form.type)}">
        ${form.content.body} ${formHelp(help)}
    </section>`

    function notice(): VNodeContent[] {
        switch (form.type) {
            case "normal":
                return []

            case "error":
            case "warning":
                return form.content.notice
        }
    }
}

export function formError(notice: VNodeContent[]): VNode {
    return html`<aside class="form__help form_error">${notice.map(toFormNotice)}</aside>`
}

type FormHelpContent = Readonly<{
    help: VNodeContent[]
    notice: VNodeContent[]
}>
function formHelp({ help, notice }: FormHelpContent) {
    return html`<aside class="form__help">${help.map(toFormHelp)}${notice.map(toFormNotice)}</aside>`
}
function toFormNotice(message: VNodeContent) {
    return html`<p class="form__notice">${message}</p>`
}
function toFormHelp(message: VNodeContent) {
    return html`<p>${message}</p>`
}

export type ButtonsContent = Readonly<{
    left: VNodeContent
    right: VNodeContent
}>
export function buttons({ left, right }: ButtonsContent): VNode {
    return html`<aside class="button__container">
        <section class="button_left">${left}</section>
        <section class="button_right">${right}</section>
    </aside>`
}

type ButtonContent =
    | Readonly<{ type: StatefulButtonType; content: StatefulButtonContent }>
    | Readonly<{ type: StatelessButtonType; content: StatelessButtonContent }>
    | Readonly<{ type: DisabledButtonType; content: DisabledButtonContent }>

export type StatefulButtonContent = ClickableButtonContent | ConnectButtonContent
type ClickableButtonContent = Readonly<{
    state: ClickableButtonState
    onClick: Post<Event>
    label: VNodeContent
}>
type ConnectButtonContent = Readonly<{
    state: ConnectButtonState
    label: VNodeContent
}>

export type StatelessButtonContent = Readonly<{
    state: NormalButtonState
    onClick: Post<Event>
    label: VNodeContent
}>
export type DisabledButtonContent = Readonly<{
    state: NormalButtonState
    label: VNodeContent
}>

type ButtonType = StatefulButtonType | StatelessButtonType | DisabledButtonType
type StatefulButtonType = "edit" | "search" | "send" | "delete" | "complete" | "warning" | "pending"
type StatelessButtonType = "cancel" | "close" | "undo" | "redo"
type DisabledButtonType = "disabled"

type ButtonState = ClickableButtonState | ConnectButtonState
type ClickableButtonState = NormalButtonState | "confirm"
type NormalButtonState = "normal"
type ConnectButtonState = "connect"

function mapButtonType(type: ButtonType): string {
    return `button_${type}`
}
function mapButtonState(state: ButtonState): string {
    switch (state) {
        case "normal":
            return ""

        default:
            return `button_${state}`
    }
}

export function button_edit(content: StatefulButtonContent): VNode {
    return buttonContent({ type: "edit", content })
}
export function button_search(content: StatefulButtonContent): VNode {
    return buttonContent({ type: "search", content })
}
export function button_send(content: StatefulButtonContent): VNode {
    return buttonContent({ type: "send", content })
}
export function button_delete(content: StatefulButtonContent): VNode {
    return buttonContent({ type: "delete", content })
}
export function button_complete(content: StatefulButtonContent): VNode {
    return buttonContent({ type: "complete", content })
}
export function button_warning(content: StatefulButtonContent): VNode {
    return buttonContent({ type: "warning", content })
}
export function button_pending(content: StatefulButtonContent): VNode {
    return buttonContent({ type: "pending", content })
}
export function button_cancel(content: StatelessButtonContent): VNode {
    return buttonContent({ type: "cancel", content })
}
export function button_close(content: StatelessButtonContent): VNode {
    return buttonContent({ type: "close", content })
}
export function button_undo(content: StatelessButtonContent): VNode {
    return buttonContent({ type: "undo", content })
}
export function button_redo(content: StatelessButtonContent): VNode {
    return buttonContent({ type: "redo", content })
}
export function button_disabled(content: DisabledButtonContent): VNode {
    return buttonContent({ type: "disabled", content })
}

function buttonContent(button: ButtonContent): VNode {
    const info = detect()
    if (info.clickable) {
        return html`<button class=${buttonClass()} onClick=${info.onClick}>
            ${button.content.label}
        </button>`
    } else {
        return html`<button class=${buttonClass()}>${button.content.label}</button>`
    }

    function buttonClass() {
        return `button ${mapButtonType(button.type)} ${mapButtonState(button.content.state)}`
    }

    type Info = Readonly<{ clickable: false }> | Readonly<{ clickable: true; onClick: Post<Event> }>
    function detect(): Info {
        if (button.type === "disabled") {
            return { clickable: false }
        }
        switch (button.content.state) {
            case "connect":
                return { clickable: false }

            default:
                return { clickable: true, onClick: button.content.onClick }
        }
    }
}

type LabelContent = Readonly<{ style: InputStyle; content: VNodeContent }>

type InputStyle = "small" | "normal" | "large" | "xLarge" | "fill"
function mapInputStyle(style: InputStyle): string {
    switch (style) {
        case "normal":
            return ""

        default:
            return `input_${style}`
    }
}

export function label_number_small(content: VNodeContent): VNode {
    return labelContent({ style: "small", content })
}
export function label_number(content: VNodeContent): VNode {
    return labelContent({ style: "normal", content })
}
export function label_number_fill(content: VNodeContent): VNode {
    return labelContent({ style: "fill", content })
}

export function label_email_small(content: VNodeContent): VNode {
    return labelContent({ style: "small", content })
}
export function label_email(content: VNodeContent): VNode {
    return labelContent({ style: "normal", content })
}
export function label_email_fill(content: VNodeContent): VNode {
    return labelContent({ style: "fill", content })
}

export function label_text_small(content: VNodeContent): VNode {
    return labelContent({ style: "small", content })
}
export function label_text(content: VNodeContent): VNode {
    return labelContent({ style: "normal", content })
}
export function label_text_large(content: VNodeContent): VNode {
    return labelContent({ style: "large", content })
}
export function label_text_xLarge(content: VNodeContent): VNode {
    return labelContent({ style: "xLarge", content })
}
export function label_text_fill(content: VNodeContent): VNode {
    return labelContent({ style: "fill", content })
}

export function label_password_small(content: VNodeContent): VNode {
    return labelContent({ style: "small", content })
}
export function label_password(content: VNodeContent): VNode {
    return labelContent({ style: "normal", content })
}
export function label_password_large(content: VNodeContent): VNode {
    return labelContent({ style: "large", content })
}
export function label_password_xLarge(content: VNodeContent): VNode {
    return labelContent({ style: "xLarge", content })
}
export function label_password_fill(content: VNodeContent): VNode {
    return labelContent({ style: "fill", content })
}

export function label_search_small(content: VNodeContent): VNode {
    return labelContent({ style: "small", content })
}
export function label_search(content: VNodeContent): VNode {
    return labelContent({ style: "normal", content })
}
export function label_search_large(content: VNodeContent): VNode {
    return labelContent({ style: "large", content })
}
export function label_search_xLarge(content: VNodeContent): VNode {
    return labelContent({ style: "xLarge", content })
}
export function label_search_fill(content: VNodeContent): VNode {
    return labelContent({ style: "fill", content })
}

export function label_textarea_small(content: VNodeContent): VNode {
    return labelContent({ style: "small", content })
}
export function label_textarea(content: VNodeContent): VNode {
    return labelContent({ style: "normal", content })
}
export function label_textarea_large(content: VNodeContent): VNode {
    return labelContent({ style: "large", content })
}
export function label_textarea_xLarge(content: VNodeContent): VNode {
    return labelContent({ style: "xLarge", content })
}
export function label_textarea_fill(content: VNodeContent): VNode {
    return labelContent({ style: "fill", content })
}

function labelContent({ style, content }: LabelContent): VNode {
    return html`<label class=${mapInputStyle(style)}>${content}</label>`
}

export type CheckableContent = Readonly<{ isChecked: boolean; input: VNodeContent; key: CheckableKey }>
type CheckableKey = string | number

type CheckableType = "checkbox" | "radio"
type CheckableStyle = "inline" | "block"
function mapCheckableStyle(type: CheckableType, style: CheckableStyle): string {
    switch (style) {
        case "inline":
            return `input__${type}`

        default:
            return `input__${type} input__${type}_${style}`
    }
}

export function checkbox(content: CheckableContent): VNode {
    return checkableContent("checkbox", "inline", content)
}
export function checkbox_block(content: CheckableContent): VNode {
    return checkableContent("checkbox", "block", content)
}
export function radio(content: CheckableContent): VNode {
    return checkableContent("radio", "inline", content)
}
export function radio_block(content: CheckableContent): VNode {
    return checkableContent("radio", "block", content)
}
function checkableContent(
    type: CheckableType,
    style: CheckableStyle,
    { isChecked, input, key }: CheckableContent
): VNode {
    const checkClass = isChecked ? "input_checked" : ""
    return html`<label class="${mapCheckableStyle(type, style)} ${checkClass}" key=${key}
        >${input}</label
    >`
}

export function pager(content: VNodeContent): VNode {
    return html`<label class="pager">${content}</label>`
}

interface Post<T> {
    (event: T): void
}
