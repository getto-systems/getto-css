import "../../../../../theme/css"
import { render, h } from "preact"

import { ExamplesLoginEntry } from "../../../../../theme/action_examples/x_preact/examples_login"
import { NotFoundComponent } from "../../../../../theme/action_examples/x_preact/examples/login/not_found"

render(
    h(ExamplesLoginEntry, { content: { title: "Not Found", component: NotFoundComponent } }),
    document.body,
)
