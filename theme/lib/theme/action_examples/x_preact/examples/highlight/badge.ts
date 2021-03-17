import { VNode } from "preact"
import { html } from "htm/preact"

import { box } from "../../../../../z_vendor/getto-css/preact/design/box"
import {
    badge_alert,
    badge_gray,
    badge_info,
    badge_pending,
    badge_success,
    badge_warning,
} from "../../../../../z_vendor/getto-css/preact/design/highlight"

type Props = {
    // no props
}
export function BadgeComponent(_: Props): VNode {
    return box({
        title: "badge",
        body: [
            html`<p>
                ${badge_gray("10")} ${badge_alert("10")} ${badge_success("10")} ${badge_warning("10")}
                ${" "} ${badge_pending("10")} ${badge_info("10")}
            </p>`,
            html`<p>${badge_gray("10")} テキスト</p>`,
            html`<p>${badge_gray("10")} 長いテキストの中の badge はこのようになります</p>`,
        ],
    })
}
