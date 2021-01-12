import { StaticMenuPath } from "../../../../y_static/path"

import { Icon, iconClass, lnir } from "../../../../z_external/icon"

import { MenuPermission, MenuTree, MenuTreeNode } from "../../../permission/menu/infra"

function category(label: string, permission: MenuPermission, children: MenuTree): MenuTreeNode {
    return { type: "category", category: { label, permission }, children }
}
const any: MenuPermission = { type: "any" }

function item(label: string, icon: Icon, path: StaticMenuPath): MenuTreeNode {
    return { type: "item", item: { label, icon: iconClass(icon), path } }
}

export const mainMenuTree = (): MenuTree => [
    category("MAIN", any, [
        item("ホーム", lnir("home"), "/index.html"),
        item("ドキュメント", lnir("files-alt"), "/docs/index.html"),
    ]),
    category("EXAMPLES", any, [
        item("form", lnir("book"), "/examples/form.html"),
        item("misc", lnir("book"), "/examples/misc.html"),
    ]),
]

export const documentMenuTree = (): MenuTree => [
    category("MAIN", any, [
        item("ホーム", lnir("home"), "/index.html"),
        item("ドキュメント", lnir("files-alt"), "/docs/index.html"),
    ]),
    category("開発用", any, [
        item("Storybook", lnir("files-alt"), "/storybook/index.html"),
    ]),
]
