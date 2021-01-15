import { env } from "../../../y_static/env"

import { initMenuListComponent } from "../../../auth/Outline/menuList/impl"
import { initBreadcrumbListComponent } from "../../../auth/Outline/breadcrumbList/impl"
import { detectMenuTarget } from "../../../auth/Outline/Menu/impl/location"

import { loadApiNonce, loadApiRoles } from "../../../auth/common/credential/impl/core"
import { loadBreadcrumb, loadMenu, toggleMenuExpand } from "../../../auth/permission/menu/impl/core"
import { mainMenuTree } from "../../../auth/Outline/Menu/impl/menu/menuTree"
import { ExampleCollector, ExampleFactory, initExampleResource } from "../impl/core"

import { initMemoryApiCredentialRepository } from "../../../auth/common/credential/impl/repository/apiCredential/memory"
import { initSimulateMenuBadgeClient } from "../../../auth/permission/menu/impl/client/menuBadge/simulate"
import { initStorageMenuExpandRepository } from "../../../auth/permission/menu/impl/repository/menuExpand/storage"

import { ExampleEntryPoint } from "../view"

import { markApiNonce, markApiRoles } from "../../../auth/common/credential/data"

export function newExampleAsSingle(): ExampleEntryPoint {
    const menuExpandStorage = localStorage
    const currentURL = new URL(location.toString())

    const factory: ExampleFactory = {
        actions: {
            credential: initCredentialAction(),
            menu: initMenuAction(menuExpandStorage),
        },
        components: {
            menuList: initMenuListComponent,
            breadcrumbList: initBreadcrumbListComponent,
        },
    }
    const collector: ExampleCollector = {
        menu: {
            getMenuTarget: () => detectMenuTarget(env.version, currentURL),
        },
    }
    return {
        resource: initExampleResource(factory, collector),
        terminate: () => {
            // worker とインターフェイスを合わせるために必要
        },
    }
}

function initCredentialAction() {
    const apiCredentials = initMemoryApiCredentialRepository(
        markApiNonce("api-nonce"),
        markApiRoles(["admin"])
    )

    return {
        loadApiNonce: loadApiNonce({ apiCredentials }),
        loadApiRoles: loadApiRoles({ apiCredentials }),
    }
}
function initMenuAction(menuExpandStorage: Storage) {
    const menuTree = mainMenuTree()
    const menuBadge = initSimulateMenuBadgeClient({
        getMenuBadge: async () => {
            return {}
        },
    })
    const menuExpands = initStorageMenuExpandRepository(
        menuExpandStorage,
        env.storageKey.menuExpand.main
    )

    return {
        loadBreadcrumb: loadBreadcrumb({ menuTree }),
        loadMenu: loadMenu({ menuTree, menuBadge, menuExpands }),
        toggleMenuExpand: toggleMenuExpand({ menuExpands }),
    }
}
