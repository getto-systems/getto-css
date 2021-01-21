import { h, VNode } from "preact"

import {
    appMenu,
    menuBox,
    menuFooter,
    menuHeader,
} from "../../../z_external/css/getto/preact/layout/app"
import { form } from "../../../z_external/css/getto/preact/design/form"

import { siteInfo } from "../../common/site"

import { MenuList } from "../MenuList"

import { MenuListComponent } from "../../../auth/Outline/menuList/component"

type Props = Readonly<{
    menuList: MenuListComponent
}>
export function MainMenu(props: Props): VNode {
    return appMenu([
        menuHeader(siteInfo()),
        menuBox(globalInformation()),
        h(MenuList, props),
        menuFooter(),
    ])
}

function globalInformation(): VNode {
    return form({ title: "information", body: "global state", help: [] })
}
