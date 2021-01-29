import { h, VNode } from "preact"
import { useMemo } from "preact/hooks"
import { html } from "htm/preact"

import { sortSign } from "../../../common/data"

import { visibleAll } from "../../../../z_external/getto-table/preact/core"

import { container } from "../../../../z_external/getto-css/preact/design/box"
import { Sort, sortLink } from "../../../../z_external/getto-css/preact/design/data"

import { Pager } from "./Pager"
import { ViewColumns } from "./ViewColumns"
import { buildStructure, Table } from "./Table"

import { generateRows, Model, Row } from "./data"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
    const sort: Sort = {
        key: "id",
        order: "normal",
        href: (query) => `?sort=${query.key}.${query.order}`,
        sign: sortSign,
    }
    const structure = useMemo(buildStructure(sortLink(sort)), [])

    const model: Model = {
        alarmMaxLength: 3,
    }

    const params = {
        visibleKeys: visibleAll,
        model,
    }

    const content = {
        sticky: structure.sticky(),
        view: structure.view(params),
        header: structure.header(params),
    }
    const tableProps = {
        content,
        rows: generateRows(),
        column: (row: Row) => structure.column(params, row),
    }

    return html` ${container([h(Pager, NO_PROPS), h(ViewColumns, content)])} ${h(Table, tableProps)} `
}

const NO_PROPS = {}
