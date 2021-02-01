import { html } from "htm/preact"
import { VNode } from "preact"

import {
    formError,
    buttons,
    button_close,
    button_delete,
    button_disabled,
    button_edit,
    button_redo,
    button_undo,
} from "../../../../z_external/getto-css/preact/design/form"

import { spinner } from "../../../common/icon"

import { EditState, FormProps } from "./Container"

type Props = FormProps
export function FormFooter({ state, component }: Props): VNode {
    function onEditClick() {
        component.edit(null)
    }
    function onDeleteClick() {
        component.delete(null)
    }
    switch (state.type) {
        case "static":
            return buttons({
                left: button_edit({ state: "normal", label: "編集", onClick: onEditClick }),
                right: button_delete({ state: "normal", label: "削除", onClick: onDeleteClick }),
            })

        case "try-to-save":
            return buttons({ left: savingButton() })

        case "editing":
            return html`${buttons({ left: saveButton(state.state) })}${buttons({
                left: closeButton(state.state),
                right: [redoButton(state.state), undoButton(state.state)],
            })}
            ${invalidMessage(state.state)}`
    }

    function savingButton() {
        return button_edit({ state: "connect", label: html`${spinner} 保存中` })
    }
    function saveButton(state: EditState) {
        const label = "保存"

        function onClick() {
            component.save(null)
        }

        if (state.invalid) {
            return button_disabled({ state: "normal", label })
        }

        const buttonState = state.modified ? "confirm" : "normal"
        return button_edit({ state: buttonState, label, onClick })
    }
    function closeButton(state: EditState) {
        const label = "閉じる"

        function onClick() {
            component.close(null)
        }

        if (state.undoEnabled) {
            return button_disabled({ state: "normal", label })
        } else {
            return button_close({ state: "normal", label, onClick })
        }
    }
    function redoButton(state: EditState) {
        const label = "元に戻す"

        function onClick() {
            component.redo(null)
        }

        if (state.redoEnabled) {
            return button_redo({ state: "normal", label, onClick })
        } else {
            return button_disabled({ state: "normal", label })
        }
    }
    function undoButton(state: EditState) {
        const label = "取り消す"

        function onClick() {
            component.undo(null)
        }

        if (state.undoEnabled) {
            return button_undo({ state: "normal", label, onClick })
        } else {
            return button_disabled({ state: "normal", label })
        }
    }

    function invalidMessage(state: EditState) {
        if (!state.invalid) {
            return ""
        }
        return formError(["保存できない項目があります"])
    }
}
