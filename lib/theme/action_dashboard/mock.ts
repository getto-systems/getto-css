import { mockFindAllVersionResource } from "../../avail/version/action_find_all/mock"
import { mockGetCurrentVersionResource } from "../../avail/version/action_get_current/mock"
import { mockBaseResource } from "../action_base/mock"

import { DashboardResource } from "./resource"

export function mockDashboardResource(): DashboardResource {
    return {
        ...mockBaseResource(),
        ...mockFindAllVersionResource(),
        ...mockGetCurrentVersionResource(),
    }
}
