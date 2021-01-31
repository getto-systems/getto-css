import { MockComponent } from "../../../z_external/getto-example/component/mock"

import { initBreadcrumbListComponent } from "../../../auth/Outline/breadcrumbList/mock"
import { initMenuListComponent } from "../../../auth/Outline/menuList/mock"
import { initHowToUseComponent } from "../howToUse/mock"

import { DashboardEntryPoint } from "./view"

import { BreadcrumbListState, initialBreadcrumbListState } from "../../../auth/Outline/breadcrumbList/component"
import { initialMenuListState, MenuListState } from "../../../auth/Outline/menuList/component"
import { HowToUseState, initialHowToUseState } from "../howToUse/component"

export function newDashboard(): DashboardMockEntryPoint {
    const resource = {
        menuList: initMenuListComponent(initialMenuListState),
        breadcrumbList: initBreadcrumbListComponent(initialBreadcrumbListState),
        howToUse: initHowToUseComponent(initialHowToUseState),
    }
    return {
        dashboard: {
            resource,
            terminate: () => {
                // mock では特に何もしない
            },
        },
        update: {
            menuList: update(resource.menuList),
            breadcrumbList: update(resource.breadcrumbList),
            howToUse: update(resource.howToUse),
        },
    }
}

export type DashboardMockEntryPoint = Readonly<{
    dashboard: DashboardEntryPoint
    update: Readonly<{
        menuList: Post<MenuListState>
        breadcrumbList: Post<BreadcrumbListState>
        howToUse: Post<HowToUseState>
    }>
}>

function update<S, C extends MockComponent<S>>(component: C): Post<S> {
    return (state) => component.update(state)
}

interface Post<T> {
    (state: T): void
}
