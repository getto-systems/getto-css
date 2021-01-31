import { VNode } from "preact"
import { html } from "htm/preact"

import { VNodeContent } from "../../z_external/getto-example/preact/common"
import { label_alert, label_pending } from "../../z_external/getto-css/preact/design/highlight"
import { v_medium, v_small } from "../../z_external/getto-css/preact/design/alignment"

export function itemsSection(title: VNodeContent, list: VNodeContent[]): VNode {
    return html`
        <p>${title}</p>
        ${v_small()} ${items(list)} ${v_medium()}
    `
}
export function items(list: VNodeContent[]): VNode {
    return html`<ul>
        ${list.map(item)}
    </ul>`

    function item(content: VNodeContent): VNode {
        return html`<li>
            <small><i class="lnir lnir-chevron-right"></i></small>
            ${" "} ${content}
        </li>`
    }
}

export function negativeNote(content: VNodeContent, resolve: VNodeContent): VNode {
    return iconSection("lnir lnir-close", content, resolve)
}
export function iconSection(icon: string, content: VNodeContent, note: VNodeContent): VNode {
    return html`
        <p><i class="${icon}"></i> ${content}</p>
        <small><p>${note}</p></small>
        ${v_small()}
    `
}

export function pending(content: VNodeContent): VNode {
    return html`${content} ${label_pending("あとで")}`
}
export function validate(content: VNodeContent): VNode {
    return html`${label_alert("検証")} ${content}`
}
