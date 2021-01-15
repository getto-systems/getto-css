import { h, VNode } from "preact"

import { SearchForm } from "../../../x_preact/Theme/Examples/Search/SearchForm"
import { SearchComponent, SearchState } from "../../../x_preact/Theme/Examples/Search/Container"

import "../../../../css/getto.css"

export default {
    title: "Theme/Examples/SearchForm",
    argTypes: {
        type: {
            table: { disable: true },
        },
    },
}

type MockProps =
    | Readonly<{ type: "initial" }>
    | Readonly<{ type: "invalid" }>
    | Readonly<{ type: "modified" }>
    | Readonly<{ type: "try-to-search" }>

const Template: Story<MockProps> = (args) => {
    return h(SearchForm, { state: map(args), component: initMockComponent() })

    function map(args: MockProps): SearchState {
        switch (args.type) {
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
}

function initMockComponent(): SearchComponent {
    return {
        inputInvalidValue: noop,
        inputValidValue: noop,
        search: noop,
    }
}
function noop() {
    // 何もしない
}

interface Story<T> {
    args?: T
    (args: T): VNode
}

export const Initial = Template.bind({})
Initial.args = {
    type: "initial",
}

export const Invalid = Template.bind({})
Invalid.args = {
    type: "invalid",
}

export const Modified = Template.bind({})
Modified.args = {
    type: "modified",
}

export const TryToSearch = Template.bind({})
TryToSearch.args = {
    type: "try-to-search",
}
