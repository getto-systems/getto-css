import { ExampleResource } from "../entryPoint"

import { MenuListComponentFactory } from "../../../auth/Outline/menuList/component"
import { BreadcrumbListComponentFactory } from "../../../auth/Outline/breadcrumbList/component"

import { MenuAction, MenuTargetCollector } from "../../../auth/permission/menu/action"

export type ExampleFactory = Readonly<{
    actions: Readonly<{
        menu: MenuAction
    }>
    components: Readonly<{
        menuList: MenuListComponentFactory
        breadcrumbList: BreadcrumbListComponentFactory
    }>
}>
export type ExampleCollector = Readonly<{
    menu: MenuTargetCollector
}>
export function initExampleResource(
    factory: ExampleFactory,
    collector: ExampleCollector
): ExampleResource {
    const actions = {
        loadBreadcrumb: factory.actions.menu.loadBreadcrumb(collector.menu),
        loadMenu: factory.actions.menu.loadMenu(collector.menu),
        toggleMenuExpand: factory.actions.menu.toggleMenuExpand(),
    }
    return {
        menuList: factory.components.menuList(actions),
        breadcrumbList: factory.components.breadcrumbList(actions),
    }
}
