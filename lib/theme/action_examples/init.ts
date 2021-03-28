import { newBaseResource } from "../action_base/init"

import { initBaseView } from "../action_base/impl"

import { ExamplesView } from "./resource"

type OutsideFeature = Readonly<{
    webStorage: Storage
    currentLocation: Location
}>
export function newExampleView(feature: OutsideFeature): ExamplesView {
    return initBaseView(newBaseResource(feature), () => null)
}
