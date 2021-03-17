import { FindAllVersionResource } from "../../avail/version/action_find_all/resource"
import { GetCurrentVersionResource } from "../../avail/version/action_get_current/resource"
import { BaseTypes } from "../action_base/resource"

type DashboardTypes = BaseTypes<FindAllVersionResource & GetCurrentVersionResource>
export type DashboardView = DashboardTypes["view"]
export type DashboardResource = DashboardTypes["resource"]
