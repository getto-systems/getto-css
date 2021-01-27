import { VNode } from "preact"
import { html } from "htm/preact"

import { box } from "../../../../z_external/getto-css/preact/design/box"
import {
    form,
    buttons,
    button_edit,
    button_search,
    button_send,
    button_delete,
    button_complete,
    button_warning,
    button_pending,
    button_cancel,
    button_close,
    button_undo,
    button_redo,
    button_disabled,
} from "../../../../z_external/getto-css/preact/design/form"

import { spinner } from "../../../common/icon"

type Props = {
    // no props
}
export function Button(_: Props): VNode {
    function onClick() {
        // 何もしない
    }
    return box({
        type: "title",
        title: "button",
        body: [
            form({
                title: "edit",
                body: [
                    buttons({
                        left: [
                            button_edit({ state: "normal", label: "保存", onClick }),
                            button_edit({ state: "confirm", label: "保存", onClick }),
                            button_edit({ state: "connect", label: html`${spinner} 保存中` }),
                        ],
                        right: [],
                    }),
                ],
                help: [],
            }),
            form({
                title: "search",
                body: [
                    buttons({
                        left: [
                            button_search({ state: "normal", label: "検索", onClick }),
                            button_search({ state: "confirm", label: "検索", onClick }),
                            button_search({ state: "connect", label: html`${spinner} 検索中` }),
                        ],
                        right: [],
                    }),
                ],
                help: [],
            }),
            form({
                title: "send",
                body: [
                    buttons({
                        left: [
                            button_send({ state: "normal", label: "送信", onClick }),
                            button_send({ state: "confirm", label: "送信", onClick }),
                            button_send({ state: "connect", label: html`${spinner} 送信中` }),
                        ],
                        right: [],
                    }),
                ],
                help: [],
            }),
            form({
                title: "delete",
                body: [
                    buttons({
                        left: [
                            button_delete({ state: "normal", label: "削除", onClick }),
                            button_delete({ state: "confirm", label: "削除", onClick }),
                            button_delete({ state: "connect", label: html`${spinner} 削除中` }),
                        ],
                        right: [],
                    }),
                ],
                help: [],
            }),
            form({
                title: "complete",
                body: [
                    buttons({
                        left: [
                            button_complete({ state: "normal", label: "完了", onClick }),
                            button_complete({ state: "confirm", label: "完了", onClick }),
                            button_complete({ state: "connect", label: html`${spinner} 完了中` }),
                        ],
                        right: [],
                    }),
                ],
                help: [],
            }),
            form({
                title: "warning",
                body: [
                    buttons({
                        left: [
                            button_warning({ state: "normal", label: "ロック", onClick }),
                            button_warning({ state: "confirm", label: "ロック", onClick }),
                            button_warning({ state: "connect", label: html`${spinner} ロック中` }),
                        ],
                        right: [],
                    }),
                ],
                help: [],
            }),
            form({
                title: "pending",
                body: [
                    buttons({
                        left: [
                            button_pending({ state: "normal", label: "保留", onClick }),
                            button_pending({ state: "confirm", label: "保留", onClick }),
                            button_pending({ state: "connect", label: html`${spinner} 保留` }),
                        ],
                        right: [],
                    }),
                ],
                help: [],
            }),
            form({
                title: "cancel / close",
                body: [
                    buttons({
                        left: [
                            button_cancel({ state: "normal", label: "キャンセル", onClick }),
                            button_close({ state: "normal", label: "閉じる", onClick }),
                        ],
                        right: [],
                    }),
                ],
                help: [],
            }),
            form({
                title: "undo / redo",
                body: [
                    buttons({
                        left: [
                            button_undo({ state: "normal", label: "キャ取り消すンセル", onClick }),
                            button_redo({ state: "normal", label: "やり直す", onClick }),
                        ],
                        right: [],
                    }),
                ],
                help: [],
            }),
            form({
                title: "disabled",
                body: [
                    buttons({
                        left: [button_disabled({ state: "normal", label: "やり直す" })],
                        right: [],
                    }),
                ],
                help: [],
            }),
        ],
    })
}
