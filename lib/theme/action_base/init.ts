import { homeMenuContent } from "../../outline/menu/kernel/init/home"
import { newLoadBreadcrumbListResource } from "../../outline/menu/action_load_breadcrumb_list/init"
import { newLoadMenuResource } from "../../outline/menu/action_load_menu/init"

import { BaseResource } from "./resource"

type OutsideFeature = Readonly<{
    webStorage: Storage
    currentLocation: Location
}>
export function newBaseResource(feature: OutsideFeature): BaseResource {
    const menu = homeMenuContent()
    return {
        ...newLoadBreadcrumbListResource(feature, menu),
        ...newLoadMenuResource(feature, menu),
    }
}
