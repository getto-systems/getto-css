import { detectAppTarget } from "../../EntryPoint/impl/location"
import { initNextVersionResource } from "../../EntryPoint/impl/core"

import { initNextVersionComponent } from "../impl"

import { CheckSimulator } from "../../../../nextVersion/impl/remote/check/simulate"

import { initTestNextVersionAction } from "../../EntryPoint/tests/core"

import { NextVersionResource } from "../../EntryPoint/entryPoint"
import { NextVersionActionConfig } from "../../../../nextVersion/infra"

export type NextVersionSimulator = Readonly<{
    check: CheckSimulator
}>

export function newNextVersionResource(
    version: string,
    currentURL: URL,
    config: NextVersionActionConfig,
    simulator: NextVersionSimulator
): NextVersionResource {
    const factory = {
        actions: {
            nextVersion: initTestNextVersionAction(config, simulator),
        },
        components: {
            nextVersion: initNextVersionComponent,
        },
    }
    const collector = {
        nextVersion: {
            getAppTarget: () => detectAppTarget(version, currentURL),
        },
    }
    return initNextVersionResource(factory, collector)
}
