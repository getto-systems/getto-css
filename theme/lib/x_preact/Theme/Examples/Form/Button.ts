import { VNode } from "preact"
import { html } from "htm/preact"

import { box, buttons, form } from "../box"

type Props = {
    // no props
}
export function Button(_: Props): VNode {
    return box("button", [
        form("edit", [
            buttons(
                [
                    html`<button class="button button_edit">編集</button>`,
                    html`<button class="button button_edit">保存</button>`,
                    html`<button class="button button_edit button_confirm">保存</button>`,
                    html`<button class="button button_edit button_connect">
                        <i class="lnir lnir-spinner lnir-is-spinning"></i> 保存中
                    </button>`,
                ],
                []
            ),
        ]),
        form("delete", [
            buttons(
                [
                    html`<button class="button button_delete">削除</button>`,
                    html`<button class="button button_delete button_confirm">削除</button>`,
                    html`<button class="button button_delete button_connect">
                        <i class="lnir lnir-spinner lnir-is-spinning"></i> 削除中
                    </button>`,
                ],
                []
            ),
        ]),
        form("complete", [
            buttons(
                [
                    html`<button class="button button_complete">完了</button>`,
                    html`<button class="button button_complete button_confirm">完了</button>`,
                    html`<button class="button button_complete button_connect">
                        <i class="lnir lnir-spinner lnir-is-spinning"></i> 完了中
                    </button>`,
                ],
                []
            ),
        ]),
        form("warning", [
            buttons(
                [
                    html`<button class="button button_warning">ロック</button>`,
                    html`<button class="button button_warning button_confirm">ロック</button>`,
                    html`<button class="button button_warning button_connect">
                        <i class="lnir lnir-spinner lnir-is-spinning"></i> ロック中
                    </button>`,
                ],
                []
            ),
        ]),
        form("pending", [
            buttons(
                [
                    html`<button class="button button_pending">保留</button>`,
                    html`<button class="button button_pending button_confirm">保留</button>`,
                    html`<button class="button button_pending button_connect">
                        <i class="lnir lnir-spinner lnir-is-spinning"></i> 保留中
                    </button>`,
                ],
                []
            ),
        ]),
        form("cancel", [
            buttons(
                [
                    html`<button class="button button_cancel">キャンセル</button>`,
                ],
                []
            ),
        ]),
        form("undo / redo", [
            buttons(
                [
                    html`<button class="button button_undo">取り消す</button>`,
                    html`<button class="button button_redo">やり直す</button>`,
                ],
                []
            ),
        ]),
        form("disabled", [
            buttons(
                [
                    html`<button class="button button_disabled">やり直す</button>`,
                ],
                []
            ),
        ]),
    ])
}
