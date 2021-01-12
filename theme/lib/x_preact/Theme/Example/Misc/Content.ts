import { VNode } from "preact"
import { useState } from "preact/hooks"
import { html } from "htm/preact"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
    const [state, _setState] = useState(false)

    return Content({ state })
}

type Props = {
    state: boolean
}
export function Content({ state }: Props): VNode {
    if (state) {
        return html`true`
    } else {
        return html`false`
    }
}
