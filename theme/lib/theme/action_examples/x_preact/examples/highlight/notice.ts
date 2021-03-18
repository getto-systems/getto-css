import { VNode } from "preact"

import { box } from "../../../../../z_vendor/getto-css/preact/design/box"
import {
    notice_alert,
    notice_gray,
    notice_info,
    notice_pending,
    notice_success,
    notice_warning,
} from "../../../../../z_vendor/getto-css/preact/design/highlight"

type NoticeBasicProps = {
    // no props
}
export function BasicNoticeComponent(_: NoticeBasicProps): VNode {
    return box({
        title: "notice",
        body: [
            notice_gray("データがありません"),
            notice_alert("システムエラーです"),
            notice_success("すべて完了しました"),
            notice_info("システムメッセージ"),
        ],
    })
}

type NoticeOtherProps = {
    // no props
}
export function OtherNoticeComponent(_: NoticeOtherProps): VNode {
    return box({
        title: "notice",
        body: [
            notice_warning("この項目は作業中です"),
            notice_pending("この案件は保留です"),
            notice_info("長いシステムメッセージ。さらに長いシステムメッセージ。"),
        ],
    })
}
