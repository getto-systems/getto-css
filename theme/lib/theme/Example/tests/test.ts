import { ExampleRepository, ExampleSimulator, newExampleResource } from "./core"

import { initMemoryApiCredentialRepository } from "../../../auth/common/credential/impl/repository/apiCredential/memory"
import { initMemoryMenuExpandRepository } from "../../../auth/permission/menu/impl/repository/menuExpand/memory"

import { MenuBadge, MenuTree } from "../../../auth/permission/menu/infra"

import { ApiNonce, markApiNonce, markApiRoles } from "../../../auth/common/credential/data"

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
        apiCredentials: initMemoryApiCredentialRepository(
            markApiNonce("api-nonce"),
            markApiRoles(["admin"])
        ),
        menuExpands: initMemoryMenuExpandRepository([]),
    }
}

function standardSimulator(): ExampleSimulator {
    return {
        menuBadge: menuBadgeSimulator(),
    }
}

function menuBadgeSimulator() {
    return {
        getMenuBadge: async (_apiNonce: ApiNonce): Promise<MenuBadge> => {
            return {}
        },
    }
}
