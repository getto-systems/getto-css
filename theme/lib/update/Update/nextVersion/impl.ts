import { BaseComponent } from "../../../sub/getto-example/component/impl"

import {
    NextVersionComponentFactory,
    NextVersionMaterial,
    NextVersionComponent,
    NextVersionState,
} from "./component"

export const initNextVersionComponent: NextVersionComponentFactory = (material) =>
    new Component(material)

class Component extends BaseComponent<NextVersionState> implements NextVersionComponent {
    material: NextVersionMaterial

    constructor(material: NextVersionMaterial) {
        super()
        this.material = material
    }

    find(): void {
        this.material.find((event) => {
            this.post(event)
        })
    }
}
