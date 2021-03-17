import "../../../../theme/css"
import { render, h } from "preact"

import { newExampleView } from "../../../../theme/action_examples/init"

import { AlignmentContainerComponent } from "../../../../theme/action_examples/x_preact/examples/alignment/container"
import { ExamplesEntry } from "../../../../theme/action_examples/x_preact/examples"

render(
    h(
        ExamplesEntry({ title: "Alignment", component: AlignmentContainerComponent }),
        newExampleView({ webStorage: localStorage, currentLocation: location }),
    ),
    document.body,
)
