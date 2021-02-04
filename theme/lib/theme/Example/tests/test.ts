import { initMenuExpandTestStorage } from "../../../auth/Outline/Menu/tests/core"
import { ExampleRepository, ExampleSimulator, newExampleResource } from "./core"

import { initMenuExpandRepository } from "../../../auth/permission/menu/impl/repository/menuExpand"

import { MenuBadge, MenuTree } from "../../../auth/permission/menu/infra"

describe("Example", () => {
    test("load", (done) => {
        standardResource()

        done()
    })
})

function standardResource() {
    const version = standardVersion()
    const url = standardURL()
    const menuTree = standardMenuTree()
    const repository = standardRepository()
    const simulator = standardSimulator()
    const resource = newExampleResource(version, url, menuTree, repository, simulator)

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

function standardRepository(): ExampleRepository {
    return {
        menuExpands: initMenuExpandRepository(initMenuExpandTestStorage({ menuExpand: { set: false } })),
    }
}

function standardSimulator(): ExampleSimulator {
    return {
        menuBadge: menuBadgeSimulator(),
    }
}

function menuBadgeSimulator() {
    return {
        getMenuBadge: async (): Promise<MenuBadge> => {
            return {}
        },
    }
}
