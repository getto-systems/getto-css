import { VNode } from "preact"
import { html } from "htm/preact"

import { box } from "../../../../../z_vendor/getto-css/preact/design/box"
import {
    label_alert,
    label_gray,
    label_info,
    label_pending,
    label_success,
    label_warning,
} from "../../../../../z_vendor/getto-css/preact/design/highlight"
import { icon } from "../../../../../x_preact/design/icon"

type Props = {
    // no props
}
export function LabelComponent(_: Props): VNode {
    return box({
        title: "label",
        body: [
            html`<p>
                ${label_gray("仮")} ${label_alert("エラー")} ${label_success("完了")} ${" "}
                ${label_warning("作業中")} ${label_pending("保留")} ${label_info("情報")}
            </p>`,
            html`<p>${label_gray(icon("checkmark"))} テキスト</p>`,
            html`<p>${label_warning("作業中")} 長いテキストの中の label はこのようになります</p>`,
        ],
    })
}
