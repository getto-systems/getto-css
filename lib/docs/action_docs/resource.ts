import { ApplicationView } from "../../z_vendor/getto-application/action/action"

import { LoadBreadcrumbListResource } from "../../outline/menu/action_load_breadcrumb_list/resource"
import { LoadMenuResource } from "../../outline/menu/action_load_menu/resource"

export type DocsView = ApplicationView<DocsResource>

export type DocsResource = LoadBreadcrumbListResource & LoadMenuResource
