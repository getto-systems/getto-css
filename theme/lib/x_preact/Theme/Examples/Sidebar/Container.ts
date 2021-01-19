import { h, VNode } from "preact"
import { html } from "htm/preact"

import { Box } from "./Box"
import { Table } from "./Table"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
    return html`${h(Box, NO_PROPS)} ${h(Table, NO_PROPS)}`
}

const NO_PROPS = {}
