import { ComponentBase } from "../../../z_external/getto-example/component/base"

import {
    CurrentVersionMaterial,
    CurrentVersionComponent,
    CurrentVersionState,
    CurrentVersionComponentFactory,
} from "./component"

export const initCurrentVersionComponent: CurrentVersionComponentFactory = (material) =>
    new Component(material)

class Component extends ComponentBase<CurrentVersionState> implements CurrentVersionComponent {
    material: CurrentVersionMaterial

    constructor(material: CurrentVersionMaterial) {
        super()
        this.material = material
    }

    load(): void {
        this.material.find((event) => {
            this.post(event)
        })
    }
}
