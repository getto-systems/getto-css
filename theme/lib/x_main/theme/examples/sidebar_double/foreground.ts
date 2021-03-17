import "../../../../theme/css"
import { render, h } from "preact"

import { newExampleView } from "../../../../theme/action_examples/init"

import { ExamplesSidebarDoubleEntry } from "../../../../theme/action_examples/x_preact/examples_sidebar_double"
import { SidebarDoubleContainerComponent } from "../../../../theme/action_examples/x_preact/examples/sidebar_double/container"
import { SidebarDoublePagerComponent } from "../../../../theme/action_examples/x_preact/examples/sidebar_double/sidebar/pager"
import { SidebarDoubleTableComponent } from "../../../../theme/action_examples/x_preact/examples/sidebar_double/sidebar/table"

render(
    h(
        ExamplesSidebarDoubleEntry({
            title: "Sidebar Double",
            component: SidebarDoubleContainerComponent,
            sidebar: {
                title: "List",
                body: [
                    { isGrow: false, component: SidebarDoublePagerComponent },
                    { isGrow: true, component: SidebarDoubleTableComponent },
                ],
            },
        }),
        newExampleView({ webStorage: localStorage, currentLocation: location }),
    ),
    document.body,
)
