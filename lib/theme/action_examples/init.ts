import { newBaseResource } from "../action_base/init"

import { initBaseView } from "../action_base/impl"

import { LocationOutsideFeature } from "../../z_vendor/getto-application/location/infra"
import { RepositoryOutsideFeature } from "../../z_vendor/getto-application/infra/repository/infra"

import { ExamplesView } from "./resource"

type OutsideFeature = LocationOutsideFeature & RepositoryOutsideFeature
export function newExampleView(feature: OutsideFeature): ExamplesView {
    return initBaseView(newBaseResource(feature), () => null)
}
