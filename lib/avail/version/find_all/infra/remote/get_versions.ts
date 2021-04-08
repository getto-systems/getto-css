import { newApi_GetVersions } from "../../../../../z_details/api/avail/get_versions"

import { convertRemote } from "../../../../../z_vendor/getto-application/infra/remote/helper"

import { GetVersionsRemotePod } from "../../infra"

export function newGetVersionsRemote(): GetVersionsRemotePod {
    return convertRemote(newApi_GetVersions())
}
