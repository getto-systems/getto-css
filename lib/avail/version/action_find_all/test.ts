import { setupAsyncActionTestRunner } from "../../../z_vendor/getto-application/action/test_helper"

import { mockRemotePod } from "../../../z_vendor/getto-application/infra/remote/mock"

import { initFindAllVersionResource } from "./impl"
import { initFindAllVersionCoreAction, initFindAllVersionCoreMaterial } from "./core/impl"

import { findAllVersionEventHasDone } from "../find_all/impl/core"

import { GetVersionsRemotePod, GetVersionsSimulator } from "../find_all/infra"

import { FindAllVersionResource } from "./resource"

import { FindAllVersionCoreState } from "./core/action"

describe("FindAllVersion", () => {
    test("find all", () =>
        new Promise<void>((done) => {
            const { resource } = standard()

            const runner = setupAsyncActionTestRunner(actionHasDone, [
                {
                    statement: () => {
                        resource.findAll.ignite()
                    },
                    examine: (stack) => {
                        expect(stack).toEqual([
                            {
                                type: "succeed-to-find",
                                versions: [
                                    { version: "1.1.0", isCurrent: true },
                                    { version: "1.0.0", isCurrent: false },
                                ],
                            },
                        ])
                    },
                },
            ])

            resource.findAll.subscriber.subscribe(runner(done))
        }))

    test("find all; take longtime", () =>
        new Promise<void>((done) => {
            const { resource } = takeLongtime()

            const runner = setupAsyncActionTestRunner(actionHasDone, [
                {
                    statement: () => {
                        resource.findAll.ignite()
                    },
                    examine: (stack) => {
                        expect(stack).toEqual([
                            { type: "take-longtime-to-find" },
                            {
                                type: "succeed-to-find",
                                versions: [
                                    { version: "1.1.0", isCurrent: true },
                                    { version: "1.0.0", isCurrent: false },
                                ],
                            },
                        ])
                    },
                },
            ])

            resource.findAll.subscriber.subscribe(runner(done))
        }))
})

function standard() {
    const resource = initResource(standard_get())

    return { resource }
}
function takeLongtime() {
    const resource = initResource(takeLongtime_get())

    return { resource }
}

function initResource(get: GetVersionsRemotePod): FindAllVersionResource {
    const version = standard_version()
    const versionsURL = standard_versionsURL()
    return initFindAllVersionResource(
        initFindAllVersionCoreAction(
            initFindAllVersionCoreMaterial({
                get,
                version,
                versionsURL,
                config: {
                    takeLongtimeThreshold: { delay_millisecond: 32 },
                },
            }),
        ),
    )
}

function standard_version(): string {
    return "1.1.0"
}
function standard_versionsURL(): string {
    return "/versions.txt"
}

function standard_get(): GetVersionsRemotePod {
    return mockRemotePod(getVersionsSimulator, { wait_millisecond: 0 })
}
function takeLongtime_get(): GetVersionsRemotePod {
    return mockRemotePod(getVersionsSimulator, { wait_millisecond: 64 })
}
const getVersionsSimulator: GetVersionsSimulator = () => ({
    success: true,
    value: { versions: ["1.1.0", "1.0.0"] },
})

function actionHasDone(state: FindAllVersionCoreState): boolean {
    switch (state.type) {
        case "initial-all-version":
            return false

        default:
            return findAllVersionEventHasDone(state)
    }
}
