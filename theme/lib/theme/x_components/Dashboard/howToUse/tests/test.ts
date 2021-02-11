import { initMenuExpandTestStorage } from "../../../../../auth/x_components/Outline/Menu/tests/core"
import {
    DashboardConfig,
    DashboardRepository,
    DashboardSimulator,
    newDashboardResource,
} from "../../EntryPoint/tests/core"

import { initMenuExpandRepository } from "../../../../../auth/permission/menu/impl/repository/menuExpand"

import { MenuBadge, MenuTree } from "../../../../../auth/permission/menu/infra"

import { HowToUseState } from "../component"

import { wait } from "../../../../../z_infra/delayed/core"

describe("HowToUse", () => {
    test("load versions", (done) => {
        const { resource } = standardResource()

        resource.howToUse.addStateHandler(stateHandler())

        resource.howToUse.load()

        function stateHandler(): Listener<HowToUseState> {
            const stack: HowToUseState[] = []
            return (state) => {
                stack.push(state)

                switch (state.type) {
                    case "initial-how-to-use":
                    case "try-to-find":
                    case "delayed-to-find":
                        // work in progress...
                        break

                    case "succeed-to-find":
                        expect(stack).toEqual([
                            { type: "try-to-find", currentVersion: "1.0.0" },
                            {
                                type: "succeed-to-find",
                                currentVersion: "1.0.0",
                                versions: [
                                    { version: "1.0.0", isCurrent: true },
                                    { version: "0.0.1", isCurrent: false },
                                ],
                            },
                        ])
                        done()
                        break

                    case "failed-to-find":
                        done(new Error(state.type))
                        break

                    default:
                        assertNever(state)
                }
            }
        }
    })

    test("load versions; without current version", (done) => {
        const { resource } = withoutCurrentVersionResource()

        resource.howToUse.addStateHandler(stateHandler())

        resource.howToUse.load()

        function stateHandler(): Listener<HowToUseState> {
            const stack: HowToUseState[] = []
            return (state) => {
                stack.push(state)

                switch (state.type) {
                    case "initial-how-to-use":
                    case "try-to-find":
                    case "delayed-to-find":
                        // work in progress...
                        break

                    case "succeed-to-find":
                        expect(stack).toEqual([
                            { type: "try-to-find", currentVersion: "1.0.0" },
                            {
                                type: "succeed-to-find",
                                currentVersion: "1.0.0",
                                versions: [
                                    { version: "1.0.0", isCurrent: true },
                                    { version: "0.0.1", isCurrent: false },
                                ],
                            },
                        ])
                        done()
                        break

                    case "failed-to-find":
                        done(new Error(state.type))
                        break

                    default:
                        assertNever(state)
                }
            }
        }
    })

    test("load versions; delayed", (done) => {
        const { resource } = waitResource()

        resource.howToUse.addStateHandler(stateHandler())

        resource.howToUse.load()

        function stateHandler(): Listener<HowToUseState> {
            const stack: HowToUseState[] = []
            return (state) => {
                stack.push(state)

                switch (state.type) {
                    case "initial-how-to-use":
                    case "try-to-find":
                    case "delayed-to-find":
                        // work in progress...
                        break

                    case "succeed-to-find":
                        expect(stack).toEqual([
                            { type: "try-to-find", currentVersion: "1.0.0" },
                            { type: "delayed-to-find", currentVersion: "1.0.0" },
                            {
                                type: "succeed-to-find",
                                currentVersion: "1.0.0",
                                versions: [
                                    { version: "1.0.0", isCurrent: true },
                                    { version: "0.0.1", isCurrent: false },
                                ],
                            },
                        ])
                        done()
                        break

                    case "failed-to-find":
                        done(new Error(state.type))
                        break

                    default:
                        assertNever(state)
                }
            }
        }
    })

    test("terminate", (done) => {
        const { resource } = waitResource()

        resource.howToUse.addStateHandler(stateHandler)
        resource.howToUse.removeStateHandler(stateHandler)

        resource.howToUse.terminate()
        done()

        function stateHandler() {
            // do nothing
        }
    })
})

function standardResource() {
    const version = standardVersion()
    const url = standardURL()
    const menuTree = standardMenuTree()
    const config = standardConfig()
    const repository = standardRepository()
    const simulator = standardSimulator()
    const resource = newDashboardResource(version, url, menuTree, config, repository, simulator)

    return { repository, resource }
}
function withoutCurrentVersionResource() {
    const version = standardVersion()
    const url = standardURL()
    const menuTree = standardMenuTree()
    const config = standardConfig()
    const repository = standardRepository()
    const simulator = withoutCurrentVersionSimulator()
    const resource = newDashboardResource(version, url, menuTree, config, repository, simulator)

    return { repository, resource }
}
function waitResource() {
    const version = standardVersion()
    const url = standardURL()
    const menuTree = standardMenuTree()
    const config = standardConfig()
    const repository = standardRepository()
    const simulator = waitSimulator()
    const resource = newDashboardResource(version, url, menuTree, config, repository, simulator)

    return { repository, resource }
}

function standardVersion(): string {
    return "1.0.0"
}

function standardURL(): URL {
    return new URL("https://example.com/1.0.0/index.html")
}

function standardMenuTree(): MenuTree {
    return []
}

function standardConfig(): DashboardConfig {
    return {
        allVersions: {
            find: {
                delay: { delay_millisecond: 1 },
            },
        },
    }
}

function standardRepository(): DashboardRepository {
    return {
        menuExpands: initMenuExpandRepository(initMenuExpandTestStorage({ menuExpand: { set: false } })),
    }
}

function standardSimulator(): DashboardSimulator {
    return {
        menuBadge: menuBadgeSimulator(),
        find: {
            find: async (): Promise<string[]> => {
                return ["0.0.1", "1.0.0"]
            },
        },
    }
}
function withoutCurrentVersionSimulator(): DashboardSimulator {
    return {
        menuBadge: menuBadgeSimulator(),
        find: {
            find: async (): Promise<string[]> => {
                return ["0.0.1"]
            },
        },
    }
}
function waitSimulator(): DashboardSimulator {
    return {
        menuBadge: menuBadgeSimulator(),
        find: {
            find: async (): Promise<string[]> => {
                3
                await wait({ wait_millisecond: 2 }, () => null)
                return ["0.0.1", "1.0.0"]
            },
        },
    }
}

function menuBadgeSimulator() {
    return {
        getMenuBadge: async (): Promise<MenuBadge> => {
            return {}
        },
    }
}

interface Listener<T> {
    (state: T): void
}

function assertNever(_: never): never {
    throw new Error("NEVER")
}
