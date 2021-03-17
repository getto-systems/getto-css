import { newBaseResource } from "../action_base/init"

import { DashboardView } from "./resource"
import { initDashboardView } from "./impl"
import { newFindAllVersionResource } from "../../avail/version/action_find_all/init"
import { newGetCurrentVersionResource } from "../../avail/version/action_get_current/init"

type OutsideFeature = Readonly<{
    webStorage: Storage
    currentLocation: Location
}>
export function newDashboardView(feature: OutsideFeature): DashboardView {
    return initDashboardView({
        ...newBaseResource(feature),
        ...newFindAllVersionResource(),
        ...newGetCurrentVersionResource(),
    })
}
