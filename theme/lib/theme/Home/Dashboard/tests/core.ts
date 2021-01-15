import { initCredentialAction, initMenuAction } from "../../../../auth/Outline/Menu/tests/core"

import { detectMenuTarget } from "../../../../auth/Outline/Menu/impl/location"
import { MenuBadgeSimulator } from "../../../../auth/permission/menu/impl/client/menuBadge/simulate"
import { FindSimulator, initSimulateFindClient } from "../../../allVersions/impl/client/find/simulate"

import { DashboardCollector, DashboardFactory, initDashboardResource } from "../impl/core"

import { delayed } from "../../../../z_infra/delayed/core"
import { find } from "../../../allVersions/impl/core"

import { initBreadcrumbListComponent } from "../../../../auth/Outline/breadcrumbList/impl"
import { initMenuListComponent } from "../../../../auth/Outline/menuList/impl"
import { initHowToUseComponent } from "../../howToUse/impl"

import { ApiCredentialRepository } from "../../../../auth/common/credential/infra"
import { MenuExpandRepository, MenuTree } from "../../../../auth/permission/menu/infra"
import { AllVersionsActionConfig } from "../../../allVersions/infra"

import { DashboardResource } from "../view"

import { AllVersionsAction } from "../../../allVersions/action"

export type DashboardConfig = Readonly<{
    allVersions: AllVersionsActionConfig
}>
export type DashboardRepository = Readonly<{
    apiCredentials: ApiCredentialRepository
    menuExpands: MenuExpandRepository
}>
export type DashboardSimulator = Readonly<{
    menuBadge: MenuBadgeSimulator
    find: FindSimulator
}>
export function newDashboardResource(
    version: string,
    currentURL: URL,
    menuTree: MenuTree,
    config: DashboardConfig,
    repository: DashboardRepository,
    simulator: DashboardSimulator
): DashboardResource {
    const factory: DashboardFactory = {
        actions: {
            credential: initCredentialAction(repository.apiCredentials),
            menu: initMenuAction(menuTree, repository.menuExpands, simulator.menuBadge),
            allVersions: initAllVersionsAction(version, config.allVersions, simulator.find),
        },
        components: {
            menuList: initMenuListComponent,
            breadcrumbList: initBreadcrumbListComponent,

            howToUse: initHowToUseComponent,
        },
    }
    const collector: DashboardCollector = {
        menu: {
            getMenuTarget: () => detectMenuTarget(version, currentURL),
        },
    }

    return initDashboardResource(factory, collector)
}

function initAllVersionsAction(
    version: string,
    config: AllVersionsActionConfig,
    simulator: FindSimulator
): AllVersionsAction {
    const infra = {
        currentVersion: version,
        config: config.find,
        find: initSimulateFindClient(simulator),
        delayed,
    }
    return {
        find: find(infra),
    }
}
