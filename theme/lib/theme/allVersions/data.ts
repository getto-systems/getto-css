export type Version = string & { Version: never }
export function markVersion(version: string): Version {
    return version as Version
}
export type AllVersions = VersionInfo[]
export type VersionInfo = Readonly<{
    version: Version
    isCurrent: boolean
}>

export type FindEvent =
    | Readonly<{ type: "try-to-find"; currentVersion: Version }>
    | Readonly<{ type: "delayed-to-find"; currentVersion: Version }>
    | Readonly<{ type: "failed-to-find"; err: FindError; currentVersion: Version }>
    | Readonly<{ type: "succeed-to-find"; versions: AllVersions; currentVersion: Version }>

export type FindError =
    | Readonly<{ type: "server-error" }>
    | Readonly<{ type: "infra-error"; err: string }>
