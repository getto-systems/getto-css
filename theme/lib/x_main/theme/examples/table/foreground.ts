import "../../../../theme/css"
import { render, h } from "preact"

import { newExampleView } from "../../../../theme/action_examples/init"

import { ExamplesEntry } from "../../../../theme/action_examples/x_preact/examples"
import { TableContainerComponent } from "../../../../theme/action_examples/x_preact/examples/table/container"

render(
    h(
        ExamplesEntry({ title: "Table", component: TableContainerComponent }),
        newExampleView({ webStorage: localStorage, currentLocation: location }),
    ),
    document.body,
)
