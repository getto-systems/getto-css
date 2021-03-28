import { ApplicationMockStateAction } from "../../../../z_vendor/getto-application/action/mock"

import {
    FindAllVersionCoreState,
    FindAllVersionCoreAction,
    initialFindAllVersionCoreState,
} from "./action"

export function mockFindAllVersionCoreAction(): FindAllVersionCoreAction {
    return new Action()
}

class Action
    extends ApplicationMockStateAction<FindAllVersionCoreState>
    implements FindAllVersionCoreAction {
    readonly initialState = initialFindAllVersionCoreState
}
