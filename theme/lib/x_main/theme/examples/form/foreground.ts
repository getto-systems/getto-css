import "../../../../theme/css"
import { render, h } from "preact"

import { newExampleView } from "../../../../theme/action_examples/init"

import { ExamplesEntry } from "../../../../theme/action_examples/x_preact/examples"
import { FormContainerComponent } from "../../../../theme/action_examples/x_preact/examples/form/container"

render(
    h(
        ExamplesEntry({ title: "Form", component: FormContainerComponent }),
        newExampleView({ webStorage: localStorage, currentLocation: location }),
    ),
    document.body,
)
