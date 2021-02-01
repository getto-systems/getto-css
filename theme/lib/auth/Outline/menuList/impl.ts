import { BaseComponent } from "../../../sub/getto-example/component/impl"

import {
    MenuListComponentFactory,
    MenuListMaterial,
    MenuListComponent,
    MenuListState,
} from "./component"

import { Menu, MenuCategoryPath } from "../../permission/menu/data"

export const initMenuListComponent: MenuListComponentFactory = (material) => new Component(material)

class Component extends BaseComponent<MenuListState> implements MenuListComponent {
    material: MenuListMaterial

    constructor(material: MenuListMaterial) {
        super()
        this.material = material
    }

    load(): void {
        const nonce = this.material.loadApiNonce()
        const roles = this.material.loadApiRoles()
        this.material.loadMenu(nonce, roles, (event) => {
            this.post(event)
        })
    }
    toggle(menu: Menu, path: MenuCategoryPath): void {
        this.material.toggleMenuExpand(menu, path, (event) => {
            this.post(event)
        })
    }
}
