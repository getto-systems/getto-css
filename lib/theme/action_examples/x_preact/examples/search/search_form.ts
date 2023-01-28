import { h, VNode } from "preact"
import { html } from "htm/preact"

import { container, box_grow } from "../../../../../z_vendor/getto-css/preact/design/box"
import {
    search,
    search_double,
    fieldHelp_error,
    button_search,
    checkbox,
    label,
} from "../../../../../z_vendor/getto-css/preact/design/form"

import { EditState, SearchProps } from "./container"
import { spinner } from "../../../../../x_preact/design/icon"

type Props = SearchProps
export function SearchSearchFormComponent(props: Props): VNode {
    const { action: component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return container(
        box_grow({
            body: container([
                search({
                    title: "ID",
                    label: label,
                    body: html`<input type="search" class="input_fill" onInput=${onInput} />`,
                    help: ["完全一致検索"],
                }),
                search({
                    title: "名前",
                    label: label,
                    body: html`<input type="search" class="input_fill" onInput=${onInput} />`,
                    help: [],
                }),
                search_double({
                    title: "radio",
                    label: label,
                    body: [
                        checkbox({
                            isChecked: true,
                            input: html`<input
                                    type="radio"
                                    name="radio"
                                    checked
                                    onClick="${onInput}"
                                />仮`,
                            key: "仮",
                        }),
                        checkbox({
                            isChecked: false,
                            input: html`<input
                                    type="radio"
                                    name="radio"
                                    onClick="${onInput}"
                                />作業中`,
                            key: "作業中",
                        }),
                        checkbox({
                            isChecked: false,
                            input: html`<input
                                    type="radio"
                                    name="radio"
                                    onClick="${onInput}"
                                />完了`,
                            key: "完了",
                        }),
                    ],
                    help: [],
                }),
            ]),
            footer: h(SearchFooter, props),
        }),
    )
}

type SearchFooterProps = SearchProps
function SearchFooter({ state, action: component }: SearchFooterProps) {
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
            label: "検索",
            onClick: onSearchClick,
        })
    }

    function searchError() {
        return fieldHelp_error(["通信エラーが発生しました。もう一度試してください"])
    }
}
