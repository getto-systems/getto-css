import { h, render } from "preact"

import { newMoveToNextVersionAsSingle } from "../../../available/x_components/MoveToNextVersion/EntryPoint/main/single"

import { EntryPoint } from "../../../x_preact/available/MoveToLatestVersion/EntryPoint"

import "../../../../css/getto.css"

render(h(EntryPoint, newMoveToNextVersionAsSingle()), document.body)
