import { env } from "../../../../y_environment/env"
import { lnir } from "../../../../z_details/icon/line_icon"
import { MenuContent, MenuPermission } from "../infra"
import { category, item } from "./common"

export function homeMenuContent(): MenuContent {
    return {
        database: env.database.menuExpand,
        key: "home",
        loadMenuBadge: true,
        menuTree: [
            category("MAIN", allow, [
                item("ホーム", lnir("home"), "/index.html"),
                item("ドキュメント", lnir("files-alt"), "/docs/index.html"),
                item("Storybook", lnir("files-alt"), "/storybook/index.html"),
            ]),
            category("EXAMPLES", allow, [
                item("form", lnir("book"), "/theme/examples/form.html"),
                item("sidebar", lnir("book"), "/theme/examples/sidebar.html"),
                item("sidebar double", lnir("book"), "/theme/examples/sidebar-double.html"),
                item("search", lnir("book"), "/theme/examples/search.html"),
                item("data", lnir("book"), "/theme/examples/data.html"),
                item("table", lnir("book"), "/theme/examples/table.html"),
                item("report", lnir("book"), "/theme/examples/report.html"),
                item("highlight", lnir("book"), "/theme/examples/highlight.html"),
                item("alignment", lnir("book"), "/theme/examples/alignment.html"),
                category("LOGIN", allow, [
                    item("not found", lnir("book"), "/theme/examples/login/not-found.html"),
                    item("error", lnir("book"), "/theme/examples/login/error.html"),
                    item("loading", lnir("book"), "/theme/examples/login/loading.html"),
                    item("login", lnir("book"), "/theme/examples/login/login.html"),
                    item("forget", lnir("book"), "/theme/examples/login/forget.html"),
                ]),
            ]),
        ],
    }
}

const allow: MenuPermission = { type: "allow" }
