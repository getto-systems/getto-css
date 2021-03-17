import { h } from "preact"

import { storyTemplate } from "../../../z_vendor/storybook/preact/story"

import { HowToUseComponent } from "./how_to_use"

import { mockFindAllVersionResource } from "../../../avail/version/action_find_all/mock"
import { mockGetCurrentVersionResource } from "../../../avail/version/action_get_current/mock"

export default {
    title: "main/Theme/HowToUse",
}

type MockProps = {
    // no props
}
const template = storyTemplate<MockProps>(() => {
    return h(HowToUseComponent, {
        ...mockFindAllVersionResource(),
        ...mockGetCurrentVersionResource(),
    })
})

export const HowToUse = template({})
