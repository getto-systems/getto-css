import { render, h } from "preact"

import { newDocumentAsSingle } from "../../../document/x_components/Document/EntryPoint/main/single"

import { Document } from "../../../x_preact/document/EntryPoint"

import "../../../../css/getto.css"

render(h(Document, { document: newDocumentAsSingle() }), document.body)
