import { env } from "../../../../../y_static/env"

import { DocumentCollector, DocumentFactory, initDocumentResource } from "../impl/core"

import { detectMenuTarget } from "../../../../../auth/x_components/Outline/Menu/impl/location"
import { detectContentPath } from "../impl/location"

import { initMenuListComponent } from "../../../../../auth/x_components/Outline/menuList/impl"
import { initBreadcrumbListComponent } from "../../../../../auth/x_components/Outline/breadcrumbList/impl"
import { initContentComponent } from "../../content/impl"

import { initDocumentMenuAction } from "../../../../../auth/x_components/Outline/Menu/main/core"

import { loadContent } from "../../../../content/impl/core"

import { DocumentEntryPoint } from "../entryPoint"

import { ContentAction } from "../../../../content/action"

export function newDocumentAsSingle(): DocumentEntryPoint {
    const menuExpandStorage = localStorage
    const currentURL = new URL(location.toString())

    const factory: DocumentFactory = {
        actions: {
            menu: initDocumentMenuAction(menuExpandStorage),
            content: initContentAction(),
        },
        components: {
            menuList: initMenuListComponent,
            breadcrumbList: initBreadcrumbListComponent,

            content: initContentComponent,
        },
    }
    const collector: DocumentCollector = {
        menu: {
            getMenuTarget: () => detectMenuTarget(env.version, currentURL),
        },
        content: {
            getContentPath: () => detectContentPath(env.version, currentURL),
        },
    }
    const resource = initDocumentResource(factory, collector)
    return {
        resource,
        terminate: () => {
            resource.breadcrumbList.terminate()
            resource.menuList.terminate()
            resource.content.terminate()
        },
    }
}

function initContentAction(): ContentAction {
    return {
        loadContent: loadContent(),
    }
}