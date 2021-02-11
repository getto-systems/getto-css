import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/x_components/Example/EntryPoint/main/single"

import { Search } from "../../../../x_preact/Theme/Examples/Search"

import "../../../../../css/getto.css"

render(h(Search, { example: newExampleAsSingle() }), document.body)
