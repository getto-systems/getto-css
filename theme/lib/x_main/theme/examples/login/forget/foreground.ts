import "../../../../../theme/css"
import { render, h } from "preact"

import { ExamplesLoginEntry } from "../../../../../theme/action_examples/x_preact/examples_login"
import { ForgetContainerComponent } from "../../../../../theme/action_examples/x_preact/examples/login/forget/container"

render(
    h(ExamplesLoginEntry, { content: { title: "Forget", component: ForgetContainerComponent } }),
    document.body,
)
