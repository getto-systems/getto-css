import { VNode } from "preact"
import { html } from "htm/preact"

import { box_fill } from "../../../../../z_vendor/getto-css/preact/design/box"
import { button_search } from "../../../../../z_vendor/getto-css/preact/design/form"

import { ListProps } from "./container"
import { icon, spinner } from "../../../../../x_preact/common/design/icon"

type Props = ListProps
export function SearchFormComponent({ state, component }: Props): VNode {
    function onSearchClick() {
        component.search(null)
    }

    return box_fill({ body: button() })

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
