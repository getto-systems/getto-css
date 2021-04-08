import { docsMenuContent } from "../../outline/menu/kernel/init/docs"
import { newLoadBreadcrumbListResource } from "../../outline/menu/action_load_breadcrumb_list/init"
import { newLoadMenuResource } from "../../outline/menu/action_load_menu/init"

import { initDocsView } from "./impl"

import { DocsView } from "./resource"
import { LocationOutsideFeature } from "../../z_vendor/getto-application/location/infra"
import { RepositoryOutsideFeature } from "../../z_vendor/getto-application/infra/repository/infra"

type OutsideFeature = LocationOutsideFeature & RepositoryOutsideFeature
export function newDocsView(feature: OutsideFeature): DocsView {
    const menu = docsMenuContent()
    return initDocsView({
        ...newLoadBreadcrumbListResource(feature, menu),
        ...newLoadMenuResource(feature, menu),
    })
}
