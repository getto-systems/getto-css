import { h, VNode } from "preact"

import { appMenu, menuBox, menuFooter, menuHeader } from "../../common/layout"

import { MenuList } from "../MenuList"

import { MenuListComponent } from "../../../auth/Outline/menuList/component"

type Props = Readonly<{
    menuList: MenuListComponent
}>
export function MainMenu(props: Props): VNode {
    return appMenu([menuHeader(), menuBox("global information"), h(MenuList, props), menuFooter()])
}
