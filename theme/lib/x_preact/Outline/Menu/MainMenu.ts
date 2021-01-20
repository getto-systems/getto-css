import { h, VNode } from "preact"

import { appMenu, menuBox, menuFooter, menuHeader, form } from "../../common/style"

import { MenuList } from "../MenuList"

import { MenuListComponent } from "../../../auth/Outline/menuList/component"

type Props = Readonly<{
    menuList: MenuListComponent
}>
export function MainMenu(props: Props): VNode {
    return appMenu([menuHeader(), menuBox(globalInformation()), h(MenuList, props), menuFooter()])
}

function globalInformation(): VNode {
    return form({ title: "information", body: "global state", help: [] })
}
