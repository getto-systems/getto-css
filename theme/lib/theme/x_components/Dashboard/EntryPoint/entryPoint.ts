import { MenuListComponent } from "../../../../auth/x_components/Outline/menuList/component"
import { BreadcrumbListComponent } from "../../../../auth/x_components/Outline/breadcrumbList/component"

import { HowToUseComponent } from "../howToUse/component"

export type DashboardEntryPoint = Readonly<{
    resource: DashboardResource
    terminate: Terminate
}>

export type DashboardResource = Readonly<{
    menuList: MenuListComponent
    breadcrumbList: BreadcrumbListComponent

    howToUse: HowToUseComponent
}>

interface Terminate {
    (): void
}
