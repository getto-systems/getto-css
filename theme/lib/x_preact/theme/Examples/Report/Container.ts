import { h, VNode } from "preact"
import { useMemo } from "preact/hooks"

import { buildStructure, Content } from "./Content"
import { generateRows, Model, Row } from "./data"
import { visibleAll } from "../../../../z_vendor/getto-table/preact/core"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
    const structure = useMemo(buildStructure, [])

    const model: Model = {
        sumPrice: 6200,
    }

    const params = {
        visibleKeys: visibleAll,
        model,
    }

    const content = {
        sticky: structure.sticky(),
        view: structure.view(params),
        header: structure.header(params),
        summary: structure.summary(params),
        footer: structure.footer(params),
    }
    const contentProps = {
        content,
        rows: generateRows(),
        column: (row: Row) => structure.column(params, row),
    }

    return h(Content, contentProps)
}
