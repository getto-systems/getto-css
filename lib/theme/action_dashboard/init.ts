import { newBaseResource } from "../action_base/init"
import { newFindAllVersionResource } from "../../avail/version/action_find_all/init"
import { newGetCurrentVersionResource } from "../../avail/version/action_get_current/init"

import { initDashboardView } from "./impl"

import { DashboardView } from "./resource"

import { LocationOutsideFeature } from "../../z_vendor/getto-application/location/infra"
import { RepositoryOutsideFeature } from "../../z_vendor/getto-application/infra/repository/infra"

type OutsideFeature = LocationOutsideFeature & RepositoryOutsideFeature
export function newDashboardView(feature: OutsideFeature): DashboardView {
    return initDashboardView({
        ...newBaseResource(feature),
        ...newFindAllVersionResource(),
        ...newGetCurrentVersionResource(),
    })
}
