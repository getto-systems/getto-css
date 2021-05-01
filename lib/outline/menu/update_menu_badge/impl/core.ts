import { menuBadgeRemoteConverter } from "../../kernel/impl/converter"

import { buildMenu, BuildMenuParams } from "../../kernel/impl/menu"

import { initMenuExpand, MenuBadge } from "../../kernel/infra"
import { UpdateMenuBadgeInfra, UpdateMenuBadgeStore } from "../infra"

import { UpdateMenuBadgePod } from "../method"

import { UpdateMenuBadgeEvent } from "../event"

interface Update {
    (infra: UpdateMenuBadgeInfra, store: UpdateMenuBadgeStore): UpdateMenuBadgePod
}
export const updateMenuBadge: Update = (infra, store) => (detecter) => async (post) => {
    const getMenuBadge = infra.getMenuBadge(menuBadgeRemoteConverter)

    const fetchResult = store.menuExpand.get()
    const expand = fetchResult.found ? fetchResult.value : initMenuExpand()

    const buildParams: BuildMenuParams = {
        version: infra.version,
        menuExpand: expand,
        menuTargetPath: detecter(),
        menuTree: infra.menuTree,
        menuBadge: EMPTY_BADGE,
    }

    // デモンストレーションなので固定 nonce を使用
    const response = await getMenuBadge("nonce")
    if (!response.success) {
        return post({ type: "failed-to-update", menu: buildMenu(buildParams), err: response.err })
    }

    store.menuBadge.set(response.value)

    return post({
        type: "succeed-to-update",
        menu: buildMenu({ ...buildParams, menuBadge: response.value }),
    })
}

export function updateMenuBadgeEventHasDone(_event: UpdateMenuBadgeEvent): boolean {
    return true
}

const EMPTY_BADGE: MenuBadge = new Map()
