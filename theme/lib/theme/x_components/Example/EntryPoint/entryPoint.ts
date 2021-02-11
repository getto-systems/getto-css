import { MenuListComponent } from "../../../../auth/x_components/Outline/menuList/component"
import { BreadcrumbListComponent } from "../../../../auth/x_components/Outline/breadcrumbList/component"

export type ExampleEntryPoint = Readonly<{
    resource: ExampleResource
    terminate: Terminate
}>

export type ExampleResource = Readonly<{
    menuList: MenuListComponent
    breadcrumbList: BreadcrumbListComponent
}>

interface Terminate {
    (): void
}
