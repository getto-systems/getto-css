import { newApi_GetVersions } from "../../../../../z_details/api/avail/get_versions"

import { wrapRemote } from "../../../../../z_vendor/getto-application/infra/remote/helper"

import { GetVersionsRemotePod } from "../../infra"

export function newGetVersionsRemote(): GetVersionsRemotePod {
    return wrapRemote(newApi_GetVersions(), (err) => ({
        type: "infra-error",
        err: `${err}`,
    }))
}
