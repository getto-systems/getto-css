import { newFindAllVersionInfra } from "../find_all/impl/init"

import { initFindAllVersionResource } from "./impl"
import { initFindAllVersionCoreAction, initFindAllVersionCoreMaterial } from "./core/impl"

import { FindAllVersionResource } from "./resource"

export function newFindAllVersionResource(): FindAllVersionResource {
    return initFindAllVersionResource(
        initFindAllVersionCoreAction(initFindAllVersionCoreMaterial(newFindAllVersionInfra())),
    )
}
