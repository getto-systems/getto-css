import { VNode } from "preact"
import { html } from "htm/preact"

import { container, v_small } from "../../common/layout"
import { box, box_double, form } from "../box"

export const content_index = (): VNode[] => [
    container([
        box_double(
            "GETTO CSS",
            html`
                <p>業務アプリケーションで使用する、汎用の管理画面用 CSS を提供</p>
                <p>CSS を読み込むだけで、ある程度の体裁が整うようにしたい</p>
                <p>各プロジェクト固有のスタイルは、それぞれ別途定義</p>
            `
        ),
    ]),
    v_small(),
    container([
        content_index_component(),
        content_index_resources(),
        content_index_color(),
        content_index_size(),
    ]),
]
export function content_index_component(): VNode {
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
export function content_index_resources(): VNode {
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
export function content_index_color(): VNode {
    return box("色テーマ", [
        html`
            <p>color.css にまとめて定義してある</p>
            <p>差し替えは想定していない</p>
        `,
    ])
}
export function content_index_size(): VNode {
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
