import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/x_components/Example/EntryPoint/main/single"

import { Form } from "../../../../x_preact/theme/Examples/SidebarDouble"

import "../../../../../css/getto.css"

render(h(Form, { example: newExampleAsSingle() }), document.body)
