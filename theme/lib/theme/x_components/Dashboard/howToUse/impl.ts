import { ApplicationBaseComponent } from "../../../../sub/getto-example/x_components/Application/impl"

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
        this.terminateHook(() => {
            // 本来必要ないが、テストのために hook を追加している
        })

        this.material = material
    }

    load(): void {
        this.material.find((event) => {
            this.post(event)
        })
    }
}
