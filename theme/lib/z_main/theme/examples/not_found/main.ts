import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/Example/main/single"

import { NotFound } from "../../../../x_preact/Theme/Example/NotFound"

import "../../../../../css/getto.css"

render(h(NotFound, { example: newExampleAsSingle() }), document.body)
