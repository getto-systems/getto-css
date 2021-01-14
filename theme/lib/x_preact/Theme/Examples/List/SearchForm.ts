import { VNode } from "preact"
import { html } from "htm/preact"

import { simpleBox_fill } from "../box"

import { ListProps } from "./Container"

type Props = ListProps
export function SearchForm({ state, component }: Props): VNode {
    function onSearchClick() {
        component.search(null)
    }

    return simpleBox_fill(button())

    function button() {
        switch (state.type) {
            case "try-to-search":
                return searchingButton()

            case "search":
                return searchButton()
        }
    }

    function searchingButton() {
        return html`<button class="button button_searching">
            <i class="lnir lnir-spinner lnir-is-spinning"></i> 読み込み中
        </button>`
    }
    function searchButton() {
        return html`<button class="button button_search" onClick="${onSearchClick}">
            <i class="lnir lnir-reload"></i> 再読み込み
        </button>`
    }
}
