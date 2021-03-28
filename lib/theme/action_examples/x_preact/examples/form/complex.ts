import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box, modalBox } from "../../../../../z_vendor/getto-css/preact/design/box"
import {
    field,
    field_error,
    field_warning,
    buttons,
    button_complete,
    button_edit,
    button_delete,
    button_cancel,
} from "../../../../../z_vendor/getto-css/preact/design/form"
import { label_gray } from "../../../../../z_vendor/getto-css/preact/design/highlight"
import { big } from "../../../../../z_vendor/getto-css/preact/design/alignment"

import { CompleteAction, DeleteAction, EditState, FormProps } from "./container"
import { FormFooterComponent } from "./form_footer"
import { ModalComponent, ModalContentProps, ModalProps } from "./modal"
import { icon, spinner } from "../../../../../x_preact/design/icon"

type Props = FormProps &
    Readonly<{
        modal: Readonly<{
            complete: ModalProps<CompleteAction>
            delete: ModalProps<DeleteAction>
        }>
    }>
export function ComplexComponent(props: Props): VNode {
    const { state, action: component, modal } = props

    switch (state.type) {
        case "static":
            return html`
                ${staticBox()} ${h(ModalComponent(CompleteModal), modal.complete)}
                ${h(ModalComponent(DeleteModal), modal.delete)}
            `

        case "editing":
        case "try-to-save":
            return editingBox(state.state)
    }

    function staticBox() {
        function onCompleteClick() {
            modal.complete.component.open(null)
        }
        function onEditClick() {
            component.edit(null)
        }
        function onDeleteClick() {
            modal.delete.component.open(null)
        }
        return box({
            title: "complex",
            body: [
                field({ title: "名前", body: "GETTO CSS", help: [] }),
                field({
                    title: "state",
                    body: [big(label_gray("仮"))],
                    help: [],
                }),
                field({
                    title: "transition",
                    body: [
                        big(
                            button_complete({
                                state: "normal",
                                label: html`${icon("checkmark")} 完了にする`,
                                onClick: onCompleteClick,
                            }),
                        ),
                    ],
                    help: [],
                }),
            ],
            footer: buttons({
                left: button_edit({ state: "normal", label: "編集", onClick: onEditClick }),
                right: button_delete({ state: "normal", label: "削除", onClick: onDeleteClick }),
            }),
        })
    }
    function editingBox(state: EditState) {
        function onInput() {
            component.inputValidValue(null)
        }
        function onInputAsInvalid() {
            component.inputInvalidValue(null)
        }

        if (state.invalid) {
            return box({
                title: "complex",
                body: [
                    field_error({
                        title: "名前",
                        body: html`<input type="text" value="GETTO CSS" onInput=${onInput} />`,
                        help: ["プロジェクトの識別に使用します"],
                        notice: ["名前は必須です"],
                    }),
                    field_warning({
                        title: "メールアドレス",
                        body: html`<input
                            type="email"
                            value="admin@example.com"
                            onInput=${onInput}
                        />`,
                        help: ["重要なメッセージの通知先として使用します"],
                        notice: ["メールアドレスが初期値のままです"],
                    }),
                ],
                footer: h(FormFooterComponent, props),
            })
        } else {
            return box({
                title: "complex",
                body: [
                    field({
                        title: "名前",
                        body: html`<input
                            type="text"
                            value="GETTO CSS"
                            onInput=${onInputAsInvalid}
                        />`,
                        help: ["プロジェクトの識別に使用します"],
                    }),
                    field({
                        title: "メールアドレス",
                        body: html`<input
                            type="email"
                            value="admin@example.com"
                            onInput=${onInputAsInvalid}
                        />`,
                        help: ["重要なメッセージの通知先として使用します"],
                    }),
                ],
                footer: h(FormFooterComponent, props),
            })
        }
    }
}

function CompleteModal({ state, component }: ModalContentProps<CompleteAction>): VNode {
    function onCompleteClick() {
        component.complete(null)
    }
    function onCloseClick() {
        component.close(null)
    }

    if (state.connecting) {
        return modalBox({
            title: "完了処理中",
            body: "作業を完了しています",
            footer: button_complete({ state: "connect", label: html`${spinner} 完了中` }),
        })
    } else {
        return modalBox({
            title: "完了確認",
            body: html`作業を完了します
                <br />
                よろしいですか？`,
            footer: buttons({
                left: button_complete({
                    state: "confirm",
                    label: "完了",
                    onClick: onCompleteClick,
                }),
                right: button_cancel({ label: "キャンセル", onClick: onCloseClick }),
            }),
        })
    }
}
function DeleteModal({ state, component }: ModalContentProps<DeleteAction>): VNode {
    function onDeleteClick() {
        component.delete(null)
    }
    function onCloseClick() {
        component.close(null)
    }

    if (state.connecting) {
        return modalBox({
            title: "削除処理中",
            body: "削除しています",
            footer: button_delete({ state: "connect", label: html`${spinner} 削除中` }),
        })
    } else {
        return modalBox({
            title: "削除確認",
            body: html`削除します
                <br />
                削除すると復元することはできません
                <br />
                よろしいですか？`,
            footer: buttons({
                left: button_delete({ state: "confirm", label: "削除", onClick: onDeleteClick }),
                right: button_cancel({ label: "キャンセル", onClick: onCloseClick }),
            }),
        })
    }
}
