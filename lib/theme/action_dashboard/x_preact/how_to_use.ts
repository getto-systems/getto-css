import { h, VNode } from "preact"
import { html } from "htm/preact"

import { box_double, container } from "../../../z_vendor/getto-css/preact/design/box"
import { field } from "../../../z_vendor/getto-css/preact/design/form"

import { FindAllVersionsEntry } from "../../../avail/version/action_find_all/x_preact/find_all_versions"

import { FindAllVersionResource } from "../../../avail/version/action_find_all/resource"
import { GetCurrentVersionResource } from "../../../avail/version/action_get_current/resource"

type Props = FindAllVersionResource & GetCurrentVersionResource
export function HowToUseComponent(props: Props): VNode {
    return container(
        box_double({
            title: "How To Use",
            body: [
                field({ title: "リンクタグ", body: linkTag(), help: [] }),
                h(FindAllVersionsEntry, props),
            ],
        }),
    )

    function linkTag(): VNode {
        return html`<pre>${link()}</pre>`

        function link() {
            return `<link rel="stylesheet" \n      href="${cssURL()}">`
        }
        function cssURL() {
            return `https://trellis.getto.systems/css/${props.version.getCurrent()}/getto.css`
        }
    }
}
