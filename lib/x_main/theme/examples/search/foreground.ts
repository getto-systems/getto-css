import "../../../../theme/css"
import { render, h } from "preact"

import { foregroundOutsideFeature } from "../../../x_outside_feature/common"

import { newExampleView } from "../../../../theme/action_examples/init"

import { ExamplesEntry } from "../../../../theme/action_examples/x_preact/examples"
import { SearchContainerComponent } from "../../../../theme/action_examples/x_preact/examples/search/container"

render(
    h(ExamplesEntry, {
        view: newExampleView(foregroundOutsideFeature()),
        content: { title: "Search", component: SearchContainerComponent },
    }),
    document.body,
)
