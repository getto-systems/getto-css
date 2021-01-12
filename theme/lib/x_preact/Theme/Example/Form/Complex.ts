import { h, VNode } from "preact"
import { html } from "htm/preact"

import { iconClass, lnir } from "../../../../z_external/icon"

import { icon, label_gray } from "../../../common/layout"
import {
    form,
    formWithHelp,
    formWithHelp_error,
    formWithHelp_warning,
    fullBox,
    fullBox_editing,
    fullModal,
    modal,
} from "../box"

import { FormFooter, FormFooterProps } from "./FormFooter"
import { Modal, ModalContentProps, ModalProps } from "./Modal"

type Props = FormFooterProps &
    Readonly<{
        onInput: Post<null>
        onInputAsInvalid: Post<null>
        onEdit: Post<null>
        editing: boolean
        complete: ModalProps
        delete: ModalProps
        generate: ModalProps
    }>
export function Complex(props: Props): VNode {
    const { editing, invalid, onInput, onInputAsInvalid, onEdit } = props

    const completeProps = { ...props.complete, content: CompleteModal }
    const deleteProps = { ...props.delete, content: DeleteModal }
    const generateProps = { ...props.generate, content: GenerateModal }

    if (editing) {
        return editingBox()
    } else {
        return html`
            ${staticBox()} ${h(Modal, completeProps)} ${h(Modal, deleteProps)} ${h(Modal, generateProps)}
        `
    }

    function staticBox() {
        return fullBox(
            "complex",
            [
                form("名前", "GETTO CSS"),
                form("state", [html`<big>${label_gray("仮")}</big>`]),
                form("transition", [
                    html`
                        <big>
                            <button class="button button_complete" onClick=${props.complete.onOpen}>
                                ${i("checkmark")} 完了にする
                            </button>
                        </big>
                    `,
                ]),
                form("report", [
                    html`
                        <big>
                            <button class="button button_generate" onClick=${props.generate.onOpen}>
                                ${i("file")} レポートを作成
                            </button>
                        </big>
                    `,
                ]),
            ],
            html`
                <section class="button__container">
                    <button class="button button_edit" onClick=${onEdit}>編集</button>
                    <button class="button button_delete button_right" onClick=${props.delete.onOpen}>
                        削除
                    </button>
                </section>
            `
        )
    }
    function editingBox() {
        if (invalid) {
            return fullBox_editing(
                "complex",
                [
                    formWithHelp_error(
                        "名前",
                        html`<input type="text" value="GETTO CSS" onInput=${onInput} />`,
                        ["名前は必須です"],
                        ["プロジェクト名"]
                    ),
                    formWithHelp_warning(
                        "メールアドレス",
                        html`<input type="email" value="admin@example.com" onInput=${onInput} />`,
                        ["メールアドレスが初期値のままです"],
                        ["連絡先メールアドレス"]
                    ),
                ],
                h(FormFooter, props)
            )
        } else {
            return fullBox_editing(
                "complex",
                [
                    formWithHelp(
                        "名前",
                        html`<input type="text" value="GETTO CSS" onInput=${onInputAsInvalid} />`,
                        ["プロジェクト名"]
                    ),
                    formWithHelp(
                        "メールアドレス",
                        html`<input
                            type="email"
                            value="admin@example.com"
                            onInput=${onInputAsInvalid}
                        />`,
                        ["連絡先メールアドレス"]
                    ),
                ],
                h(FormFooter, props)
            )
        }
    }
}

function CompleteModal({ connecting, onConnect, onClose }: ModalContentProps): VNode {
    if (connecting) {
        return fullModal("完了処理中", "作業を完了しています", [
            html`<button type="button" class="button button_completeConfirm button_completing">
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
                    <button type="button" class="button button_completeConfirm" onClick="${onConnect}">
                        完了
                    </button>
                    <button type="button" class="button button_cancel button_right" onClick="${onClose}">
                        キャンセル
                    </button>
                </div>`,
            ]
        )
    }
}
function DeleteModal({ connecting, onConnect, onClose }: ModalContentProps): VNode {
    if (connecting) {
        return fullModal("削除処理中", "削除しています", [
            html`<button type="button" class="button button_deleteConfirm button_deleting">
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
                    <button type="button" class="button button_deleteConfirm" onClick="${onConnect}">
                        削除
                    </button>
                    <button type="button" class="button button_cancel button_right" onClick="${onClose}">
                        キャンセル
                    </button>
                </div>`,
            ]
        )
    }
}
function GenerateModal({ connecting, onClose }: ModalContentProps): VNode {
    if (connecting) {
        return modal(
            "レポート作成中",
            html`<div class="loading loading_box">
                <i class="lnir lnir-spinner lnir-is-spinning"></i>
                <p class="loading__message">読み込み中です</p>
            </div>`
        )
    } else {
        return fullModal(
            "レポートダウンロード",
            html`必要な書類をダウンロードしてください
                <ul class="list">
                    <li class="list__item">
                        <a href="#"><i class="lnir lnir-files"></i> 作業申請書</a>
                    </li>
                    <li class="list__item">
                        <a href="#"><i class="lnir lnir-files"></i> 作業申請書</a>
                    </li>
                    <li class="list__item">
                        <a href="#"><i class="lnir lnir-files"></i> 作業申請書</a>
                    </li>
                    <li class="list__item">
                        <a href="#"><i class="lnir lnir-files"></i> 作業申請書</a>
                    </li>
                    <li class="list__item">
                        <a href="#"><i class="lnir lnir-files"></i> 作業申請書</a>
                    </li>
                </ul>`,
            [
                html`<div class="button__container">
                    <span></span>
                    <button type="button" class="button button_cancel button_right" onClick="${onClose}">
                        閉じる
                    </button>
                </div>`,
            ]
        )
    }
}

function i(iconName: string) {
    return icon(iconClass(lnir(iconName)))
}

interface Post<T> {
    (event: T): void
}
