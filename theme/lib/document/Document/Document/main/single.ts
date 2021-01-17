import { env } from "../../../../y_static/env"

import { DocumentCollector, DocumentFactory, initDocumentResource } from "../impl/core"

import { detectMenuTarget } from "../../../../auth/Outline/Menu/impl/location"
import { detectContentPath } from "../impl/location"

import { initMenuListComponent } from "../../../../auth/Outline/menuList/impl"
import { initBreadcrumbListComponent } from "../../../../auth/Outline/breadcrumbList/impl"
import { initContentComponent } from "../../content/impl"

import { initCredentialAction, initDocumentMenuAction } from "../../../../auth/Outline/Menu/main/core"

import { loadContent } from "../../../content/impl/core"

import { DocumentEntryPoint } from "../view"

import { ContentAction } from "../../../content/action"

export function newDocumentAsSingle(): DocumentEntryPoint {
    const menuExpandStorage = localStorage
    const currentURL = new URL(location.toString())

    const factory: DocumentFactory = {
        actions: {
            credential: initCredentialAction(),
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
    return {
        resource: initDocumentResource(factory, collector),
        terminate: () => {
            // worker とインターフェイスを合わせるために必要
        },
    }
}

function initContentAction(): ContentAction {
    return {
        loadContent: loadContent(),
    }
}
