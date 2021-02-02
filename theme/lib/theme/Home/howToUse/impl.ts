import { ApplicationBaseComponent } from "../../../sub/getto-example/application/impl"

import {
    HowToUseMaterial,
    HowToUseComponent,
    HowToUseState,
    HowToUseComponentFactory,
} from "./component"

export const initHowToUseComponent: HowToUseComponentFactory = (material) => new Component(material)

class Component extends ApplicationBaseComponent<HowToUseState> implements HowToUseComponent {
    material: HowToUseMaterial

    constructor(material: HowToUseMaterial) {
        super()
        this.material = material
    }

    load(): void {
        this.material.find((event) => {
            this.post(event)
        })
    }
}
