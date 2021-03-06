import "../../../../../theme/css"
import { render, h } from "preact"

import { ExamplesLoginEntry } from "../../../../../theme/action_examples/x_preact/examples_login"
import { LoginErrorComponent } from "../../../../../theme/action_examples/x_preact/examples/login/error"

render(
    h(ExamplesLoginEntry, { content: { title: "Error", component: LoginErrorComponent } }),
    document.body,
)
