import { VNode } from "preact"
import { useState, useEffect } from "preact/hooks"
import { html } from "htm/preact"

import { notice_alert } from "../../common/layout"

import { HowToUseComponent, initialHowToUseState } from "../../../theme/Home/howToUse/component"
import { AllVersions, FindError, Version } from "../../../theme/allVersions/data"

type Props = Readonly<{
    howToUse: HowToUseComponent
}>
export function HowToUse({ howToUse }: Props): VNode {
    const [state, setState] = useState(initialHowToUseState)
    useEffect(() => {
        howToUse.onStateChange(setState)
        howToUse.load()
    }, [])

    return html`
        <section class="box box_double">
            <div>
                <header class="box__header"><h2 class="box__title">How To Use</h2></header>
                <section class="box__body">
                    <dl class="form">
                        <dt class="form__header">リンクタグ</dt>
                        <dd class="form__field">
                            <pre>${linkTag()}</pre>
                        </dd>
                    </dl>
                    <dl class="form">
                        <dt class="form__header">バージョン</dt>
                        <dd class="form__field">${content()}</dd>
                    </dl>
                </section>
            </div>
        </section>
    `

    function content(): VNode {
        switch (state.type) {
            case "initial-how-to-use":
                return EMPTY_CONTENT

            case "try-to-find":
                // すぐにロードできるはずなので何も表示しない
                return EMPTY_CONTENT

            case "delayed-to-find":
                return delayed()

            case "succeed-to-find":
                return versions(state.currentVersion, state.versions)

            case "failed-to-find":
                return error(state.err)
        }
    }

    function linkTag(): string {
        switch (state.type) {
            case "initial-how-to-use":
                return ""

            default:
                return `<link rel="stylesheet"\n href="${href(state.currentVersion)}">`
        }

        function href(version: Version) {
            return `https://trellis.getto.systems/css/${version}/getto.css`
        }
    }
}

function versions(currentVersion: Version, versions: AllVersions): VNode {
    return html`<ul>
        ${list()}
    </ul>`

    function list() {
        return versions.map((version) => html`<li>${version}${currentVersionMark(version)}</li>`)

        function currentVersionMark(version: Version) {
            if (version !== currentVersion) {
                return EMPTY_CONTENT
            }
            return html` <span class="label label_info">current</span>`
        }
    }
}

function delayed(): VNode {
    return html`<p>
        ロードに時間がかかっています<br />
        30秒以上かかるようなら何かおかしいので、お手数ですが管理者にご連絡お願いします。
    </p>`
}
function error(err: FindError): VNode {
    switch (err.type) {
        case "server-error":
            return notice_alert("サーバーエラーにより読み込めませんでした")

        case "infra-error":
            return html`
                ${notice_alert("ネットワークエラーにより読み込めませんでした")}
                <p>詳細: ${err.err}</p>
            `
    }
}

const EMPTY_CONTENT = html``
