import { h, VNode } from "preact"

import { appMenu, menuBox, menuFooter, menuHeader } from "../../common/layout"

import { MenuList } from "../MenuList"

import { MenuListComponent } from "../../../auth/Outline/menuList/component"
import { form } from "../../Document/box"

type Props = Readonly<{
    menuList: MenuListComponent
}>
export function MainMenu(props: Props): VNode {
    return appMenu([menuHeader(), menuBox(globalInformation()), h(MenuList, props), menuFooter()])
}

function globalInformation(): VNode {
    return form("information", "global state")
}
