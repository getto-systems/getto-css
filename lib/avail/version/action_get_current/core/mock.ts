import { versionStringConfigConverter } from "../../converter"

import { GetCurrentVersionCoreAction } from "./action"

export function mockGetCurrentVersionCoreAction(version: string): GetCurrentVersionCoreAction {
    return {
        getCurrent: () => versionStringConfigConverter(version),
    }
}
