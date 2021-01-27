import { VNode } from "preact"

export type VNodeContent = VNodeEntry | VNodeEntry[]
type VNodeEntry = string | number | VNode

export type VNodeKey = string | number

export type SiteInfo = Readonly<{
    brand: string
    title: string
    subTitle: string
}>
