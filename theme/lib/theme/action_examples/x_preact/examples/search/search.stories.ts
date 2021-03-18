import "../../../../../theme/css"
import { h } from "preact"

import { SearchSearchFormComponent } from "./search_form"
import { SearchAction, SearchState } from "./container"
import { enumKeys, storyTemplate } from "../../../../../z_vendor/storybook/preact/story"

enum SearchEnum {
    "initial",
    "invalid",
    "modified",
    "try-to-search",
}

export default {
    title: "Theme/Examples/Search",
    argTypes: {
        search: {
            control: { type: "select", options: enumKeys(SearchEnum) },
        },
    },
}

type MockProps = Readonly<{
    search: keyof typeof SearchEnum
}>
const template = storyTemplate<MockProps>((props) => {
    return h(SearchSearchFormComponent, {
        state: state(),
        action: initMockComponent(),
    })

    function state(): SearchState {
        switch (props.search) {
            case "initial":
                return {
                    type: "search",
                    state: {
                        modified: false,
                        invalid: false,
                    },
                }

            case "invalid":
                return {
                    type: "search",
                    state: {
                        modified: false,
                        invalid: true,
                    },
                }

            case "modified":
                return {
                    type: "search",
                    state: {
                        modified: true,
                        invalid: false,
                    },
                }

            case "try-to-search":
                return {
                    type: "try-to-search",
                }
        }
    }
})

function initMockComponent(): SearchAction {
    return {
        inputValidValue: noop,
        search: noop,
    }
}
function noop() {
    // 何もしない
}

export const Search = template({ search: "initial" })
