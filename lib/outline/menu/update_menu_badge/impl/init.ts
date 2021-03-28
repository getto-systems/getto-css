import { env } from "../../../../y_environment/env"

import { newGetMenuBadgeRemote } from "../../kernel/infra/remote/get_menu_badge/core"

import { UpdateMenuBadgeInfra } from "../infra"
import { MenuContent } from "../../kernel/infra"
import { newGetMenuBadgeNoopRemote } from "../../kernel/infra/remote/get_menu_badge/noop"

export function newUpdateMenuBadgeInfra(menuContent: MenuContent): UpdateMenuBadgeInfra {
    return {
        version: env.version,
        menuTree: menuContent.menuTree,
        getMenuBadge: menuContent.loadMenuBadge
            ? newGetMenuBadgeRemote()
            : newGetMenuBadgeNoopRemote(),
    }
}
