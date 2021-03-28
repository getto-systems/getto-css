import { FindAllVersionCoreAction, FindAllVersionCoreState } from "./core/action"

export type FindAllVersionResource = Readonly<{
    findAll: FindAllVersionCoreAction
}>
export type FindAllVersionResourceState = Readonly<{
    state: FindAllVersionCoreState
}>
