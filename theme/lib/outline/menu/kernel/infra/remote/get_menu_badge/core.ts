import { initApi_GetMenuBadge } from "../../../../../../z_external/api/outline/get_menu_badge"
import { wrapRemote } from "../../../../../../z_vendor/getto-application/infra/remote/helper"

import { GetMenuBadgeRemotePod } from "../../../infra"

export function newGetMenuBadgeRemote(): GetMenuBadgeRemotePod {
    return wrapRemote(initApi_GetMenuBadge("url"), (err) => ({
        type: "infra-error",
        err: `${err}`,
    }))
}
