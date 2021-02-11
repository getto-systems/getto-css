import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/x_components/Example/EntryPoint/main/single"

import { Table } from "../../../../x_preact/theme/Examples/Table"

import "../../../../../css/getto.css"

render(h(Table, { example: newExampleAsSingle() }), document.body)
