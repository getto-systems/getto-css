import "../../../../theme/css"
import { render, h } from "preact"

import { newExampleView } from "../../../../theme/action_examples/init"

import { ExamplesEntry } from "../../../../theme/action_examples/x_preact/examples"
import { HighlightContainerComponent } from "../../../../theme/action_examples/x_preact/examples/highlight/container"

render(
    h(
        ExamplesEntry({ title: "Highlight", component: HighlightContainerComponent }),
        newExampleView({ webStorage: localStorage, currentLocation: location }),
    ),
    document.body,
)
