import { newApi_GetMenuBadge } from "../../../../../../z_details/api/outline/get_menu_badge"

import {
    remoteInfraError,
    wrapRemote,
} from "../../../../../../z_vendor/getto-application/infra/remote/helper"

import { GetMenuBadgeRemotePod } from "../../../infra"

export function newGetMenuBadgeRemote(): GetMenuBadgeRemotePod {
    return wrapRemote(newApi_GetMenuBadge(), remoteInfraError)
}
