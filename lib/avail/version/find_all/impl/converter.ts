import { versionStringConfigConverter } from "../../converter"

import { GetVersionsResponse } from "../infra"

import { VersionInfo } from "../data"

interface AllVersionConverter {
    (response: GetVersionsResponse): VersionInfo[]
}
export function allVersionsRemoteConverter(currentVersion: string): AllVersionConverter {
    return (response) =>
        response.versions.map((version) => ({
            version: versionStringConfigConverter(version),
            isCurrent: version === currentVersion,
        }))
}
