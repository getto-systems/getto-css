import { MenuListComponent } from "../../auth/Outline/menuList/component"
import { BreadcrumbListComponent } from "../../auth/Outline/breadcrumbList/component"

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
