import { mockLoadBreadcrumbListResource } from "../../outline/menu/action_load_breadcrumb_list/mock"
import { mockLoadMenuResource } from "../../outline/menu/action_load_menu/mock"

import { docs_example } from "../../theme/docs"

import { DocsResource } from "./resource"

export function mockDocsResource(): DocsResource {
    return {
        ...mockLoadBreadcrumbListResource(),
        ...mockLoadMenuResource(),
        docs: { title: "Docs", contents: [[docs_example]] },
    }
}
