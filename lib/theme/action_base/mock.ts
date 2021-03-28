import { mockLoadBreadcrumbListResource } from "../../outline/menu/action_load_breadcrumb_list/mock"
import { mockLoadMenuResource } from "../../outline/menu/action_load_menu/mock"

import { BaseResource } from "./resource"

export function mockBaseResource(): BaseResource {
    return {
        ...mockLoadBreadcrumbListResource(),
        ...mockLoadMenuResource(),
    }
}
