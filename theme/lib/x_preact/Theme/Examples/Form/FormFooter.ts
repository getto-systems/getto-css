import { html } from "htm/preact"
import { VNode } from "preact"

import { EditState, FormProps } from "./Container"

type Props = FormProps
export function FormFooter({ state, component }: Props): VNode {
    switch (state.type) {
        case "static":
            return html`
                <section class="button__container">
                    <button class="button button_edit" onClick=${component.edit}>編集</button>
                    <button class="button button_delete" onClick=${component.delete}>削除</button>
                </section>
            `

        case "try-to-save":
            return html`${savingButton()}`

        case "editing":
            return html`
                <section class="button__container">
                    ${saveButton(state.state)}
                    <div class="button_right">
                        ${redoButton(state.state)} ${undoButton(state.state)} ${closeButton(state.state)}
                    </div>
                </section>
                ${invalidMessage(state.state)}
            `
    }

    function savingButton() {
        return html`<button class="button button_saving">
            <i class="lnir lnir-spinner lnir-is-spinning"></i> 保存中
        </button>`
    }
    function saveButton(state: EditState) {
        if (state.invalid) {
            return html`<button class="button button_save button_invalid">保存できません</button>`
        }
        if (state.modified) {
            return html`<button class="button button_save button_modified" onClick=${component.save}>
                保存
            </button>`
        } else {
            return html`<button class="button button_save" onClick=${component.save}>保存</button>`
        }
    }
    function redoButton(state: EditState) {
        if (!state.redoEnabled) {
            return html``
        }
        return html`<button class="button button_cancel" onClick=${component.redo}>やり直す</button>`
    }
    function undoButton(state: EditState) {
        if (!state.undoEnabled) {
            return html``
        }
        return html`<button class="button button_cancel" onClick=${component.undo}>元に戻す</button>`
    }
    function closeButton(state: EditState) {
        if (state.undoEnabled) {
            return html``
        }
        return html`<button class="button button_cancel" onClick=${component.close}>閉じる</button>`
    }

    function invalidMessage(state: EditState) {
        if (!state.invalid) {
            return html``
        }
        return html`
            <section class="form_error">
                <p class="form__message">保存できない項目があります</p>
            </section>
        `
    }
}
