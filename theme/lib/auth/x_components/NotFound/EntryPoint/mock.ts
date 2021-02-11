import { CurrentVersionMockPropsPasser, initMockCurrentVersionComponent } from "../currentVersion/mock"

import { NotFoundEntryPoint } from "./entryPoint"

export function newMockNotFound(passer: CurrentVersionMockPropsPasser): NotFoundEntryPoint {
    const resource = {
        currentVersion: initMockCurrentVersionComponent(passer),
    }
    return {
        resource,
        terminate: () => {
            // mock では特に何もしない
        },
    }
}
