import { h } from "preact"

import { enumKeys, storyTemplate } from "../../../../z_vendor/storybook/preact/story"

import { mockFindAllVersionCoreAction } from "../core/mock"

import { FindAllVersionsComponent } from "./find_all_versions"

import { FindAllVersionCoreState } from "../core/action"

enum FindNextEnum {
    "takeLongtime",
    "failed",
}

export default {
    title: "main/public/Avail/Move To Latest Version",
    parameters: {
        layout: "fullscreen",
    },
    argTypes: {
        findNext: {
            control: { type: "select", options: enumKeys(FindNextEnum) },
        },
    },
}

type MockProps = Readonly<{
    findNext: keyof typeof FindNextEnum
    err: string
}>
const template = storyTemplate<MockProps>((props) => {
    return h(FindAllVersionsComponent, {
        findAll: mockFindAllVersionCoreAction(),
        state: state(),
    })

    function state(): FindAllVersionCoreState {
        switch (props.findNext) {
            case "takeLongtime":
                return { type: "take-longtime-to-find" }

            case "failed":
                return {
                    type: "failed-to-find",
                    err: { type: "infra-error", err: props.err },
                }
        }
    }
})

export const MoveToLatestVersion = template({ findNext: "takeLongtime", err: "" })
