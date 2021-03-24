import "../../../../theme/css"
import { render, h } from "preact"

import { newExampleView } from "../../../../theme/action_examples/init"

import { ExamplesEntry } from "../../../../theme/action_examples/x_preact/examples"
import { DataContainerComponent } from "../../../../theme/action_examples/x_preact/examples/data/container"

render(
    h(ExamplesEntry, {
        view: newExampleView({ webStorage: localStorage, currentLocation: location }),
        content: { title: "Data", component: DataContainerComponent },
    }),
    document.body,
)
