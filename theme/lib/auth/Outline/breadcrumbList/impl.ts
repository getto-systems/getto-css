import { ComponentBase } from "../../../sub/getto-example/component/base"

import {
    BreadcrumbListComponentFactory,
    BreadcrumbListMaterial,
    BreadcrumbListComponent,
    BreadcrumbListState,
} from "./component"

export const initBreadcrumbListComponent: BreadcrumbListComponentFactory = (material) =>
    new Component(material)

class Component extends ComponentBase<BreadcrumbListState> implements BreadcrumbListComponent {
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
