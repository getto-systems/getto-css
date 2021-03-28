import "../../theme/css"
import { render, h } from "preact"

import { newDashboardView } from "../../theme/action_dashboard/init"

import { DashboardEntry } from "../../theme/action_dashboard/x_preact/dashboard"

render(
    h(
        DashboardEntry,
        newDashboardView({
            webStorage: localStorage,
            currentLocation: location,
        }),
    ),
    document.body,
)
