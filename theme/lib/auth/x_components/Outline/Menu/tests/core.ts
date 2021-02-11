import {
    initSimulateMenuBadgeClient,
    MenuBadgeSimulator,
} from "../../../../permission/menu/impl/remote/menuBadge/simulate"
import { initMemoryTypedStorage, MemoryTypedStorageStore } from "../../../../../z_infra/storage/memory"

import { MenuExpandStorage } from "../../../../permission/menu/impl/repository/menuExpand"

import { detectMenuTarget } from "../impl/location"

import { initBreadcrumbListComponent } from "../../breadcrumbList/impl"
import { initMenuListComponent } from "../../menuList/impl"

import { loadBreadcrumb, loadMenu, toggleMenuExpand } from "../../../../permission/menu/impl/core"

import { MenuExpand, MenuExpandRepository, MenuTree } from "../../../../permission/menu/infra"

import { BreadcrumbListComponent } from "../../breadcrumbList/component"
import { MenuListComponent } from "../../menuList/component"

import { MenuAction } from "../../../../permission/menu/action"

export type MenuResource = Readonly<{
    breadcrumbList: BreadcrumbListComponent
    menuList: MenuListComponent
}>
export type MenuRepository = Readonly<{
    menuExpands: MenuExpandRepository
}>
export type MenuSimulator = Readonly<{
    menuBadge: MenuBadgeSimulator
}>
export function newMenuResource(
    version: string,
    currentURL: URL,
    menuTree: MenuTree,
    repository: MenuRepository,
    simulator: MenuSimulator
): MenuResource {
    const actions = {
        menu: initMenuAction(menuTree, repository.menuExpands, simulator.menuBadge),
    }
    const collector = {
        menu: {
            getMenuTarget: () => detectMenuTarget(version, currentURL),
        },
    }

    return {
        breadcrumbList: initBreadcrumbListComponent({
            loadBreadcrumb: actions.menu.loadBreadcrumb(collector.menu),
        }),
        menuList: initMenuListComponent({
            loadMenu: actions.menu.loadMenu(collector.menu),
            toggleMenuExpand: actions.menu.toggleMenuExpand(),
        }),
    }
}

export function initMenuAction(
    menuTree: MenuTree,
    menuExpands: MenuExpandRepository,
    simulator: MenuBadgeSimulator
): MenuAction {
    const infra = {
        menuTree,
        menuExpands,
        menuBadge: initSimulateMenuBadgeClient(simulator),
    }

    return {
        loadBreadcrumb: loadBreadcrumb(infra),
        loadMenu: loadMenu(infra),
        toggleMenuExpand: toggleMenuExpand(infra),
    }
}

export type MenuExpandTestStorageParam = Readonly<{
    menuExpand: MemoryTypedStorageStore<MenuExpand>
}>
export function initMenuExpandTestStorage(params: MenuExpandTestStorageParam): MenuExpandStorage {
    return {
        menuExpand: initMemoryTypedStorage(params.menuExpand),
    }
}
