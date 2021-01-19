import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/Example/main/single"

import { Sidebar } from "../../../../x_preact/Theme/Examples/Sidebar"

import "../../../../../css/getto.css"

render(h(Sidebar, { example: newExampleAsSingle() }), document.body)
