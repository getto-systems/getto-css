import { BaseComponent } from "../../../sub/getto-example/component/impl"

import {
    CurrentVersionMaterial,
    CurrentVersionComponent,
    CurrentVersionState,
    CurrentVersionComponentFactory,
} from "./component"

export const initCurrentVersionComponent: CurrentVersionComponentFactory = (material) =>
    new Component(material)

class Component extends BaseComponent<CurrentVersionState> implements CurrentVersionComponent {
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
