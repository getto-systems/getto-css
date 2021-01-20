import { VNode } from "preact"
import { html } from "htm/preact"

import { iconClass, lnir } from "../../../../z_external/icon"

import {
    box,
    icon,
    label_alert,
    label_gray,
    label_info,
    label_pending,
    label_success,
    label_warning,
} from "../../../common/style"

type Props = {
    // no props
}
export function Label(_: Props): VNode {
    return box({
        type: "title",
        title: "label",
        body: [
            html`<p>
                ${label_gray("仮")} ${label_alert("エラー")} ${label_success("完了")} ${" "}
                ${label_warning("作業中")} ${label_pending("保留")} ${label_info("情報")}
            </p>`,
            html`<p>${label_gray(i("checkmark"))} テキスト</p>`,
            html`<p>${label_warning("作業中")} 長いテキストの中の label はこのようになります</p>`,
        ],
    })
}

function i(iconName: string) {
    return icon(iconClass(lnir(iconName)))
}
