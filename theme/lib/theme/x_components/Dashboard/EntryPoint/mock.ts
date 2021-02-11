import {
    BreadcrumbListMockPropsPasser,
    initMockBreadcrumbListComponent,
} from "../../../../auth/x_components/Outline/breadcrumbList/mock"
import { initMockMenuListComponent, MenuListMockPropsPasser } from "../../../../auth/x_components/Outline/menuList/mock"
import { HowToUseMockPropsPasser, initMockHowToUseComponent } from "../howToUse/mock"

import { DashboardEntryPoint } from "./entryPoint"

export type DashboardMockPropsPasser = Readonly<{
    menuList: MenuListMockPropsPasser
    breadcrumbList: BreadcrumbListMockPropsPasser
    howToUse: HowToUseMockPropsPasser
}>
export function newMockDashboard(passer: DashboardMockPropsPasser): DashboardEntryPoint {
    return {
        resource: {
            menuList: initMockMenuListComponent(passer.menuList),
            breadcrumbList: initMockBreadcrumbListComponent(passer.breadcrumbList),
            howToUse: initMockHowToUseComponent(passer.howToUse),
        },
        terminate: () => {
            // mock では特に何もしない
        },
    }
}
