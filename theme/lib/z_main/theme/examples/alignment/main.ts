import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/x_components/Example/EntryPoint/main/single"

import { Alignment } from "../../../../x_preact/theme/Examples/Alignment"

import "../../../../../css/getto.css"

render(h(Alignment, { example: newExampleAsSingle() }), document.body)
