import { ApiCommonError, ApiResult } from "../data"
import { apiInfraError } from "../helper"

interface GetVersions {
    (url: string): Promise<GetVersionsResult>
}

type GetVersionsResult = ApiResult<GetVersionsResponse, ApiCommonError>
type GetVersionsResponse = Readonly<{ versions: string[] }>

export function newApi_GetVersions(): GetVersions {
    return async (url): Promise<GetVersionsResult> => {
        try {
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
        } catch (err) {
            return apiInfraError(err)
        }
    }
}
