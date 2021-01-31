export type Version = string & { Version: never }
export function markVersion(version: string): Version {
    return version as Version
}
export type AllVersions = VersionInfo[]
export type VersionInfo = Readonly<{
    version: Version
    isCurrent: boolean
}>

export type FindError =
    | Readonly<{ type: "server-error" }>
    | Readonly<{ type: "infra-error"; err: string }>
