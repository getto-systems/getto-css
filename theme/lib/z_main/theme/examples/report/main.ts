import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/x_components/Example/EntryPoint/main/single"

import { Report } from "../../../../x_preact/Theme/Examples/Report"

import "../../../../../css/getto.css"

render(h(Report, { example: newExampleAsSingle() }), document.body)
