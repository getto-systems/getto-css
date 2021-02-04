import { MenuBadgeClient, MenuBadgeResponse, MenuBadge } from "../../../infra"

export function initSimulateMenuBadgeClient(simulator: MenuBadgeSimulator): MenuBadgeClient {
    return new SimulateMenuBadgeClient(simulator)
}

export interface MenuBadgeSimulator {
    // エラーにする場合は MenuBadgeError を throw する（それ以外だとこわれる）
    getMenuBadge(): Promise<MenuBadge>
}

class SimulateMenuBadgeClient implements MenuBadgeClient {
    simulator: MenuBadgeSimulator

    constructor(simulator: MenuBadgeSimulator) {
        this.simulator = simulator
    }

    async getBadge(): Promise<MenuBadgeResponse> {
        try {
            return { success: true, menuBadge: await this.simulator.getMenuBadge() }
        } catch (err) {
            return { success: false, err }
        }
    }
}
