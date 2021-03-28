import { h, VNode } from "preact"
import { html } from "htm/preact"

import { useApplicationAction } from "../../../../z_vendor/getto-application/action/x_preact/hooks"

import { VNodeContent } from "../../../../x_preact/design/common"
import { field } from "../../../../z_vendor/getto-css/preact/design/form"
import { label_info } from "../../../../z_vendor/getto-css/preact/design/highlight"
import { spinner } from "../../../../x_preact/design/icon"

import { FindAllVersionResource, FindAllVersionResourceState } from "../resource"

import { GetVersionsError, VersionInfo } from "../../find_all/data"
import { VersionString } from "../../data"

export function FindAllVersionsEntry(resource: FindAllVersionResource): VNode {
    return h(FindAllVersionsComponent, {
        ...resource,
        state: useApplicationAction(resource.findAll),
    })
}

type Props = FindAllVersionResource & FindAllVersionResourceState
export function FindAllVersionsComponent(props: Props): VNode {
    return field({
        title: "バージョン",
        body: body(),
    })

    function body(): VNodeContent {
        switch (props.state.type) {
            case "initial-all-version":
                return EMPTY_CONTENT

            case "take-longtime-to-find":
                return takeLongtimeMessage()

            case "succeed-to-find":
                return allVersions(props.state.versions)

            case "failed-to-find":
                return errorMessage(props.state.err)
        }
    }

    function takeLongtimeMessage() {
        return html`${spinner} 読み込み中`
    }
}

function allVersions(versions: VersionInfo[]): VNode {
    return html`<ul>
        ${list()}
    </ul>`

    function list() {
        return versions.map((info) => html`<li>${link(info)}${currentVersionMark(info)}</li>`)

        function link({ version }: VersionInfo) {
            return html`<a href="${href(version)}">${version}</a>`

            function href(version: VersionString) {
                return `/${version}/index.html`
            }
        }
        function currentVersionMark(info: VersionInfo) {
            if (!info.isCurrent) {
                return EMPTY_CONTENT
            }
            return label_info("current")
        }
    }
}

function errorMessage(err: GetVersionsError): string {
    switch (err.type) {
        case "server-error":
            return "サーバーエラーが発生しました"

        case "infra-error":
            return `ネットワークエラーが発生しました: ${err.err}`
    }
}

const EMPTY_CONTENT = html``
