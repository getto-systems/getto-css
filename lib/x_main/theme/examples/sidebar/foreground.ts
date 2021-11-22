import "../../../../theme/css"
import { render, h } from "preact"

import { foregroundOutsideFeature } from "../../../x_outside_feature/common"

import { newExampleView } from "../../../../theme/action_examples/init"

import { ExamplesSidebarEntry } from "../../../../theme/action_examples/x_preact/examples_sidebar"
import { SidebarContainerComponent } from "../../../../theme/action_examples/x_preact/examples/sidebar/container"
import { SidebarPagerComponent } from "../../../../theme/action_examples/x_preact/examples/sidebar/sidebar/pager"
import { SidebarTableComponent } from "../../../../theme/action_examples/x_preact/examples/sidebar/sidebar/table"

render(
    h(ExamplesSidebarEntry, {
        view: newExampleView(foregroundOutsideFeature()),
        content: {
            title: "Sidebar",
            component: SidebarContainerComponent,
            sidebar: {
                title: "List",
                body: [
                    { component: SidebarPagerComponent },
                    { component: SidebarTableComponent },
                ],
            },
        },
    }),
    document.body,
)
