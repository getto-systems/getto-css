import { html } from "htm/preact"
import { VNode } from "preact"
import { buttons } from "../box"

import { EditState, FormProps } from "./Container"

type Props = FormProps
export function FormFooter({ state, component }: Props): VNode {
    switch (state.type) {
        case "static":
            return buttons(
                [html`<button class="button button_edit" onClick=${component.edit}>編集</button>`],
                [html`<button class="button button_delete" onClick=${component.delete}>削除</button>`]
            )

        case "try-to-save":
            return buttons([savingButton()], [])

        case "editing":
            return html`${buttons([saveButton(state.state)], [])}${buttons(
                [closeButton(state.state)],
                [redoButton(state.state), undoButton(state.state)]
            )}
            ${invalidMessage(state.state)}`
    }

    function savingButton() {
        return html`<button class="button button_edit button_connect">
            <i class="lnir lnir-spinner lnir-is-spinning"></i> 保存中
        </button>`
    }
    function saveButton(state: EditState) {
        if (state.invalid) {
            return html`<button class="button button_disabled">保存</button>`
        }
        if (state.modified) {
            return html`<button class="button button_edit button_confirm" onClick=${component.save}>
                保存
            </button>`
        } else {
            return html`<button class="button button_edit button_peek" onClick=${component.save}>
                保存
            </button>`
        }
    }
    function closeButton(state: EditState) {
        if (state.undoEnabled) {
            return html`<button class="button button_disabled">閉じる</button>`
        } else {
            return html`<button class="button button_cancel" onClick=${component.close}>閉じる</button>`
        }
    }
    function redoButton(state: EditState) {
        if (state.redoEnabled) {
            return html`<button class="button button_redo" onClick=${component.redo}>元に戻す</button>`
        } else {
            return html`<button class="button button_disabled">元に戻す</button>`
        }
    }
    function undoButton(state: EditState) {
        if (state.undoEnabled) {
            return html`<button class="button button_undo" onClick=${component.undo}>取り消す</button>`
        } else {
            return html`<button class="button button_disabled">取り消す</button>`
        }
    }

    function invalidMessage(state: EditState) {
        if (!state.invalid) {
            return html``
        }
        return html`<section class="form_error">
            <p class="form__help form__notice">保存できない項目があります</p>
        </section>`
    }
}
