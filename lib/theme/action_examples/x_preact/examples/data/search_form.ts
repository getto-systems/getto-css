import { VNode } from "preact"
import { html } from "htm/preact"

import { box_grow, container } from "../../../../../z_vendor/getto-css/preact/design/box"
import { button_search } from "../../../../../z_vendor/getto-css/preact/design/form"

import { ListProps } from "./container"
import { icon, spinner } from "../../../../../x_preact/design/icon"

type Props = ListProps
export function DataSearchFormComponent({ state, action: component }: Props): VNode {
    function onSearchClick() {
        component.search(null)
    }

    return container([box_grow({ body: button() })])

    function button() {
        switch (state.type) {
            case "try-to-search":
                return searchingButton()

            case "search":
                return searchButton()
        }
    }

    function searchingButton() {
        return button_search({ state: "connect", label: html`${spinner} 読み込み中` })
    }
    function searchButton() {
        return button_search({
            state: "normal",
            label: html`${icon("reload")} 再読み込み`,
            onClick: onSearchClick,
        })
    }
}
