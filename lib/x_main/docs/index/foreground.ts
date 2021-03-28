import "../../../theme/css"
import { render, h } from "preact"

import { newDocsView } from "../../../docs/action_docs/init"

import {
    docs_theme,
    docs_theme_base,
    docs_theme_design,
    docs_theme_details,
    docs_theme_layout,
} from "../../../theme/docs"

import { DocsEntry } from "../../../docs/action_docs/x_preact/docs"

render(
    h(DocsEntry, {
        view: newDocsView({
            webStorage: localStorage,
            currentLocation: location,
        }),
        docs: {
            title: "ドキュメント",
            contents: [
                [docs_theme],
                [[...docs_theme_base, ...docs_theme_layout]],
                [docs_theme_design],
                [docs_theme_details],
            ],
        },
    }),
    document.body,
)
