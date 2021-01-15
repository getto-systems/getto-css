import { DashboardResource } from "../view"

import { MenuListComponentFactory } from "../../../../auth/Outline/menuList/component"
import { BreadcrumbListComponentFactory } from "../../../../auth/Outline/breadcrumbList/component"

import { HowToUseComponentFactory } from "../../howToUse/component"

import { CredentialAction } from "../../../../auth/common/credential/action"
import { MenuAction, MenuTargetCollector } from "../../../../auth/permission/menu/action"
import { AllVersionsAction } from "../../../allVersions/action"

export type DashboardFactory = Readonly<{
    actions: Readonly<{
        credential: CredentialAction
        menu: MenuAction
        allVersions: AllVersionsAction
    }>
    components: Readonly<{
        menuList: MenuListComponentFactory
        breadcrumbList: BreadcrumbListComponentFactory

        howToUse: HowToUseComponentFactory
    }>
}>
export type DashboardCollector = Readonly<{
    menu: MenuTargetCollector
}>
export function initDashboardResource(
    factory: DashboardFactory,
    collector: DashboardCollector
): DashboardResource {
    const actions = {
        loadApiNonce: factory.actions.credential.loadApiNonce(),
        loadApiRoles: factory.actions.credential.loadApiRoles(),

        find: factory.actions.allVersions.find(),

        loadBreadcrumb: factory.actions.menu.loadBreadcrumb(collector.menu),
        loadMenu: factory.actions.menu.loadMenu(collector.menu),
        toggleMenuExpand: factory.actions.menu.toggleMenuExpand(),
    }
    return {
        menuList: factory.components.menuList(actions),
        breadcrumbList: factory.components.breadcrumbList(actions),

        howToUse: factory.components.howToUse(actions),
    }
}
