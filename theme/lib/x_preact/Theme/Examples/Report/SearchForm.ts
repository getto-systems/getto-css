import { VNode } from "preact"
import { html } from "htm/preact"

import { box_fill } from "../../../common/style"

import { DocumentProps } from "./Container"

type Props = DocumentProps
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
        return html`<button class="button button_search button_connect">
            <i class="lnir lnir-spinner lnir-is-spinning"></i> 読み込み中
        </button>`
    }
    function searchButton() {
        return html`<button class="button button_search" onClick="${onSearchClick}">
            <i class="lnir lnir-reload"></i> 再読み込み
        </button>`
    }
}
