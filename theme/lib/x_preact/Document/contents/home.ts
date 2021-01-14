import { VNode } from "preact"
import { html } from "htm/preact"

import { container, notice_info, v_medium, v_small } from "../../common/layout"
import { box, form } from "../box"

export const content_home = (): VNode[] => [
    container([
        box("GETTO CSS", [
            html`<p>業務アプリケーションの CSS</p>`,
            html`<p>基本的な管理画面のスタイルを提供</p>`,
        ]),
        box("業務アプリケーション", [
            notice_info("業務の目標を達成する"),
            notice_info("業務で必要な時に使用できる"),
            notice_info("業務に合ったコストで運用できる"),
            notice_info("業務内容をプライベートに保つ"),
        ]),
    ]),
    v_small(),
    container([
        content_home_policy(),
        content_home_base(),
        content_home_layout(),
    ]),
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
    container([
        content_home_component(),
        content_home_resources(),
        content_home_color(),
        content_home_size(),
    ]),
]

/*
# Base
base.css
color.css
media.css
size.css

# Layout
## Login
## Forget
## NotFound
layout.css
login.css
main.css
menu.css

# Box
container.css
box.css
modal.css

# Highlight
badge.css
label.css
notice.css

# Form
button.css
form.css
input.css

# Data
## Search
## List
pager.css
search.css
table.css

# Print
document.css
paper.css

# Loading
loading.css

# Alignment
## Misc
list.css
vertical.css
visibility.css
*/

export function content_home_policy(): VNode {
    return box("基本方針", [
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
    ])
}
export function content_home_base(): VNode {
    return box("Base", [
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
    ])
}
export function content_home_layout(): VNode {
    return box("Layout", [
        notice_info("業務の目標を達成する"),
        v_small(),
        html`<p>わかりやすい画面</p>`,
        html`<p>メインタイトル</p>`,
        html`<p>パンくずリスト</p>`,
        html`<p>サイド画面</p>`, // TODO 簡易一覧とかレポートのダウンロードとかするやつを追加
        v_medium(),
        notice_info("業務で必要な時に使用できる"),
        v_small(),
        html`<p>メインメニュー</p>`,
        v_medium(),
        notice_info("業務内容をプライベートに保つ"),
        v_small(),
        html`<p>ログイン画面</p>`,
    ])
}
export function content_home_box(): VNode {
    return box("Box", [
        notice_info("業務の目標を達成する"),
        v_small(),
        html`<p>わかりやすい画面</p>`,
        html`<p>カードスタイルの等幅 box</p>`,
        html`<p>横方向と縦方向のスタック</p>`,
        html`<p>取り返しのつかない操作の警告</p>`,
    ])
}
export function content_home_highlight(): VNode {
    return box("Highlight", [
        notice_info("業務の目標を達成する"),
        v_small(),
        html`<p>わかりやすい画面</p>`,
        html`<p>数字表示用 badge</p>`,
        html`<p>文字表示用 label</p>`,
        html`<p>通知表示用 notice</p>`,
    ])
}
export function content_home_form(): VNode {
    return box("Form", [
        notice_info("業務の目標を達成する"),
        v_small(),
        html`<p>わかりやすい画面</p>`,
        html`<p>押しやすいボタン</p>`,
        html`<p>わかりやすい見出し</p>`,
        html`<p>入力しやすい input</p>`,
    ])
}
export function content_home_data(): VNode {
    return box("Data", [
        notice_info("業務の目標を達成する"),
        v_small(),
        html`<p>わかりやすい画面</p>`,
        html`<p>使いやすい検索</p>`,
        html`<p>わかりやすいページャ</p>`,
        html`<p>データ一覧</p>`,
    ])
}
export function content_home_print(): VNode {
    return box("Print", [
        notice_info("業務の目標を達成する"),
        v_small(),
        html`<p>わかりやすい画面</p>`,
        html`<p>見やすい印刷用スタイル</p>`,
    ])
}
export function content_home_loading(): VNode {
    return box("Loading", [
        notice_info("業務の目標を達成する"),
        v_small(),
        html`<p>わかりやすい画面</p>`,
        html`<p>長い時間待てる読み込み画面</p>`,
    ])
}
export function content_home_alignment(): VNode {
    return box("Alignment", [
        notice_info("業務の目標を達成する"),
        v_small(),
        html`<p>わかりやすい画面</p>`,
        html`<p>縦方向の空白調整</p>`,
        html`<p>見えない要素による位置調整</p>`,
    ])
}

export function content_home_component(): VNode {
    return box("コンポーネント", [
        form(
            "やらないこと",
            html`
                <p>コンポーネント定義は提供しない</p>
                <p>React や Vue によるコンポーネント定義は各プロジェクトで必要</p>
            `
        ),
    ])
}
export function content_home_resources(): VNode {
    return box("フォントとアイコン", [
        form(
            "やらないこと",
            html`
                <p>バンドルしない</p>
                <p>どのフォントとアイコンを使用するかは各プロジェクトで決める</p>
            `
        ),
        form(
            "最適化に使用したリソース",
            html`
                <p>みんなの文字</p>
                <p>LineIcons</p>
            `
        ),
    ])
}
export function content_home_color(): VNode {
    return box("色テーマ", [
        html`
            <p>color.css にまとめて定義してある</p>
            <p>差し替えは想定していない</p>
        `,
    ])
}
export function content_home_size(): VNode {
    return box("フォントサイズ", [
        form(
            "相対指定",
            html`
                <ul>
                    <li>big / small</li>
                    <li>badge / label / notice</li>
                    <li>button / input</li>
                    <li>loading</li>
                </ul>
            `
        ),
        form(
            "絶対指定",
            html`
                <ul>
                    <li>main : title / footer</li>
                    <li>menu : title / brand / footer</li>
                    <li>modal : title</li>
                    <li>search : header / help</li>
                    <li>form : header / help / message</li>
                    <li>table : th</li>
                    <li>document : title / folio</li>
                    <li>login : 各構成要素</li>
                </ul>
            `
        ),
    ])
}
