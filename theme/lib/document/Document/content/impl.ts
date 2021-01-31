import { ComponentBase } from "../../../z_external/getto-example/component/base"

import { ContentComponentFactory, ContentMaterial, ContentComponent, ContentState } from "./component"

export const initContentComponent: ContentComponentFactory = (material) => new Component(material)

class Component extends ComponentBase<ContentState> implements ContentComponent {
    material: ContentMaterial

    constructor(material: ContentMaterial) {
        super()
        this.material = material
    }

    load(): void {
        this.material.loadDocument((event) => {
            this.post(event)
        })
    }
}
