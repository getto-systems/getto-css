import { render, h } from "preact"

import { newNotFoundAsSingle } from "../../../theme/Home/NotFound/main/single"

import { NotFound } from "../../../x_preact/Theme/Home/NotFound"

import "../../../../css/getto.css"

render(h(NotFound, { notFound: newNotFoundAsSingle() }), document.body)
