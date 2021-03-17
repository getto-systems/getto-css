import { render, h } from "preact"

import { newExampleView } from "../../../../theme/action_examples/init"

import { ExamplesEntry } from "../../../../theme/action_examples/x_preact/examples"
import { SidebarContainerComponent } from "../../../../theme/action_examples/x_preact/examples/sidebar/container"

import "../../../../../css/getto.css"

render(
    h(
        ExamplesEntry({ title: "Sidebar", component: SidebarContainerComponent }),
        newExampleView({ webStorage: localStorage, currentLocation: location }),
    ),
    document.body,
)
