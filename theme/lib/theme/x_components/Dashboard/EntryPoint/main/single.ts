import { env } from "../../../../../y_static/env"

import { delayed } from "../../../../../z_infra/delayed/core"

import { DashboardCollector, DashboardFactory, initDashboardResource } from "../impl/core"

import { detectMenuTarget } from "../../../../../auth/x_components/Outline/Menu/impl/location"

import { initFetchFindClient } from "../../../../allVersions/impl/remote/find/fetch"

import { initMenuListComponent } from "../../../../../auth/x_components/Outline/menuList/impl"
import { initBreadcrumbListComponent } from "../../../../../auth/x_components/Outline/breadcrumbList/impl"
import { initHowToUseComponent } from "../../howToUse/impl"

import { initMainMenuAction } from "../../../../../auth/x_components/Outline/Menu/main/core"

import { find } from "../../../../allVersions/impl/core"

import { DashboardEntryPoint } from "../entryPoint"

export function newDashboardAsSingle(): DashboardEntryPoint {
    const menuExpandStorage = localStorage
    const currentURL = new URL(location.toString())

    const factory: DashboardFactory = {
        actions: {
            menu: initMainMenuAction(menuExpandStorage),
            allVersions: initAllVersionsAction(),
        },
        components: {
            menuList: initMenuListComponent,
            breadcrumbList: initBreadcrumbListComponent,

            howToUse: initHowToUseComponent,
        },
    }
    const collector: DashboardCollector = {
        menu: {
            getMenuTarget: () => detectMenuTarget(env.version, currentURL),
        },
    }
    const resource = initDashboardResource(factory, collector)
    return {
        resource,
        terminate: () => {
            resource.breadcrumbList.terminate()
            resource.menuList.terminate()

            resource.howToUse.terminate()
        },
    }
}

function initAllVersionsAction() {
    return {
        find: find({
            currentVersion: env.version,
            config: {
                delay: { delay_millisecond: 300 },
            },
            find: initFetchFindClient(),
            delayed,
        }),
    }
}
