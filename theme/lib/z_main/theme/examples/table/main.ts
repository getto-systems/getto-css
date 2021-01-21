import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/Example/main/single"

import { Table } from "../../../../x_preact/Theme/Examples/Table"

import "../../../../../css/getto.css"

render(h(Table, { example: newExampleAsSingle() }), document.body)
