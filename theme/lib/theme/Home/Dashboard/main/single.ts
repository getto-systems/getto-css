import { env } from "../../../../y_static/env"

import { delayed } from "../../../../z_infra/delayed/core"

import { DashboardCollector, DashboardFactory, initDashboardResource } from "../impl/core"

import { detectMenuTarget } from "../../../../auth/Outline/Menu/impl/location"

import { initFetchFindClient } from "../../../allVersions/impl/client/find/fetch"

import { initMenuListComponent } from "../../../../auth/Outline/menuList/impl"
import { initBreadcrumbListComponent } from "../../../../auth/Outline/breadcrumbList/impl"
import { initHowToUseComponent } from "../../howToUse/impl"

import { initCredentialAction, initMainMenuAction } from "../../../../auth/Outline/Menu/main/core"

import { find } from "../../../allVersions/impl/core"

import { DashboardEntryPoint } from "../view"

export function newDashboardAsSingle(): DashboardEntryPoint {
    const menuExpandStorage = localStorage
    const currentURL = new URL(location.toString())

    const factory: DashboardFactory = {
        actions: {
            credential: initCredentialAction(),
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
    return {
        resource: initDashboardResource(factory, collector),
        terminate: () => {
            // worker とインターフェイスを合わせるために必要
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
