import { ApplicationAbstractStateAction } from "../../../../z_vendor/getto-application/action/impl"

import { findAllVersion } from "../../find_all/impl/core"

import { FindAllVersionInfra } from "../../find_all/infra"

import {
    FindAllVersionMaterial,
    FindAllVersionCoreState,
    initialFindAllVersionCoreState,
    FindAllVersionCoreAction,
} from "./action"

export function initFindAllVersionCoreMaterial(infra: FindAllVersionInfra): FindAllVersionMaterial {
    return {
        find: findAllVersion(infra),
    }
}

export function initFindAllVersionCoreAction(
    material: FindAllVersionMaterial,
): FindAllVersionCoreAction {
    return new Action(material)
}

class Action
    extends ApplicationAbstractStateAction<FindAllVersionCoreState>
    implements FindAllVersionCoreAction {
    readonly initialState = initialFindAllVersionCoreState

    material: FindAllVersionMaterial

    constructor(material: FindAllVersionMaterial) {
        super()
        this.material = material

        this.igniteHook(() => {
            this.material.find(this.post)
        })
    }
}
