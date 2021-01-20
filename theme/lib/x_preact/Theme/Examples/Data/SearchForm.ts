import { VNode } from "preact"
import { html } from "htm/preact"

import { box_fill, button_search } from "../../../common/style"

import { ListProps } from "./Container"
import { icon, spinner } from "../../../common/icon"

type Props = ListProps
export function SearchForm({ state, component }: Props): VNode {
    function onSearchClick() {
        component.search(null)
    }

    return box_fill({ type: "simple", body: button() })

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
