import { VNode } from "preact"
import { html } from "htm/preact"

import { container, box } from "../../../z_vendor/getto-css/preact/design/box"
import { field } from "../../../z_vendor/getto-css/preact/design/form"
import { notice_info } from "../../../z_vendor/getto-css/preact/design/highlight"
import { v_medium, v_small } from "../../../z_vendor/getto-css/preact/design/alignment"

export const content_home = (): VNode[] => [
    container([
        box({
            title: "GETTO CSS",
            body: [
                html`<p>業務アプリケーションの CSS</p>`,
                html`<p>基本的な管理画面のスタイルを提供</p>`,
            ],
        }),
        box({
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
        title: "基本方針",
        body: [
            notice_info("業務で必要な時に使用できる"),
            v_small(),
            html`<ul>
                <li>読み込み時間を最小限にする</li>
                <li>基本のスタイルを提供</li>
                <li>特別なものは含まない</li>
            </ul>`,
            v_medium(),
            notice_info("業務に合ったコストで運用できる"),
            v_small(),
            html`<ul>
                <li>CSS への依存は最小限にする</li>
                <li>コンポーネントライブラリは提供しない</li>
            </ul>`,
        ],
    })
}
export function content_home_base(): VNode {
    return box({
        title: "Base",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<ul>
                <li>わかりやすい画面</li>
                <li>大きめの字</li>
                <li>広めの行間</li>
                <li>コントラスト高めの配色</li>
            </ul>`,
            v_medium(),
            notice_info("業務で必要な時に使用できる"),
            v_small(),
            html`<ul>
                <li>画面サイズによる出しわけ</li>
                <li>大きめの字</li>
                <li>広めの行間</li>
                <li>コントラスト高めの配色</li>
            </ul>`,
        ],
    })
}
export function content_home_layout(): VNode {
    return box({
        title: "Layout",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<ul>
                <li>わかりやすい画面</li>
                <li>メインタイトル</li>
                <li>パンくずリスト</li>
                <li>サイドバー</li>
            </ul>`,
            v_medium(),
            notice_info("業務で必要な時に使用できる"),
            v_small(),
            html`<ul>
                <li>メインメニュー</li>
            </ul>`,
            v_medium(),
            notice_info("業務内容をプライベートに保つ"),
            v_small(),
            html`<ul>
                <li>ログイン画面</li>
            </ul>`,
        ],
    })
}
export function content_home_box(): VNode {
    return box({
        title: "Box",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<ul>
                <li>わかりやすい画面</li>
                <li>カードスタイルの等幅 box</li>
                <li>横方向と縦方向のスタック</li>
                <li>取り返しのつかない操作の警告</li>
            </ul>`,
        ],
    })
}
export function content_home_highlight(): VNode {
    return box({
        title: "Highlight",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<ul>
                <li>わかりやすい画面</li>
                <li>数字表示用 badge</li>
                <li>文字表示用 label</li>
                <li>通知表示用 notice</li>
            </ul>`,
        ],
    })
}
export function content_home_form(): VNode {
    return box({
        title: "Form",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<ul>
                <li>わかりやすい画面</li>
                <li>押しやすいボタン</li>
                <li>わかりやすい見出し</li>
                <li>入力しやすい input</li>
            </ul>`,
        ],
    })
}
export function content_home_data(): VNode {
    return box({
        title: "Data",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<ul>
                <li>わかりやすい画面</li>
                <li>使いやすい検索</li>
                <li>わかりやすいページャ</li>
                <li>データ一覧</li>
            </ul>`,
        ],
    })
}
export function content_home_print(): VNode {
    return box({
        title: "Print",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<ul>
                <li>わかりやすい画面</li>
                <li>見やすい印刷用スタイル</li>
            </ul>`,
        ],
    })
}
export function content_home_loading(): VNode {
    return box({
        title: "Loading",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<ul>
                <li>わかりやすい画面</li>
                <li>長い時間待てる読み込み画面</li>
            </ul>`,
        ],
    })
}
export function content_home_alignment(): VNode {
    return box({
        title: "Alignment",
        body: [
            notice_info("業務の目標を達成する"),
            v_small(),
            html`<ul>
                <li>わかりやすい画面</li>
                <li>縦方向の空白調整</li>
                <li>見えない要素による位置調整</li>
            </ul>`,
        ],
    })
}

export function content_home_component(): VNode {
    return box({
        title: "コンポーネント",
        body: [
            html`<p>コンポーネントライブラリは提供しない</p>`,
            html`<p>style.ts に preact 用のスタイル定義があるが、これを直接共有しない</p>`,
            html`<p>各プロジェクトではこの内容をコピーしたものを持つ形で緩く共有する</p>`,
            html`<p>
                input 要素にはクラスを設定しない<br />
                value や checked をコントロールする必要があるので、input
                要素に直接クラスを定義するとうまくいかないため
            </p>`,
        ],
    })
}
export function content_home_resources(): VNode {
    return box({
        title: "フォントとアイコン",
        body: [
            html`<p>フォントとアイコンはバンドルしない</p>`,
            html`<p>どのフォントとアイコンを使用するかは各プロジェクトで決める</p>`,
            html`<p>
                数字が等幅になっているフォントが適当<br />
                そうでない場合はテーブルのスタイルで等幅指定を追加する必要がある
            </p>`,
            v_medium(),
            field({
                title: "最適化に使用したリソース",
                body: html`<ul>
                    <li>みんなの文字</li>
                    <li>LineIcons</li>
                </ul>`,
                help: [],
            }),
        ],
    })
}
export function content_home_size(): VNode {
    return box({
        title: "フォントサイズ",
        body: [
            field({
                title: "相対指定",
                body: html`<ul>
                    <li>big / small</li>
                    <li>badge / label / notice</li>
                    <li>button</li>
                </ul>`,
                help: [],
            }),
            field({
                title: "絶対指定",
                body: html`<ul>
                    <li>main : title / footer</li>
                    <li>menu : title / brand / footer</li>
                    <li>loginBox : title / brand / footer</li>
                    <li>loginBox : box title</li>
                    <li>box : title</li>
                    <li>modal : title</li>
                    <li>form : header / help</li>
                    <li>input</li>
                    <li>table : th</li>
                    <li>report : title / folio</li>
                </ul>`,
                help: [],
            }),
        ],
    })
}
