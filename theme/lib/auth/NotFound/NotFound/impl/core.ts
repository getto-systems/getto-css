import { NotFoundResource } from "../view"

import { CurrentVersionComponentFactory } from "../../currentVersion/component"

import { CurrentVersionAction } from "../../../permission/currentVersion/action"

export type NotFoundFactory = Readonly<{
    actions: Readonly<{
        currentVersion: CurrentVersionAction
    }>
    components: Readonly<{
        currentVersion: CurrentVersionComponentFactory
    }>
}>
export function initNotFoundResource(factory: NotFoundFactory): NotFoundResource {
    const actions = {
        find: factory.actions.currentVersion.find(),
    }
    return {
        currentVersion: factory.components.currentVersion(actions),
    }
}
