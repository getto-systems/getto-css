import { html } from "htm/preact"
import { VNode } from "preact"

type Props = {
    // no props
}
export function GlobalInfoComponent(_: Props): VNode {
    return html`<small>information:</small> Global State`
}
