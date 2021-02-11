import { initMenuAction } from "../../../../../auth/x_components/Outline/Menu/tests/core"

import { detectMenuTarget } from "../../../../../auth/x_components/Outline/Menu/impl/location"
import { MenuBadgeSimulator } from "../../../../../auth/permission/menu/impl/remote/menuBadge/simulate"

import { DocumentCollector, DocumentFactory, initDocumentResource } from "../impl/core"

import { initBreadcrumbListComponent } from "../../../../../auth/x_components/Outline/breadcrumbList/impl"
import { initMenuListComponent } from "../../../../../auth/x_components/Outline/menuList/impl"
import { initContentComponent } from "../../content/impl"

import { MenuExpandRepository, MenuTree } from "../../../../../auth/permission/menu/infra"

import { DocumentResource } from "../entryPoint"
import { ContentAction } from "../../../../content/action"
import { loadContent } from "../../../../content/impl/core"
import { detectContentPath } from "../impl/location"

export type DocumentRepository = Readonly<{
    menuExpands: MenuExpandRepository
}>
export type DocumentSimulator = Readonly<{
    menuBadge: MenuBadgeSimulator
}>
export function newDocumentResource(
    version: string,
    currentURL: URL,
    menuTree: MenuTree,
    repository: DocumentRepository,
    simulator: DocumentSimulator
): DocumentResource {
    const factory: DocumentFactory = {
        actions: {
            menu: initMenuAction(menuTree, repository.menuExpands, simulator.menuBadge),
            content: initContentAction(),
        },
        components: {
            menuList: initMenuListComponent,
            breadcrumbList: initBreadcrumbListComponent,

            content: initContentComponent,
        },
    }
    const collector: DocumentCollector = {
        menu: {
            getMenuTarget: () => detectMenuTarget(version, currentURL),
        },
        content: {
            getContentPath: () => detectContentPath(version, currentURL),
        },
    }

    return initDocumentResource(factory, collector)
}

function initContentAction(): ContentAction {
    return {
        loadContent: loadContent(),
    }
}
