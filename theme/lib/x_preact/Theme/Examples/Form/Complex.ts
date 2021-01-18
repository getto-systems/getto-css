import { h, VNode } from "preact"
import { html } from "htm/preact"

import { iconClass, lnir } from "../../../../z_external/icon"

import { buttons, icon, label_gray } from "../../../common/layout"
import { form, formWithHelp, formWithHelp_error, formWithHelp_warning, fullBox, fullModal } from "../box"

import { CompleteComponent, DeleteComponent, EditState, FormProps } from "./Container"
import { FormFooter } from "./FormFooter"
import { Modal, ModalContentProps, ModalProps } from "./Modal"

type Props = FormProps &
    Readonly<{
        modal: Readonly<{
            complete: ModalProps<CompleteComponent>
            delete: ModalProps<DeleteComponent>
        }>
    }>
export function Complex(props: Props): VNode {
    const { state, component, modal } = props

    switch (state.type) {
        case "static":
            return html`
                ${staticBox()} ${h(Modal(CompleteModal), modal.complete)}
                ${h(Modal(DeleteModal), modal.delete)}
            `

        case "editing":
        case "try-to-save":
            return editingBox(state.state)
    }

    function staticBox() {
        function onCompleteClick() {
            modal.complete.component.open(null)
        }
        function onDeleteClick() {
            modal.delete.component.open(null)
        }
        return fullBox(
            "complex",
            [
                form("名前", "GETTO CSS"),
                form("state", [html`<big>${label_gray("仮")}</big>`]),
                form("transition", [
                    html`
                        <big>
                            <button class="button button_complete" onClick=${onCompleteClick}>
                                ${i("checkmark")} 完了にする
                            </button>
                        </big>
                    `,
                ]),
            ],
            buttons(
                [html`<button class="button button_edit" onClick=${component.edit}>編集</button>`],
                [html`<button class="button button_delete" onClick=${onDeleteClick}>削除</button>`]
            )
        )
    }
    function editingBox(state: EditState) {
        function onInput() {
            component.inputValidValue(null)
        }
        function onInputAsInvalid() {
            component.inputInvalidValue(null)
        }

        if (state.invalid) {
            return fullBox(
                "complex",
                [
                    formWithHelp_error(
                        "名前",
                        html`<input type="text" value="GETTO CSS" onInput=${onInput} />`,
                        ["プロジェクトの識別に使用します"],
                        ["名前は必須です"]
                    ),
                    formWithHelp_warning(
                        "メールアドレス",
                        html`<input type="email" value="admin@example.com" onInput=${onInput} />`,
                        ["重要なメッセージの通知先として使用します"],
                        ["メールアドレスが初期値のままです"]
                    ),
                ],
                h(FormFooter, props)
            )
        } else {
            return fullBox(
                "complex",
                [
                    formWithHelp(
                        "名前",
                        html`<input type="text" value="GETTO CSS" onInput=${onInputAsInvalid} />`,
                        ["プロジェクトの識別に使用します"]
                    ),
                    formWithHelp(
                        "メールアドレス",
                        html`<input
                            type="email"
                            value="admin@example.com"
                            onInput=${onInputAsInvalid}
                        />`,
                        ["重要なメッセージの通知先として使用します"]
                    ),
                ],
                h(FormFooter, props)
            )
        }
    }
}

function CompleteModal({ state, component }: ModalContentProps<CompleteComponent>): VNode {
    function onCompleteClick() {
        component.complete(null)
    }
    function onCloseClick() {
        component.close(null)
    }

    if (state.connecting) {
        return fullModal("完了処理中", "作業を完了しています", [
            html`<button type="button" class="button button_complete button_connect">
                <i class="lnir lnir-spinner lnir-is-spinning"></i> 完了中
            </button>`,
        ])
    } else {
        return fullModal(
            "完了確認",
            html`作業を完了します
                <br />
                よろしいですか？`,
            [
                html`<div class="button__container">
                    <button
                        type="button"
                        class="button button_complete button_confirm"
                        onClick="${onCompleteClick}"
                    >
                        完了
                    </button>
                    <button type="button" class="button button_cancel" onClick="${onCloseClick}">
                        キャンセル
                    </button>
                </div>`,
            ]
        )
    }
}
function DeleteModal({ state, component }: ModalContentProps<DeleteComponent>): VNode {
    function onDeleteClick() {
        component.delete(null)
    }
    function onCloseClick() {
        component.close(null)
    }

    if (state.connecting) {
        return fullModal("削除処理中", "削除しています", [
            html`<button type="button" class="button button_delete button_connect">
                <i class="lnir lnir-spinner lnir-is-spinning"></i> 削除中
            </button>`,
        ])
    } else {
        return fullModal(
            "削除確認",
            html`削除します
                <br />
                削除すると復元することはできません
                <br />
                よろしいですか？`,
            [
                html`<div class="button__container">
                    <button
                        type="button"
                        class="button button_delete button_confirm"
                        onClick="${onDeleteClick}"
                    >
                        削除
                    </button>
                    <button type="button" class="button button_cancel" onClick="${onCloseClick}">
                        キャンセル
                    </button>
                </div>`,
            ]
        )
    }
}

function i(iconName: string) {
    return icon(iconClass(lnir(iconName)))
}
