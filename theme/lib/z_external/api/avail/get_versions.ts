import { ApiResult } from "../data"

type VersionsURL = string

type RemoteResult = ApiResult<RemoteResponse, RemoteError>
type RemoteResponse = Readonly<{ versions: string[] }>
type RemoteError =
    | Readonly<{ type: "server-error" }>
    | Readonly<{ type: "infra-error"; err: string }>

interface GetVersions {
    (url: VersionsURL): Promise<RemoteResult>
}
export function newApi_GetVersions(): GetVersions {
    return async (url: VersionsURL): Promise<RemoteResult> => {
        const response = await fetch(url)
        if (!response.ok) {
            return { success: false, err: { type: "server-error" } }
        }

        const content = await response.text()
        const versions = content
            .split("\n")
            .map((version) => version.trim())
            .filter((version) => version != "")
            .reverse()

        return { success: true, value: { versions } }
    }
}
