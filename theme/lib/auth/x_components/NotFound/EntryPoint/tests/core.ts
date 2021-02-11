import { NotFoundFactory, initNotFoundResource } from "../impl/core"

import { find } from "../../../../permission/currentVersion/impl/core"

import { initCurrentVersionComponent } from "../../currentVersion/impl"

import { NotFoundResource } from "../entryPoint"

import { CurrentVersionAction } from "../../../../permission/currentVersion/action"

export function newTestNotFoundResource(version: string): NotFoundResource {
    const factory: NotFoundFactory = {
        actions: {
            currentVersion: initCurrentVersionAction(version),
        },
        components: {
            currentVersion: initCurrentVersionComponent,
        },
    }
    return initNotFoundResource(factory)
}

function initCurrentVersionAction(version: string): CurrentVersionAction {
    const infra = {
        currentVersion: version,
    }
    return {
        find: find(infra),
    }
}
