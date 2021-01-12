import { html } from "htm/preact"
import { VNode } from "preact"

export type FormFooterProps = Readonly<{
    saving: boolean
    modified: boolean
    invalid: boolean
    undoEnabled: boolean
    redoEnabled: boolean
    onSave: Post<null>
    onUndo: Post<null>
    onRedo: Post<null>
    onClose: Post<null>
}>
export function FormFooter({
    saving,
    modified,
    invalid,
    undoEnabled,
    redoEnabled,
    onSave,
    onUndo,
    onRedo,
    onClose,
}: FormFooterProps): VNode {
    if (saving) {
        return html`${savingButton()}`
    } else {
        return html`
            <section class="button__container">
                ${saveButton()}
                <div class="button_right">${redoButton()} ${undoButton()} ${closeButton()}</div>
            </section>
            ${invalidMessage()}
        `
    }

    function savingButton() {
        return html`<button class="button button_saving">
            <i class="lnir lnir-spinner lnir-is-spinning"></i> 保存中
        </button>`
    }
    function saveButton() {
        if (invalid) {
            return html`<button class="button button_save button_invalid">保存できません</button>`
        }
        if (modified) {
            return html`<button class="button button_save button_modified" onClick=${onSave}>
                保存
            </button>`
        } else {
            return html`<button class="button button_save" onClick=${onSave}>保存</button>`
        }
    }
    function redoButton() {
        if (!redoEnabled) {
            return html``
        }
        return html`<button class="button button_cancel" onClick=${onRedo}>やり直す</button>`
    }
    function undoButton() {
        if (!undoEnabled) {
            return html``
        }
        return html`<button class="button button_cancel" onClick=${onUndo}>元に戻す</button>`
    }
    function closeButton() {
        if (undoEnabled) {
            return html``
        }
        return html`<button class="button button_cancel" onClick=${onClose}>閉じる</button>`
    }

    function invalidMessage() {
        if (!invalid) {
            return html``
        }
        return html`
            <section class="form_error">
                <p class="form__message">保存できない項目があります</p>
            </section>
        `
    }
}

interface Post<T> {
    (event: T): void
}
