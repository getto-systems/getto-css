import { VersionString } from "../data"

export type VersionInfo = Readonly<{
    version: VersionString
    isCurrent: boolean
}>

export type GetVersionsError = GetVersionsRemoteError
export type GetVersionsRemoteError =
    | Readonly<{ type: "server-error" }>
    | Readonly<{ type: "infra-error"; err: string }>
