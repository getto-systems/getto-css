import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/x_components/Example/EntryPoint/main/single"

import { Data } from "../../../../x_preact/Theme/Examples/Data"

import "../../../../../css/getto.css"

render(h(Data, { example: newExampleAsSingle() }), document.body)
