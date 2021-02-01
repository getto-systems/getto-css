import { BaseComponent } from "../../../sub/getto-example/component/impl"

import {
    BreadcrumbListComponentFactory,
    BreadcrumbListMaterial,
    BreadcrumbListComponent,
    BreadcrumbListState,
} from "./component"

export const initBreadcrumbListComponent: BreadcrumbListComponentFactory = (material) =>
    new Component(material)

class Component extends BaseComponent<BreadcrumbListState> implements BreadcrumbListComponent {
    material: BreadcrumbListMaterial

    constructor(material: BreadcrumbListMaterial) {
        super()
        this.material = material
    }

    load(): void {
        this.material.loadBreadcrumb((event) => {
            this.post(event)
        })
    }
}
