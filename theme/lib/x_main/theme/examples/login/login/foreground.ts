import "../../../../../theme/css"
import { render, h } from "preact"

import { ExamplesLoginEntry } from "../../../../../theme/action_examples/x_preact/examples_login"
import { LoginContainerComponent } from "../../../../../theme/action_examples/x_preact/examples/login/login/container"

render(
    h(ExamplesLoginEntry({ title: "Login", component: LoginContainerComponent }), {}),
    document.body,
)
