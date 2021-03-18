import {
    docsDescription,
    docsModule,
    docsPurpose,
    docsSection,
    docsSection_double,
} from "../z_vendor/getto-application/docs/helper"

import { DocsSection } from "../z_vendor/getto-application/docs/data"

export const docs_theme: DocsSection[] = [
    docsSection("GETTO CSS", [
        docsModule(["業務アプリケーションの CSS", "基本的な管理画面のスタイルを提供"]),
    ]),
    docsSection("業務アプリケーション", [
        docsPurpose([
            "業務の目標を達成する",
            "業務で必要な時に使用できる",
            "業務に合ったコストで運用できる",
            "業務内容をプライベートに保つ",
        ]),
    ]),
    docsSection("基本方針", [
        docsPurpose(["業務で必要な時に使用できる"]),
        docsModule(["読み込み時間を最小限にする", "基本のスタイルを提供", "特別なものは含まない"]),
        docsPurpose(["業務に合ったコストで運用できる"]),
        docsModule([
            "CSS はコンポーネントライブラリを通して利用",
            "CSS の更新はコンポーネントライブラリの更新で追従できるようにする",
        ]),
    ]),
]

export const docs_theme_base: DocsSection[] = [
    docsSection("Base", [
        docsPurpose(["業務の目標を達成する"]),
        docsModule(["大きめの字", "広めの行間", "コントラスト高めの配色"]),
        docsPurpose(["業務で必要な時に使用できる"]),
        docsModule(["画面サイズによる出しわけ"]),
    ]),
]
export const docs_theme_layout: DocsSection[] = [
    docsSection("Layout", [
        docsPurpose(["業務の目標を達成する"]),
        docsModule(["メインタイトル", "パンくずリスト", "サイドバー"]),
        docsPurpose(["業務で必要な時に使用できる"]),
        docsModule(["メインメニュー"]),
        docsPurpose(["業務内容をプライベートに保つ"]),
        docsModule(["ログイン画面"]),
    ]),
]
export const docs_theme_design: DocsSection[] = [
    docsSection("Box", [
        docsModule([
            "カードスタイルの等幅 box",
            "横方向と縦方向のスタック",
            "取り返しのつかない操作の警告",
        ]),
    ]),
    docsSection("Highlight", [
        docsModule(["数字表示用 badge", "文字表示用 label", "通知表示用 notice"]),
    ]),
    docsSection("Form", [
        docsModule(["押しやすいボタン", "わかりやすい見出し", "入力しやすい input"]),
    ]),
    docsSection("Data", [docsModule(["使いやすい検索", "わかりやすいページャ", "データ一覧"])]),
    docsSection("Print", [docsModule(["見やすい印刷用スタイル"])]),
    docsSection("Loading", [docsModule(["長い時間待てる読み込み画面"])]),
    docsSection("Alignment", [docsModule(["縦方向の空白調整", "見えない要素による位置調整"])]),
]

export const docs_theme_details: DocsSection[] = [
    docsSection_double("コンポーネントライブラリ", [
        docsModule([
            "コンポーネントライブラリは直接提供しない",
            "各プロジェクトではこの内容をコピーしたものを持つ形で緩く共有する",
            "input 要素にはクラスを設定しない",
            "value や checked をコントロール場合、input 要素に直接クラスを定義するとうまくないため",
        ]),
    ]),
    docsSection_double("フォントとアイコン", [
        docsModule([
            "フォントとアイコンはバンドルしない",
            "どのフォントとアイコンを使用するかは各プロジェクトで決める",
            "数字が等幅になっているフォントが適当",
            "そうでない場合はテーブルのスタイルで等幅指定を追加する必要がある",
        ]),
        docsDescription([
            { title: "最適化に使用したリソース", body: ["みんなの文字", "LineIcons"], help: [] },
        ]),
    ]),
    docsSection_double("フォントサイズ", [
        docsDescription([
            {
                title: "相対指定",
                body: ["big / small", "badge / label / notice", "button"],
                help: [],
            },
            {
                title: "絶対指定",
                body: [
                    "main : title / footer",
                    "menu : title / brand / footer",
                    "loginBox : title / brand / footer / box title",
                    "box : title",
                    "modal : title",
                    "form : header / help",
                    "input",
                    "table : th",
                    "report : title / folio",
                ],
                help: [],
            },
        ]),
    ]),
]
