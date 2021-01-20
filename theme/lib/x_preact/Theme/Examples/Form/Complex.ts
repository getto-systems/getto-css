import { h, VNode } from "preact"
import { html } from "htm/preact"

import { iconClass, lnir } from "../../../../z_external/icon"

import {
    form,
    box,
    modal,
    form_error,
    form_warning,
    big,
    buttons,
    icon,
    label_gray,
} from "../../../common/style"

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
        return box({
            type: "full",
            title: "complex",
            body: [
                form({ title: "名前", body: "GETTO CSS", help: [] }),
                form({
                    title: "state",
                    body: [big(label_gray("仮"))],
                    help: [],
                }),
                form({
                    title: "transition",
                    body: [
                        big(html`<button class="button button_complete" onClick=${onCompleteClick}>
                            ${i("checkmark")} 完了にする
                        </button>`),
                    ],
                    help: [],
                }),
            ],
            footer: buttons({
                left: [html`<button class="button button_edit" onClick=${component.edit}>編集</button>`],
                right: [
                    html`<button class="button button_delete" onClick=${onDeleteClick}>削除</button>`,
                ],
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
                type: "full",
                title: "complex",
                body: [
                    form_error({
                        title: "名前",
                        body: html`<input type="text" value="GETTO CSS" onInput=${onInput} />`,
                        help: ["プロジェクトの識別に使用します"],
                        notice: ["名前は必須です"],
                    }),
                    form_warning({
                        title: "メールアドレス",
                        body: html`<input type="email" value="admin@example.com" onInput=${onInput} />`,
                        help: ["重要なメッセージの通知先として使用します"],
                        notice: ["メールアドレスが初期値のままです"],
                    }),
                ],
                footer: h(FormFooter, props),
            })
        } else {
            return box({
                type: "full",
                title: "complex",
                body: [
                    form({
                        title: "名前",
                        body: html`<input type="text" value="GETTO CSS" onInput=${onInputAsInvalid} />`,
                        help: ["プロジェクトの識別に使用します"],
                    }),
                    form({
                        title: "メールアドレス",
                        body: html`<input
                            type="email"
                            value="admin@example.com"
                            onInput=${onInputAsInvalid}
                        />`,
                        help: ["重要なメッセージの通知先として使用します"],
                    }),
                ],
                footer: h(FormFooter, props),
            })
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
        return modal({
            title: "完了処理中",
            body: "作業を完了しています",
            footer: [
                html`<button type="button" class="button button_complete button_connect">
                    <i class="lnir lnir-spinner lnir-is-spinning"></i> 完了中
                </button>`,
            ],
        })
    } else {
        return modal({
            title: "完了確認",
            body: html`作業を完了します
                <br />
                よろしいですか？`,
            footer: buttons({
                left: html`<button
                    type="button"
                    class="button button_complete button_confirm"
                    onClick="${onCompleteClick}"
                >
                    完了
                </button>`,
                right: html`<button type="button" class="button button_cancel" onClick="${onCloseClick}">
                    キャンセル
                </button>`,
            }),
        })
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
        return modal({
            title: "削除処理中",
            body: "削除しています",
            footer: [
                html`<button type="button" class="button button_delete button_connect">
                    <i class="lnir lnir-spinner lnir-is-spinning"></i> 削除中
                </button>`,
            ],
        })
    } else {
        return modal({
            title: "削除確認",
            body: html`削除します
                <br />
                削除すると復元することはできません
                <br />
                よろしいですか？`,
            footer: buttons({
                left: html`<button
                    type="button"
                    class="button button_delete button_confirm"
                    onClick="${onDeleteClick}"
                >
                    削除
                </button>`,
                right: html`<button type="button" class="button button_cancel" onClick="${onCloseClick}">
                    キャンセル
                </button>`,
            }),
        })
    }
}

function i(iconName: string) {
    return icon(iconClass(lnir(iconName)))
}
