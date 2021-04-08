import "../../../../theme/css"
import { render, h } from "preact"

import { foregroundOutsideFeature } from "../../../x_outside_feature/common"

import { newExampleView } from "../../../../theme/action_examples/init"

import { ExamplesEntry } from "../../../../theme/action_examples/x_preact/examples"
import { FormContainerComponent } from "../../../../theme/action_examples/x_preact/examples/form/container"

render(
    h(ExamplesEntry, {
        view: newExampleView(foregroundOutsideFeature()),
        content: { title: "Form", component: FormContainerComponent },
    }),
    document.body,
)
