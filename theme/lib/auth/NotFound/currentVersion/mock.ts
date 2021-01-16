import { MockComponent } from "../../../z_external/mock/component"
import { markVersion } from "../../permission/currentVersion/data"

import { CurrentVersionComponent, CurrentVersionState } from "./component"

export function initCurrentVersionComponent(state: CurrentVersionState): CurrentVersionMockComponent {
    return new CurrentVersionMockComponent(state)
}

export type CurrentVersionMockProps = Readonly<{ type: "success" }>

export function mapCurrentVersionMockProps(props: CurrentVersionMockProps): CurrentVersionState {
    switch (props.type) {
        case "success":
            return {
                type: "succeed-to-find",
                currentVersion: markVersion("1.1.0"),
            }
    }
}

class CurrentVersionMockComponent
    extends MockComponent<CurrentVersionState>
    implements CurrentVersionComponent {
    load() {
        // mock では特に何もしない
    }
}
