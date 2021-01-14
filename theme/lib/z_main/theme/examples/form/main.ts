import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/Example/main/single"

import { Form } from "../../../../x_preact/Theme/Examples/Form"

import "../../../../../css/getto.css"

render(h(Form, { example: newExampleAsSingle() }), document.body)
