import "../../../../../theme/css"
import { h, VNode } from "preact"

import { SearchFormComponent } from "./search_form"
import { SearchComponent, SearchState } from "./container"

export default {
    title: "Theme/Examples/Search",
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
    return h(SearchFormComponent, { state: map(args), component: initMockComponent() })

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
