import { h, VNode } from "preact"

import { Box } from "./Box"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
    return h(Box, NO_PROPS)
}

const NO_PROPS = {}
