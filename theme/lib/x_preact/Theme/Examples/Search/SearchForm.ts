import { h, VNode } from "preact"
import { html } from "htm/preact"

import { container, box_fill } from "../../../../z_external/css/getto/preact/design/box"
import {
    search,
    search_double,
    formError,
    button_search,
    checkbox,
} from "../../../../z_external/css/getto/preact/design/form"

import { icon, spinner } from "../../../common/icon"

import { EditState, SearchProps } from "./Container"

type Props = SearchProps
export function SearchForm(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return box_fill({
        type: "footer",
        body: container([
            search({
                title: "ID",
                body: html`<input type="search" class="input_fill" onInput=${onInput} />`,
                help: ["完全一致検索"],
            }),
            search({
                title: "名前",
                body: html`<input type="search" class="input_fill" onInput=${onInput} />`,
                help: [],
            }),
            search_double({
                title: "radio",
                body: [
                    checkbox({
                        isChecked: true,
                        input: html`<input type="radio" name="radio" checked onClick="${onInput}" />仮`,
                        key: "仮",
                    }),
                    checkbox({
                        isChecked: false,
                        input: html`<input type="radio" name="radio" onClick="${onInput}" />作業中`,
                        key: "作業中",
                    }),
                    checkbox({
                        isChecked: false,
                        input: html`<input type="radio" name="radio" onClick="${onInput}" />完了`,
                        key: "完了",
                    }),
                ],
                help: [],
            }),
        ]),
        footer: h(SearchFooter, props),
    })
}

type SearchFooterProps = SearchProps
function SearchFooter({ state, component }: SearchFooterProps) {
    function onSearchClick() {
        component.search(null)
    }

    switch (state.type) {
        case "try-to-search":
            return searchingButton()

        case "search":
            if (state.state.invalid) {
                return html`${searchButton(state.state)}${searchError()}`
            } else {
                return searchButton(state.state)
            }
    }

    function searchingButton() {
        return button_search({ state: "connect", label: html`${spinner} 読み込み中` })
    }
    function searchButton(state: EditState) {
        const buttonState = state.modified ? "confirm" : "normal"
        return button_search({
            state: buttonState,
            label: html`${icon("reload")} 再読み込み`,
            onClick: onSearchClick,
        })
    }

    function searchError() {
        return formError(["通信エラーが発生しました。もう一度試してください"])
    }
}
