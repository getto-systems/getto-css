import { initNextVersionComponent, NextVersionMockPropsPasser } from "../nextVersion/mock"

import { MoveToNextVersionEntryPoint } from "./entryPoint"

export function newMockMoveToNextVersion(
    passer: NextVersionMockPropsPasser
): MoveToNextVersionEntryPoint {
    return {
        resource: {
            nextVersion: initNextVersionComponent(passer),
        },
        terminate: () => {
            // mock では特に何もしない
        },
    }
}
