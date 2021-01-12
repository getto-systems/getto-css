import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/Example/main/single"

import { Misc } from "../../../../x_preact/Theme/Example/Misc/Misc"

import "../../../../../css/getto.css"

render(h(Misc, { example: newExampleAsSingle() }), document.body)
