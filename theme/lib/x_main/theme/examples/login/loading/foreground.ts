import { render, h } from "preact"

import { ExamplesLoginEntry } from "../../../../../theme/action_examples/x_preact/examples_login"
import { LoadingComponent } from "../../../../../theme/action_examples/x_preact/examples/login/loading"

import "../../../../../../css/getto.css"

render(h(ExamplesLoginEntry({ title: "Loading", component: LoadingComponent }), {}), document.body)
