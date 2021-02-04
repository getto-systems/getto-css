import { MenuBadgeClient, MenuBadgeResponse, MenuBadge } from "../../../infra"

export function initNoopMenuBadgeClient(): MenuBadgeClient {
    return new NoopMenuBadgeClient()
}

class NoopMenuBadgeClient implements MenuBadgeClient {
    async getBadge(): Promise<MenuBadgeResponse> {
        return { success: true, menuBadge: EMPTY_BADGE }
    }
}

const EMPTY_BADGE: MenuBadge = {}
