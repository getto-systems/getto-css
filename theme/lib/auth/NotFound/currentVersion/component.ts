import { Find } from "../../permission/currentVersion/action"
import { Version } from "../../permission/currentVersion/data"

export interface CurrentVersionComponentFactory {
    (material: CurrentVersionMaterial): CurrentVersionComponent
}
export type CurrentVersionMaterial = Readonly<{
    find: Find
}>

export interface CurrentVersionComponent {
    onStateChange(post: Post<CurrentVersionState>): void
    terminate(): void
    load(): void
}

export type CurrentVersionState =
    | Readonly<{ type: "initial-current-version" }>
    | Readonly<{ type: "succeed-to-find"; currentVersion: Version }>

export const initialCurrentVersionState: CurrentVersionState = { type: "initial-current-version" }

interface Post<T> {
    (state: T): void
}
