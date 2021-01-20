import { VNode } from "preact"
import { html } from "htm/preact"

import { buttons, box, form } from "../../../common/style"

type Props = {
    // no props
}
export function Button(_: Props): VNode {
    return box({
        type: "title",
        title: "button",
        body: [
            form({
                title: "edit",
                body: [
                    buttons({
                        left: [
                            html`<button class="button button_edit">保存</button>`,
                            html`<button class="button button_edit button_confirm">保存</button>`,
                            html`<button class="button button_edit button_connect">
                                <i class="lnir lnir-spinner lnir-is-spinning"></i> 保存中
                            </button>`,
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
                            html`<button class="button button_search">検索</button>`,
                            html`<button class="button button_search button_confirm">検索</button>`,
                            html`<button class="button button_search button_connect">
                                <i class="lnir lnir-spinner lnir-is-spinning"></i> 検索中
                            </button>`,
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
                            html`<button class="button button_send">送信</button>`,
                            html`<button class="button button_send button_confirm">送信</button>`,
                            html`<button class="button button_send button_connect">
                                <i class="lnir lnir-spinner lnir-is-spinning"></i> 送信中
                            </button>`,
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
                            html`<button class="button button_delete">削除</button>`,
                            html`<button class="button button_delete button_confirm">削除</button>`,
                            html`<button class="button button_delete button_connect">
                                <i class="lnir lnir-spinner lnir-is-spinning"></i> 削除中
                            </button>`,
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
                            html`<button class="button button_complete">完了</button>`,
                            html`<button class="button button_complete button_confirm">完了</button>`,
                            html`<button class="button button_complete button_connect">
                                <i class="lnir lnir-spinner lnir-is-spinning"></i> 完了中
                            </button>`,
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
                            html`<button class="button button_warning">ロック</button>`,
                            html`<button class="button button_warning button_confirm">ロック</button>`,
                            html`<button class="button button_warning button_connect">
                                <i class="lnir lnir-spinner lnir-is-spinning"></i> ロック中
                            </button>`,
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
                            html`<button class="button button_pending">保留</button>`,
                            html`<button class="button button_pending button_confirm">保留</button>`,
                            html`<button class="button button_pending button_connect">
                                <i class="lnir lnir-spinner lnir-is-spinning"></i> 保留中
                            </button>`,
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
                            html`<button class="button button_cancel">キャンセル</button>`,
                            html`<button class="button button_close">閉じる</button>`,
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
                            html`<button class="button button_undo">取り消す</button>`,
                            html`<button class="button button_redo">やり直す</button>`,
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
                        left: [html`<button class="button button_disabled">やり直す</button>`],
                        right: [],
                    }),
                ],
                help: [],
            }),
        ],
    })
}
