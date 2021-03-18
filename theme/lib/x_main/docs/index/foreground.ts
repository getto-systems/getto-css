import "../../../theme/css"
import { render, h } from "preact"

import { newDocsView } from "../../../docs/action_docs/init"

import { docs_example } from "../../../theme/docs"
import { docs_avail } from "../../../avail/docs"
import { docs_docs } from "../../../docs/docs"

import { DocsEntry } from "../../../docs/action_docs/x_preact/docs"

render(
    h(
        DocsEntry({
            title: "ドキュメント",
            contents: [[docs_example], [[...docs_docs, ...docs_avail]]],
        }),
        newDocsView({
            webStorage: localStorage,
            currentLocation: location,
        }),
    ),
    document.body,
)
