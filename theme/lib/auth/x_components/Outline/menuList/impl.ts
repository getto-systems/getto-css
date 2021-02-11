import { ApplicationBaseComponent } from "../../../../sub/getto-example/x_components/Application/impl"

import {
    MenuListComponentFactory,
    MenuListMaterial,
    MenuListComponent,
    MenuListState,
} from "./component"

import { Menu, MenuCategoryPath } from "../../../permission/menu/data"

export const initMenuListComponent: MenuListComponentFactory = (material) => new Component(material)

class Component extends ApplicationBaseComponent<MenuListState> implements MenuListComponent {
    material: MenuListMaterial

    constructor(material: MenuListMaterial) {
        super()
        this.material = material
    }

    load(): void {
        this.material.loadMenu((event) => {
            this.post(event)
        })
    }
    toggle(menu: Menu, path: MenuCategoryPath): void {
        this.material.toggleMenuExpand(menu, path, (event) => {
            this.post(event)
        })
    }
}
