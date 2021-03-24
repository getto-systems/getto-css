import "../../../../theme/css"
import { render, h } from "preact"

import { newExampleView } from "../../../../theme/action_examples/init"

import { ExamplesEntry } from "../../../../theme/action_examples/x_preact/examples"
import { HighlightContainerComponent } from "../../../../theme/action_examples/x_preact/examples/highlight/container"

render(
    h(ExamplesEntry, {
        view: newExampleView({ webStorage: localStorage, currentLocation: location }),
        content: { title: "Highlight", component: HighlightContainerComponent },
    }),
    document.body,
)
