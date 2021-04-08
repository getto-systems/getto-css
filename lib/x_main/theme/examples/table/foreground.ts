import "../../../../theme/css"
import { render, h } from "preact"

import { foregroundOutsideFeature } from "../../../x_outside_feature/common"

import { newExampleView } from "../../../../theme/action_examples/init"

import { ExamplesEntry } from "../../../../theme/action_examples/x_preact/examples"
import { TableContainerComponent } from "../../../../theme/action_examples/x_preact/examples/table/container"

render(
    h(ExamplesEntry, {
        view: newExampleView(foregroundOutsideFeature()),
        content: { title: "Table", component: TableContainerComponent },
    }),
    document.body,
)
