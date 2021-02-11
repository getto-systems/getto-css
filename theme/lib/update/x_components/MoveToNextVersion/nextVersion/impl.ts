import { ApplicationBaseComponent } from "../../../../sub/getto-example/x_components/Application/impl"

import {
    NextVersionComponentFactory,
    NextVersionMaterial,
    NextVersionComponent,
    NextVersionState,
} from "./component"

export const initNextVersionComponent: NextVersionComponentFactory = (material) =>
    new Component(material)

class Component extends ApplicationBaseComponent<NextVersionState> implements NextVersionComponent {
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
