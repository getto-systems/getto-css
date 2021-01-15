import { ExampleResource } from "../view"

import { MenuListComponentFactory } from "../../../auth/Outline/menuList/component"
import { BreadcrumbListComponentFactory } from "../../../auth/Outline/breadcrumbList/component"

import { CredentialAction } from "../../../auth/common/credential/action"
import { MenuAction, MenuTargetCollector } from "../../../auth/permission/menu/action"

export type ExampleFactory = Readonly<{
    actions: Readonly<{
        credential: CredentialAction
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
        loadApiNonce: factory.actions.credential.loadApiNonce(),
        loadApiRoles: factory.actions.credential.loadApiRoles(),

        loadBreadcrumb: factory.actions.menu.loadBreadcrumb(collector.menu),
        loadMenu: factory.actions.menu.loadMenu(collector.menu),
        toggleMenuExpand: factory.actions.menu.toggleMenuExpand(),
    }
    return {
        menuList: factory.components.menuList(actions),
        breadcrumbList: factory.components.breadcrumbList(actions),
    }
}
