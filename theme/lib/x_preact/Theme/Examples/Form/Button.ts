import { VNode } from "preact"
import { html } from "htm/preact"

import { buttons } from "../../../common/layout"
import { box, form } from "../box"

type Props = {
    // no props
}
export function Button(_: Props): VNode {
    return box("button", [
        form("edit", [
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
        ]),
        form("search", [
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
        ]),
        form("send", [
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
        ]),
        form("delete", [
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
        ]),
        form("complete", [
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
        ]),
        form("warning", [
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
        ]),
        form("pending", [
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
        ]),
        form("cancel / close", [
            buttons({
                left: [
                    html`<button class="button button_cancel">キャンセル</button>`,
                    html`<button class="button button_close">閉じる</button>`,
                ],
                right: [],
            }),
        ]),
        form("undo / redo", [
            buttons({
                left: [
                    html`<button class="button button_undo">取り消す</button>`,
                    html`<button class="button button_redo">やり直す</button>`,
                ],
                right: [],
            }),
        ]),
        form("disabled", [
            buttons({
                left: [html`<button class="button button_disabled">やり直す</button>`],
                right: [],
            }),
        ]),
    ])
}
