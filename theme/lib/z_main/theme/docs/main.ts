import { render, h } from "preact"

import { newDocumentAsSingle } from "../../../document/x_components/Document/EntryPoint/main/single"

import { EntryPoint } from "../../../x_preact/document/Document/EntryPoint"

import "../../../../css/getto.css"

render(h(EntryPoint, newDocumentAsSingle()), document.body)
