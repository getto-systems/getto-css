import { render, h } from "preact"

import { newExampleView } from "../../../../theme/action_examples/init"

import { ExamplesEntry } from "../../../../theme/action_examples/x_preact/examples"
import { ReportContainerComponent } from "../../../../theme/action_examples/x_preact/examples/report/container"

import "../../../../../css/getto.css"

render(
    h(
        ExamplesEntry({ title: "Report", component: ReportContainerComponent }),
        newExampleView({ webStorage: localStorage, currentLocation: location }),
    ),
    document.body,
)
