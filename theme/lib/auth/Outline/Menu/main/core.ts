import { env } from "../../../../y_static/env"

import { initStaticMenuBadgeClient } from "../../../permission/menu/impl/remote/menuBadge/static"
import { documentMenuTree, mainMenuTree } from "../impl/menu/menuTree"

import { loadBreadcrumb, loadMenu, toggleMenuExpand } from "../../../permission/menu/impl/core"

import { MenuAction } from "../../../permission/menu/action"

import { initNoopMenuBadgeClient } from "../../../permission/menu/impl/remote/menuBadge/noop"
import { MenuBadgeClient, MenuTree } from "../../../permission/menu/infra"
import { initMenuExpandRepository } from "../../../permission/menu/impl/repository/menuExpand"
import { initMenuExpandConverter } from "../../../permission/menu/impl/repository/converter"
import { initWebTypedStorage } from "../../../../z_infra/storage/webStorage"

export function initMainMenuAction(menuExpandStorage: Storage): MenuAction {
    return initMenuAction(
        mainMenuTree(),
        menuExpandStorage,
        initStaticMenuBadgeClient({
            "/index.html": 50,
        })
    )
}
export function initDocumentMenuAction(menuExpandStorage: Storage): MenuAction {
    return initMenuAction(documentMenuTree(), menuExpandStorage, initNoopMenuBadgeClient())
}
function initMenuAction(
    menuTree: MenuTree,
    menuExpandStorage: Storage,
    menuBadge: MenuBadgeClient
): MenuAction {
    const menuExpands = initMenuExpandRepository({
        menuExpand: initWebTypedStorage(
            menuExpandStorage,
            env.storageKey.menuExpand.main,
            initMenuExpandConverter()
        ),
    })

    return {
        loadBreadcrumb: loadBreadcrumb({ menuTree }),
        loadMenu: loadMenu({ menuTree, menuBadge, menuExpands }),
        toggleMenuExpand: toggleMenuExpand({ menuExpands }),
    }
}
