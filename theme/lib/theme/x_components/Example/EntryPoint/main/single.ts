import { env } from "../../../../../y_environment/env"

import { ExampleCollector, ExampleFactory, initExampleResource } from "../impl/core"

import { detectMenuTarget } from "../../../../../auth/x_components/Outline/Menu/impl/location"

import { initMenuListComponent } from "../../../../../auth/x_components/Outline/menuList/impl"
import { initBreadcrumbListComponent } from "../../../../../auth/x_components/Outline/breadcrumbList/impl"

import { initMainMenuAction } from "../../../../../auth/x_components/Outline/Menu/main/core"

import { ExampleEntryPoint } from "../entryPoint"

export function newExampleAsSingle(): ExampleEntryPoint {
    const menuExpandStorage = localStorage
    const currentURL = new URL(location.toString())

    const factory: ExampleFactory = {
        actions: {
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
    const resource = initExampleResource(factory, collector)
    return {
        resource,
        terminate: () => {
            resource.menuList.terminate()
            resource.breadcrumbList.terminate()
        },
    }
}
