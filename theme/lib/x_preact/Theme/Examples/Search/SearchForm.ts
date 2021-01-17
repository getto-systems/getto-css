import { h, VNode } from "preact"
import { html } from "htm/preact"

import { search, noTitleBox_fill, searchWithHelp, search_double } from "../box"
import { container, small } from "../../../common/layout"

import { EditState, SearchProps } from "./Container"

type Props = SearchProps
export function SearchForm(props: Props): VNode {
    const { component } = props

    function onInput() {
        component.inputValidValue(null)
    }

    return noTitleBox_fill(
        container([
            searchWithHelp(
                "ID",
                [html`<input type="search" class="input_fill" onInput=${onInput} />`],
                ["完全一致検索"]
            ),
            search("名前", [html`<input type="search" class="input_fill" onInput=${onInput} />`]),
            search_double("radio", [
                html`<label class="input__radio input_checked">
                    <input type="radio" name="radio" checked onClick="${onInput}" />仮
                </label>`,
                html`<label class="input__radio">
                    <input type="radio" name="radio" onClick="${onInput}" />作業中
                </label>`,
                html`<label class="input__radio">
                    <input type="radio" name="radio" onClick="${onInput}" />完了
                </label>`,
            ]),
        ]),
        h(SearchFooter, props)
    )
}

type SearchFooterProps = SearchProps
function SearchFooter({ state, component }: SearchFooterProps) {
    function onSearchClick() {
        component.search(null)
    }

    switch (state.type) {
        case "try-to-search":
            return html`<footer class="box__footer">${searchingButton()}</footer>`

        case "search":
            if (state.state.invalid) {
                return html`<footer class="box__footer">
                    ${searchButton(state.state)} ${searchError()}
                </footer>`
            } else {
                return html`<footer class="box__footer">${searchButton(state.state)}</footer>`
            }
    }

    function searchingButton() {
        return html`<button class="button button_edit button_connect" type="button">
            <i class="lnir lnir-spinner lnir-is-spinning"></i> 検索中
        </button>`
    }
    function searchButton(state: EditState) {
        if (state.modified) {
            return html`<button class="button button_edit button_confirm" onClick="${onSearchClick}">
                検索
            </button>`
        } else {
            return html`<button class="button button_edit" onClick="${onSearchClick}">検索</button>`
        }
    }

    function searchError() {
        return html`<aside class="form__help form_error">
            <p class="form__notice">通信エラーが発生しました。もう一度試してください</p>
        </aside>`
    }
}
