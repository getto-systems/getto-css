import { ApplicationComponent } from "../../../../sub/getto-example/x_components/Application/component"
import { Find } from "../../../allVersions/action"

import { AllVersions, FindError, Version } from "../../../allVersions/data"

export interface HowToUseComponentFactory {
    (material: HowToUseMaterial): HowToUseComponent
}
export type HowToUseMaterial = Readonly<{
    find: Find
}>

export interface HowToUseComponent extends ApplicationComponent<HowToUseState> {
    load(): void
}

export type HowToUseState =
    | Readonly<{ type: "initial-how-to-use" }>
    | Readonly<{ type: "try-to-find"; currentVersion: Version }>
    | Readonly<{ type: "delayed-to-find"; currentVersion: Version }>
    | Readonly<{ type: "failed-to-find"; err: FindError; currentVersion: Version }>
    | Readonly<{ type: "succeed-to-find"; versions: AllVersions; currentVersion: Version }>

export const initialHowToUseState: HowToUseState = { type: "initial-how-to-use" }