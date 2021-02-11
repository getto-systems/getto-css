import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/x_components/Example/EntryPoint/main/single"

import { Highlight } from "../../../../x_preact/theme/Examples/Highlight"

import "../../../../../css/getto.css"

render(h(Highlight, { example: newExampleAsSingle() }), document.body)
