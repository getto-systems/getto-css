import { VNodeContent } from "../../z_external/getto-example/preact/common"

import { PagerOptionsContent, SortSign } from "../../z_external/getto-css/preact/design/data"

import { icon } from "./icon"

export const sortSign: SortSign = {
    normal: icon("angle-double-down"),
    reverse: icon("angle-double-up"),
}

export function pagerCount(all: number): VNodeContent {
    return `全 ${numberFormat(all)} 件中`
}
export function pagerParams(all: number): PagerOptionsContent {
    return {
        all,
        step: 1000,
        content: ({ start, end }) => `${numberFormat(start)} ～ ${numberFormat(end)} 件`,
    }
}
function numberFormat(count: number) {
    return Intl.NumberFormat("ja-JP").format(count)
}
