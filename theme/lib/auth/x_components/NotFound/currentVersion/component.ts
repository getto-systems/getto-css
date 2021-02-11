import { ApplicationComponent } from "../../../../sub/getto-example/x_components/Application/component"

import { Find } from "../../../permission/currentVersion/action"

import { Version } from "../../../permission/currentVersion/data"

export interface CurrentVersionComponentFactory {
    (material: CurrentVersionMaterial): CurrentVersionComponent
}
export type CurrentVersionMaterial = Readonly<{
    find: Find
}>

export interface CurrentVersionComponent extends ApplicationComponent<CurrentVersionState> {
    load(): void
}

export type CurrentVersionState =
    | Readonly<{ type: "initial-current-version" }>
    | Readonly<{ type: "succeed-to-find"; currentVersion: Version }>

export const initialCurrentVersionState: CurrentVersionState = { type: "initial-current-version" }
