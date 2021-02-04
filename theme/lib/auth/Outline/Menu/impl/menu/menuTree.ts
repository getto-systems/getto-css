import { StaticMenuPath } from "../../../../../y_static/path"

import { Icon, iconClass, lnir } from "../../../../../z_vendor/icon"

import { MenuPermission, MenuTree, MenuTreeNode } from "../../../../permission/menu/infra"

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
        item("Storybook", lnir("files-alt"), "/storybook/index.html"),
    ]),
    category("EXAMPLES", any, [
        item("form", lnir("book"), "/examples/form.html"),
        item("sidebar", lnir("book"), "/examples/sidebar.html"),
        item("sidebar double", lnir("book"), "/examples/sidebarDouble.html"),
        item("search", lnir("book"), "/examples/search.html"),
        item("data", lnir("book"), "/examples/data.html"),
        item("table", lnir("book"), "/examples/table.html"),
        item("report", lnir("book"), "/examples/report.html"),
        item("highlight", lnir("book"), "/examples/highlight.html"),
        item("alignment", lnir("book"), "/examples/alignment.html"),
        category("LOGIN", any, [
            item("not found", lnir("book"), "/examples/login/notFound.html"),
            item("error", lnir("book"), "/examples/login/error.html"),
            item("loading", lnir("book"), "/examples/login/loading.html"),
            item("login", lnir("book"), "/examples/login/login.html"),
            item("forget", lnir("book"), "/examples/login/forget.html"),
        ]),
    ]),
]

export const documentMenuTree = (): MenuTree => [
    category("MAIN", any, [
        item("ホーム", lnir("home"), "/index.html"),
        item("ドキュメント", lnir("files-alt"), "/docs/index.html"),
        item("Storybook", lnir("files-alt"), "/storybook/index.html"),
    ]),
]
