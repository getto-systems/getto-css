import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/Example/main/single"

import { Search } from "../../../../x_preact/Theme/Examples/Search"

import "../../../../../css/getto.css"

render(h(Search, { example: newExampleAsSingle() }), document.body)
