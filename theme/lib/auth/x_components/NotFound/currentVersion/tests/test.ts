import { newNotFoundResource } from "../../EntryPoint/tests/core"

import { CurrentVersionState } from "../component"

describe("CurrentVersion", () => {
    test("load current version", (done) => {
        const { resource } = standardResource()

        resource.currentVersion.addStateHandler(stateHandler())

        resource.currentVersion.load()

        function stateHandler(): Listener<CurrentVersionState> {
            const stack: CurrentVersionState[] = []
            return (state) => {
                stack.push(state)

                switch (state.type) {
                    case "initial-current-version":
                        // work in progress...
                        break

                    case "succeed-to-find":
                        expect(stack).toEqual([
                            {
                                type: "succeed-to-find",
                                currentVersion: "1.0.0",
                            },
                        ])
                        done()
                        break

                    default:
                        assertNever(state)
                }
            }
        }
    })
})

function standardResource() {
    const version = standardVersion()
    const resource = newNotFoundResource(version)

    return { resource }
}

function standardVersion(): string {
    return "1.0.0"
}

interface Listener<T> {
    (state: T): void
}

function assertNever(_: never): never {
    throw new Error("NEVER")
}