import { RemoteTypes } from "../../../z_vendor/getto-application/infra/remote/infra"
import { DelayTime } from "../../../z_vendor/getto-application/infra/config/infra"

import { GetVersionsRemoteError, VersionInfo } from "./data"

export type FindAllVersionInfra = Readonly<{
    version: string
    versionsURL: string
    get: GetVersionsRemotePod
    config: Readonly<{
        takeLongtimeThreshold: DelayTime
    }>
}>

type GetVersionsRemoteTypes = RemoteTypes<
    VersionsURL,
    VersionInfo[],
    GetVersionsResponse,
    GetVersionsRemoteError
>
export type GetVersionsRemotePod = GetVersionsRemoteTypes["pod"]
export type GetVersionsRemote = GetVersionsRemoteTypes["remote"]
export type GetVersionsRemoteResult = GetVersionsRemoteTypes["result"]
export type GetVersionsSimulator = GetVersionsRemoteTypes["simulator"]

export type VersionsURL = string
export type GetVersionsResponse = Readonly<{ versions: string[] }>
