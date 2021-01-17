import { env } from "../../../y_static/env"

import { ExampleCollector, ExampleFactory, initExampleResource } from "../impl/core"

import { detectMenuTarget } from "../../../auth/Outline/Menu/impl/location"

import { initMenuListComponent } from "../../../auth/Outline/menuList/impl"
import { initBreadcrumbListComponent } from "../../../auth/Outline/breadcrumbList/impl"

import { initCredentialAction, initMainMenuAction } from "../../../auth/Outline/Menu/main/core"

import { ExampleEntryPoint } from "../view"

export function newExampleAsSingle(): ExampleEntryPoint {
    const menuExpandStorage = localStorage
    const currentURL = new URL(location.toString())

    const factory: ExampleFactory = {
        actions: {
            credential: initCredentialAction(),
            menu: initMainMenuAction(menuExpandStorage),
        },
        components: {
            menuList: initMenuListComponent,
            breadcrumbList: initBreadcrumbListComponent,
        },
    }
    const collector: ExampleCollector = {
        menu: {
            getMenuTarget: () => detectMenuTarget(env.version, currentURL),
        },
    }
    return {
        resource: initExampleResource(factory, collector),
        terminate: () => {
            // worker とインターフェイスを合わせるために必要
        },
    }
}
