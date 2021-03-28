import { ApplicationView } from "../../z_vendor/getto-application/action/action"

import { LoadBreadcrumbListResource } from "../../outline/menu/action_load_breadcrumb_list/resource"
import { LoadMenuResource } from "../../outline/menu/action_load_menu/resource"

export type BaseTypes<R> = {
    view: BaseView<R>
    resource: R & BaseResource
}

export type BaseView<R> = ApplicationView<R & BaseResource>
export type BaseResource = LoadBreadcrumbListResource & LoadMenuResource
