export type Version = string & { Version: never }
export function markVersion(version: string): Version {
    return version as Version
}

export type FindEvent = Readonly<{ type: "succeed-to-find"; currentVersion: Version }>
