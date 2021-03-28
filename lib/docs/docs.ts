import {
    docsDescription,
    docsItem,
    docsPurpose,
    docsSection,
    docsSection_double,
} from "../z_vendor/getto-application/docs/helper"

import { DocsSection } from "../z_vendor/getto-application/docs/data"

export const docs_docs: DocsSection[] = [
    docsSection("ドキュメント", [
        docsPurpose(["業務の目標を達成する"]),
        docsItem("重要な点の明文化", [
            "重要な点が判別できる",
            "重要でない点が判別できる",
            "すべての関係者が読める",
            "書きやすい",
        ]),
    ]),
]

export const docs_privacyPolicy: DocsSection[] = [
    docsSection_double("取り扱いデータ", [
        docsDescription([
            {
                title: "各種フォームへの入力",
                body: [
                    "フォームが設置されていますが、この入力はどこにも送信されません",
                    "入力されたデータを収集、解析することはありません",
                ],
                help: [],
            },
        ]),
    ]),
]
