import { Delayed } from "../../z_infra/delayed/infra"
import { DelayTime } from "../../z_infra/time/infra"

import { FindError } from "./data"

export type AllVersionsActionConfig = Readonly<{
    find: FindConfig
}>

export type FindInfra = Readonly<{
    currentVersion: string
    config: FindConfig
    find: FindClient
    delayed: Delayed
}>

export type FindConfig = Readonly<{
    delay: DelayTime
}>

export interface FindClient {
    find(): Promise<FindResponse>
}

export type FindResponse =
    | Readonly<{ success: false; err: FindError }>
    | Readonly<{ success: true; found: false }>
    | Readonly<{ success: true; found: true; versions: string[] }>
