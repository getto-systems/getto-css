import { ApplicationStateAction } from "../../../../z_vendor/getto-application/action/action"

import { FindAllVersionMethod } from "../../find_all/method"

import { FindAllVersionEvent } from "../../find_all/event"

export type FindAllVersionCoreAction = ApplicationStateAction<FindAllVersionCoreState>

export type FindAllVersionMaterial = Readonly<{
    find: FindAllVersionMethod
}>

export type FindAllVersionCoreState =
    | Readonly<{ type: "initial-all-version" }>
    | FindAllVersionEvent

export const initialFindAllVersionCoreState: FindAllVersionCoreState = {
    type: "initial-all-version",
}
