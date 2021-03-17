import { render, h } from "preact"

import { newExampleView } from "../../../../theme/action_examples/init"

import { ExamplesEntry } from "../../../../theme/action_examples/x_preact/examples"
import { SidebarDoubleContainerComponent } from "../../../../theme/action_examples/x_preact/examples/sidebar_double/container"

import "../../../../../css/getto.css"

render(
    h(
        ExamplesEntry({ title: "Sidebar Double", component: SidebarDoubleContainerComponent }),
        newExampleView({ webStorage: localStorage, currentLocation: location }),
    ),
    document.body,
)
