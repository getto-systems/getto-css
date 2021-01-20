import { VNode } from "preact"
import { useState, useEffect } from "preact/hooks"
import { html } from "htm/preact"

import { notice_alert, box_double, form } from "../../common/style"

import { HowToUseComponent, initialHowToUseState } from "../../../theme/Home/howToUse/component"

import { AllVersions, FindError, Version, VersionInfo } from "../../../theme/allVersions/data"

type Props = Readonly<{
    howToUse: HowToUseComponent
}>
export function HowToUse({ howToUse }: Props): VNode {
    const [state, setState] = useState(initialHowToUseState)
    useEffect(() => {
        howToUse.onStateChange(setState)
        howToUse.load()
    }, [])

    return box_double({
        type: "title",
        title: "How To Use",
        body: [
            form({ title: "リンクタグ", body: linkTag(), help: [] }),
            form({ title: "バージョン", body: versions(), help: [] }),
        ],
    })

    function versions(): VNode {
        switch (state.type) {
            case "initial-how-to-use":
                return EMPTY_CONTENT

            case "try-to-find":
                // すぐにロードできるはずなので何も表示しない
                return EMPTY_CONTENT

            case "delayed-to-find":
                return delayed()

            case "succeed-to-find":
                return allVersions(state.versions)

            case "failed-to-find":
                return error(state.err)
        }
    }

    function linkTag(): string {
        switch (state.type) {
            case "initial-how-to-use":
                return ""

            default:
                return `<pre><link rel="stylesheet"\n href="${productionCSS(
                    state.currentVersion
                )}"></pre>`
        }

        function productionCSS(version: Version) {
            return `https://trellis.getto.systems/css/${version}/getto.css`
        }
    }
}

function allVersions(versions: AllVersions): VNode {
    return html`<ul>
        ${list()}
    </ul>`

    function list() {
        return versions.map(
            (versionInfo) => html`<li>${link(versionInfo)}${currentVersionMark(versionInfo)}</li>`
        )

        function link({ version }: VersionInfo) {
            return html`<a href="${differentVersionIndex(version)}">${version}</a>`

            function differentVersionIndex(version: Version) {
                return `/${version}/index.html`
            }
        }
        function currentVersionMark(versionInfo: VersionInfo) {
            if (!versionInfo.isCurrent) {
                return EMPTY_CONTENT
            }
            return html`<span class="label label_info">current</span>`
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
