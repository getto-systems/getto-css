import {
    BreadcrumbListMockPropsPasser,
    initMockBreadcrumbListComponent,
} from "../../auth/Outline/breadcrumbList/mock"
import { initMockMenuListComponent, MenuListMockPropsPasser } from "../../auth/Outline/menuList/mock"

import { ExampleEntryPoint } from "./entryPoint"

export type ExampleMockPropsPasser = Readonly<{
    menuList: MenuListMockPropsPasser
    breadcrumbList: BreadcrumbListMockPropsPasser
}>
export function newMockExample(passer: ExampleMockPropsPasser): ExampleEntryPoint {
    return {
        resource: {
            menuList: initMockMenuListComponent(passer.menuList),
            breadcrumbList: initMockBreadcrumbListComponent(passer.breadcrumbList),
        },
        terminate: () => {
            // mock では特に何もしない
        },
    }
}
