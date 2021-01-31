import { env } from "../../../../y_static/env"

import { initCurrentVersionComponent } from "../../currentVersion/impl"

import { find } from "../../../permission/currentVersion/impl/core"

import { NotFoundFactory, initNotFoundResource } from "../impl/core"

import { NotFoundEntryPoint } from "../view"

export function newNotFoundAsSingle(): NotFoundEntryPoint {
    const factory: NotFoundFactory = {
        actions: {
            currentVersion: initCurrentVersionAction(),
        },
        components: {
            currentVersion: initCurrentVersionComponent,
        },
    }
    const resource = initNotFoundResource(factory)
    return {
        resource,
        terminate: () => {
            resource.currentVersion.terminate()
        },
    }
}

function initCurrentVersionAction() {
    return {
        find: find({
            currentVersion: env.version,
        }),
    }
}
