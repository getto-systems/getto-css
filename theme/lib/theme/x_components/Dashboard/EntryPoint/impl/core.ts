import { DashboardResource } from "../entryPoint"

import { MenuListComponentFactory } from "../../../../../auth/x_components/Outline/menuList/component"
import { BreadcrumbListComponentFactory } from "../../../../../auth/x_components/Outline/breadcrumbList/component"

import { HowToUseComponentFactory } from "../../howToUse/component"

import { MenuAction, MenuTargetCollector } from "../../../../../auth/permission/menu/action"
import { AllVersionsAction } from "../../../../allVersions/action"

export type DashboardFactory = Readonly<{
    actions: Readonly<{
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
