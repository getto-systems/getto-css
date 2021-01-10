import {
    HowToUseMaterial,
    HowToUseComponent,
    HowToUseState,
    HowToUseComponentFactory,
} from "./component"

export const initHowToUseComponent: HowToUseComponentFactory = (material) => new Component(material)

class Component implements HowToUseComponent {
    material: HowToUseMaterial

    listener: Post<HowToUseState>[] = []

    constructor(material: HowToUseMaterial) {
        this.material = material
    }

    onStateChange(post: Post<HowToUseState>): void {
        this.listener.push(post)
    }
    post(state: HowToUseState): void {
        this.listener.forEach((post) => post(state))
    }

    load(): void {
        this.material.find((event) => {
            this.post(event)
        })
    }
}

interface Post<T> {
    (state: T): void
}
