import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/Example/main/single"

import { Data } from "../../../../x_preact/Theme/Examples/Data"

import "../../../../../css/getto.css"

render(h(Data, { example: newExampleAsSingle() }), document.body)
