import { render, h } from "preact"

import { newExampleAsSingle } from "../../../../theme/Example/main/single"

import { Document } from "../../../../x_preact/Theme/Examples/Document"

import "../../../../../css/getto.css"

render(h(Document, { example: newExampleAsSingle() }), document.body)
