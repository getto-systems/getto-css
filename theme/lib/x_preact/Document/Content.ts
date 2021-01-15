import { h, VNode } from "preact"
import { useState, useEffect } from "preact/hooks"
import { html } from "htm/preact"

import { VNodeContent } from "../common/layout"
import { BreadcrumbList } from "../Outline/BreadcrumbList"

import { ContentComponent, initialContentState } from "../../document/Document/content/component"
import { BreadcrumbListComponent } from "../../auth/Outline/breadcrumbList/component"

import { ContentPath } from "../../document/content/data"

type Props = Readonly<{
    content: ContentComponent
    breadcrumbList: BreadcrumbListComponent
}>
export function Content(resource: Props): VNode {
    const content = resource.content

    const [state, setState] = useState(initialContentState)
    const [loadContentState, setLoadContentState] = useState(initialLoadContentState)
    useEffect(() => {
        content.onStateChange(setState)
        content.load()
    }, [])

    useEffect(() => {
        switch (state.type) {
            case "succeed-to-load":
                document.title = `${documentTitle(state.path)} | ${document.title}`
                loadContent(state.path, (content) => {
                    setLoadContentState({ loaded: true, content })
                })
                break
        }
    }, [state])

    switch (state.type) {
        case "initial-content":
            return EMPTY_CONTENT

        case "succeed-to-load":
            if (!loadContentState.loaded) {
                return EMPTY_CONTENT
            }
            return html`
                <header class="main__header">
                    <h1 class="main__title">${documentTitle(state.path)}</h1>
                    ${h(BreadcrumbList, resource)}
                </header>
                <section class="main__body">${loadContentState.content}</section>
            `
    }
}

type LoadContentState = Readonly<{ loaded: false }> | Readonly<{ loaded: true; content: VNodeContent }>
const initialLoadContentState: LoadContentState = { loaded: false }

function documentTitle(path: ContentPath): string {
    return findEntry(path).title
}
async function loadContent(path: ContentPath, hook: Post<VNodeContent>) {
    hook(await findEntry(path).content())
}
function findEntry(path: ContentPath): ContentEntry {
    const entry = contentMap[path]
    if (!entry) {
        return indexEntry
    }
    return entry
}

type ContentEntry = Readonly<{ title: string; content: ContentFactory<VNodeContent> }>
function entry(title: string, content: ContentFactory<VNodeContent>): ContentEntry {
    return { title, content }
}

const indexEntry: ContentEntry = entry("ドキュメント", async () =>
    (await import("./contents/home")).content_home()
)
const contentMap: Record<ContentPath, ContentEntry> = {
    "/docs/index.html": indexEntry,
}

const EMPTY_CONTENT = html``

interface Post<T> {
    (state: T): void
}
interface ContentFactory<T> {
    (): Promise<T>
}
