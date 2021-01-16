import { render, h } from "preact"

import { newNotFoundAsSingle } from "../../../auth/NotFound/NotFound/main/single"

import { NotFound } from "../../../x_preact/Auth/NotFound"

import "../../../../css/getto.css"

render(h(NotFound, { notFound: newNotFoundAsSingle() }), document.body)
