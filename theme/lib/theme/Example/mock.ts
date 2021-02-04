import { MockComponent } from "../../sub/getto-example/application/mock"

import { initBreadcrumbListComponent } from "../../auth/Outline/breadcrumbList/mock"
import { initMenuListComponent } from "../../auth/Outline/menuList/mock"

import { ExampleEntryPoint } from "./entryPoint"

import { BreadcrumbListState, initialBreadcrumbListState } from "../../auth/Outline/breadcrumbList/component"
import { initialMenuListState, MenuListState } from "../../auth/Outline/menuList/component"

export function newExample(): ExampleMockEntryPoint {
    const resource = {
        menuList: initMenuListComponent(initialMenuListState),
        breadcrumbList: initBreadcrumbListComponent(initialBreadcrumbListState),
    }
    return {
        example: {
            resource,
            terminate: () => {
                // mock では特に何もしない
            },
        },
        update: {
            menuList: update(resource.menuList),
            breadcrumbList: update(resource.breadcrumbList),
        },
    }
}

export type ExampleMockEntryPoint = Readonly<{
    example: ExampleEntryPoint
    update: Readonly<{
        menuList: Post<MenuListState>
        breadcrumbList: Post<BreadcrumbListState>
    }>
}>

function update<S, C extends MockComponent<S>>(component: C): Post<S> {
    return (state) => component.update(state)
}

interface Post<T> {
    (state: T): void
}
