import { render, h } from "preact"

import { newExampleView } from "../../../../theme/action_examples/init"

import { ExamplesEntry } from "../../../../theme/action_examples/x_preact/examples"
import { SearchContainerComponent } from "../../../../theme/action_examples/x_preact/examples/search/container"

import "../../../../../css/getto.css"

render(
    h(
        ExamplesEntry({ title: "Search", component: SearchContainerComponent }),
        newExampleView({ webStorage: localStorage, currentLocation: location }),
    ),
    document.body,
)
