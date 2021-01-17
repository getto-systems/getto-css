import { initCredentialAction, initMenuAction } from "../../../auth/Outline/Menu/tests/core"

import { detectMenuTarget } from "../../../auth/Outline/Menu/impl/location"
import { MenuBadgeSimulator } from "../../../auth/permission/menu/impl/client/menuBadge/simulate"

import { ExampleCollector, ExampleFactory, initExampleResource } from "../impl/core"

import { initBreadcrumbListComponent } from "../../../auth/Outline/breadcrumbList/impl"
import { initMenuListComponent } from "../../../auth/Outline/menuList/impl"

import { ApiCredentialRepository } from "../../../auth/common/credential/infra"
import { MenuExpandRepository, MenuTree } from "../../../auth/permission/menu/infra"

import { ExampleResource } from "../view"

export type ExampleRepository = Readonly<{
    apiCredentials: ApiCredentialRepository
    menuExpands: MenuExpandRepository
}>
export type ExampleSimulator = Readonly<{
    menuBadge: MenuBadgeSimulator
}>
export function newExampleResource(
    version: string,
    currentURL: URL,
    menuTree: MenuTree,
    repository: ExampleRepository,
    simulator: ExampleSimulator
): ExampleResource {
    const factory: ExampleFactory = {
        actions: {
            credential: initCredentialAction(repository.apiCredentials),
            menu: initMenuAction(menuTree, repository.menuExpands, simulator.menuBadge),
        },
        components: {
            menuList: initMenuListComponent,
            breadcrumbList: initBreadcrumbListComponent,
        },
    }
    const collector: ExampleCollector = {
        menu: {
            getMenuTarget: () => detectMenuTarget(version, currentURL),
        },
    }

    return initExampleResource(factory, collector)
}