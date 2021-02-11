import { VNode } from "preact"
import { html } from "htm/preact"

import { box } from "../../../../z_vendor/getto-css/preact/design/box"
import {
    field,
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
} from "../../../../z_vendor/getto-css/preact/design/form"

import { spinner } from "../../../common/icon"

type Props = {
    // no props
}
export function Button(_: Props): VNode {
    function onClick() {
        // 何もしない
    }
    return box({
        title: "button",
        body: [
            field({
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
            field({
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
            field({
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
            field({
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
            field({
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
            field({
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
            field({
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
            field({
                title: "cancel / close",
                body: [
                    buttons({
                        left: [
                            button_cancel({ label: "キャンセル", onClick }),
                            button_close({ label: "閉じる", onClick }),
                        ],
                        right: [],
                    }),
                ],
                help: [],
            }),
            field({
                title: "undo / redo",
                body: [
                    buttons({
                        left: [
                            button_undo({ label: "取り消す", onClick }),
                            button_redo({ label: "やり直す", onClick }),
                        ],
                        right: [],
                    }),
                ],
                help: [],
            }),
            field({
                title: "disabled",
                body: [
                    buttons({
                        left: [button_disabled({ label: "やり直す" })],
                        right: [],
                    }),
                ],
                help: [],
            }),
        ],
    })
}
