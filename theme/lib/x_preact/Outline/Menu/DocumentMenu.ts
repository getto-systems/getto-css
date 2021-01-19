import { h, VNode } from "preact"

import { appMenu, menuFooter, menuHeader } from "../../common/layout"

import { MenuList } from "../MenuList"

import { MenuListComponent } from "../../../auth/Outline/menuList/component"

type Props = Readonly<{
    menuList: MenuListComponent
}>
export function DocumentMenu(props: Props): VNode {
    return appMenu([menuHeader(), h(MenuList, props), menuFooter()])
}
