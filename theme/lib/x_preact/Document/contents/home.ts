import { VNode } from "preact"
import { html } from "htm/preact"

import { container, notice_info, v_medium, v_small, box, form } from "../../common/style"

export const content_home = (): VNode[] => [
    container([
        box({
            type: "title",
            title: "GETTO CSS",
            body: [
                html`<p>業務アプリケーションの CSS</p>`,
                html`<p>基本的な管理画面のスタイルを提供</p>`,
            ],
        }),
        box({
            type: "title",
            title: "業務アプリケーション",
            body: [
                notice_info("業務の目標を達成する"),
                notice_info("業務で必要な時に使用できる"),
                notice_info("業務に合ったコストで運用できる"),
                notice_info("業務内容をプライベートに保つ"),
            ],
        }),
    ]),
    v_small(),
    container([content_home_policy(), content_home_base(), content_home_layout()]),
    container([
        content_home_box(),
        content_home_highlight(),
        content_home_form(),
        content_home_data(),
        content_home_print(),
        content_home_loading(),
        content_home_alignment(),
    ]),
    v_small(),
    container([content_home_component(), content_home_resources(), content_home_size()]),
]

export function content_home_policy(): VNode {
    return box({
        type: "title",
        title: "基本方針",
        body: [
            notice_info("業務で必要な時に使用できる"),
            v_small(),
            html`<p>読み込み時間を最小限にする</p>`,
            html`<p>基本のスタイルを提供</p>`,
            html`<p>特別なものは含まない</p>`,
            v_medium(),
            notice_info("業務に合ったコストで運用できる"),
            v_small(),
            html`<p>CSS への依存は最小限にする</p>`,
            html`<p>コンポーネント定義は提供しない</p>`,
        ],
    })
}
export function content_home_base(): VNode {
    return box({
        type: "title",
        title: "Base",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<p>わかりやすい画面</p>`,
            html`<p>大きめの字</p>`,
            html`<p>広めの行間</p>`,
            html`<p>コントラスト高めの配色</p>`,
            v_medium(),
            notice_info("業務で必要な時に使用できる"),
            v_small(),
            html`<p>画面サイズによる出しわけ</p>`,
        ],
    })
}
export function content_home_layout(): VNode {
    return box({
        type: "title",
        title: "Layout",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<p>わかりやすい画面</p>`,
            html`<p>メインタイトル</p>`,
            html`<p>パンくずリスト</p>`,
            html`<p>サイド画面</p>`,
            v_medium(),
            notice_info("業務で必要な時に使用できる"),
            v_small(),
            html`<p>メインメニュー</p>`,
            v_medium(),
            notice_info("業務内容をプライベートに保つ"),
            v_small(),
            html`<p>ログイン画面</p>`,
        ],
    })
}
export function content_home_box(): VNode {
    return box({
        type: "title",
        title: "Box",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<p>わかりやすい画面</p>`,
            html`<p>カードスタイルの等幅 box</p>`,
            html`<p>横方向と縦方向のスタック</p>`,
            html`<p>取り返しのつかない操作の警告</p>`,
        ],
    })
}
export function content_home_highlight(): VNode {
    return box({
        type: "title",
        title: "Highlight",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<p>わかりやすい画面</p>`,
            html`<p>数字表示用 badge</p>`,
            html`<p>文字表示用 label</p>`,
            html`<p>通知表示用 notice</p>`,
        ],
    })
}
export function content_home_form(): VNode {
    return box({
        type: "title",
        title: "Form",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<p>わかりやすい画面</p>`,
            html`<p>押しやすいボタン</p>`,
            html`<p>わかりやすい見出し</p>`,
            html`<p>入力しやすい input</p>`,
        ],
    })
}
export function content_home_data(): VNode {
    return box({
        type: "title",
        title: "Data",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<p>わかりやすい画面</p>`,
            html`<p>使いやすい検索</p>`,
            html`<p>わかりやすいページャ</p>`,
            html`<p>データ一覧</p>`,
        ],
    })
}
export function content_home_print(): VNode {
    return box({
        type: "title",
        title: "Print",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<p>わかりやすい画面</p>`,
            html`<p>見やすい印刷用スタイル</p>`,
        ],
    })
}
export function content_home_loading(): VNode {
    return box({
        type: "title",
        title: "Loading",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<p>わかりやすい画面</p>`,
            html`<p>長い時間待てる読み込み画面</p>`,
        ],
    })
}
export function content_home_alignment(): VNode {
    return box({
        type: "title",
        title: "Alignment",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<p>わかりやすい画面</p>`,
            html`<p>縦方向の空白調整</p>`,
            html`<p>見えない要素による位置調整</p>`,
        ],
    })
}

export function content_home_component(): VNode {
    return box({
        type: "title",
        title: "コンポーネント",
        body: [
            form({
                title: "やらないこと",
                body: [
                    html`<p>コンポーネント定義は提供しない</p>`,
                    html`<p>React や Vue によるコンポーネント定義は各プロジェクトで必要</p>`,
                ],
                help: [],
            }),
        ],
    })
}
export function content_home_resources(): VNode {
    return box({
        type: "title",
        title: "フォントとアイコン",
        body: [
            form({
                title: "やらないこと",
                body: [
                    html`<p>バンドルしない</p>`,
                    html`<p>どのフォントとアイコンを使用するかは各プロジェクトで決める</p>`,
                ],
                help: [],
            }),
            form({
                title: "最適化に使用したリソース",
                body: [html`<p>みんなの文字</p>`, html`<p>LineIcons</p>`],
                help: [],
            }),
        ],
    })
}
export function content_home_size(): VNode {
    return box({
        type: "title",
        title: "フォントサイズ",
        body: [
            form({
                title: "相対指定",
                body: html`<ul>
                    <li>big / small</li>
                    <li>badge / label / notice</li>
                    <li>button / input</li>
                </ul>`,
                help: [],
            }),
            form({
                title: "絶対指定",
                body: html`<ul>
                    <li>main : title / footer</li>
                    <li>menu : title / brand / footer</li>
                    <li>loginBox : title / brand / footer / box title</li>
                    <li>modal : title</li>
                    <li>form : header / help</li>
                    <li>table : th</li>
                    <li>report : title / folio</li>
                </ul>`,
                help: [],
            }),
        ],
    })
}
