import { h } from "preact"
import { docs_theme } from "../../../theme/docs"

import { storyTemplate } from "../../../z_vendor/storybook/preact/story"

import { mockDocsResource } from "../mock"

import { DocsComponent } from "./docs"

export default {
    title: "main/secure/Docs",
    parameters: {
        layout: "fullscreen",
    },
}

type MockProps = {
    // no props
}
const template = storyTemplate<MockProps>(() => {
    return h(DocsComponent, {
        ...mockDocsResource(),
        docs: { title: "Docs", contents: [[docs_theme]] },
    })
})

export const Content = template({})
