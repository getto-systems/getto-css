import {
    BreadcrumbListMockPropsPasser,
    initMockBreadcrumbListComponent,
} from "../../../../auth/x_components/Outline/breadcrumbList/mock"
import { initMockMenuListComponent, MenuListMockPropsPasser } from "../../../../auth/x_components/Outline/menuList/mock"
import { ContentMockPropsPasser, initMockContentComponent } from "../content/mock"

import { DocumentEntryPoint } from "./entryPoint"

export type DocumentMockPropsPasser = Readonly<{
    menuList: MenuListMockPropsPasser
    breadcrumbList: BreadcrumbListMockPropsPasser
    content: ContentMockPropsPasser
}>
export function newMockDocument(passer: DocumentMockPropsPasser): DocumentEntryPoint {
    return {
        resource: {
            menuList: initMockMenuListComponent(passer.menuList),
            breadcrumbList: initMockBreadcrumbListComponent(passer.breadcrumbList),
            content: initMockContentComponent(passer.content),
        },
        terminate: () => {
            // mock では特に何もしない
        },
    }
}
