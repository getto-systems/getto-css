import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/Example/main/single"

import { Alignment } from "../../../../x_preact/Theme/Examples/Alignment"

import "../../../../../css/getto.css"

render(h(Alignment, { example: newExampleAsSingle() }), document.body)
