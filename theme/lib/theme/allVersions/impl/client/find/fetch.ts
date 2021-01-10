import { FindClient, FindResponse } from "../../../infra"

export function initFetchFindClient(): FindClient {
    return new FetchFindClient()
}

class FetchFindClient implements FindClient {
    async find(): Promise<FindResponse> {
        try {
            const response = await fetch("/versions.txt")
            if (!response.ok) {
                if (response.status === 404) {
                    return { success: true, found: false }
                }
                return { success: false, err: { type: "server-error" } }
            }

            const content = await response.text()
            const versions = content
                .split("\n")
                .map((version) => version.trim())
                .filter((version) => version != "")

            return { success: true, found: true, versions }
        } catch (err) {
            return { success: false, err: { type: "infra-error", err: `${err}` } }
        }
    }
}
