import { MockComponent, MockPropsPasser } from "../../../sub/getto-example/application/mock"
import { markVersion } from "../../permission/currentVersion/data"

import { CurrentVersionComponent, CurrentVersionState } from "./component"

export type CurrentVersionMockPropsPasser = MockPropsPasser<CurrentVersionMockProps>
export type CurrentVersionMockProps = Readonly<{ type: "success" }>

export function initMockCurrentVersionComponent(
    passer: CurrentVersionMockPropsPasser
): CurrentVersionMockComponent {
    return new CurrentVersionMockComponent(passer)
}

class CurrentVersionMockComponent
    extends MockComponent<CurrentVersionState>
    implements CurrentVersionComponent {
    constructor(passer: CurrentVersionMockPropsPasser) {
        super()
        passer.addPropsHandler((props) => {
            this.post(mapProps(props))
        })

        function mapProps(props: CurrentVersionMockProps): CurrentVersionState {
            switch (props.type) {
                case "success":
                    return {
                        type: "succeed-to-find",
                        currentVersion: markVersion("1.1.0"),
                    }
            }
        }
    }
    load() {
        // mock では特に何もしない
    }
}
