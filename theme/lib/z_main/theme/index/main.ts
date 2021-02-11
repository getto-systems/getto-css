import { render, h } from "preact"

import { newDashboardAsSingle } from "../../../theme/x_components/Dashboard/EntryPoint/main/single"

import { EntryPoint } from "../../../x_preact/theme/Dashboard/EntryPoint"

import "../../../../css/getto.css"

render(h(EntryPoint, newDashboardAsSingle()), document.body)
