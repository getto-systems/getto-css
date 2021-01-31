import { MockComponent } from "../../../sub/getto-example/component/mock"
import { AllVersions, markVersion } from "../../allVersions/data"

import { HowToUseComponent, HowToUseState } from "./component"

export function initHowToUseComponent(state: HowToUseState): HowToUseMockComponent {
    return new HowToUseMockComponent(state)
}

export type HowToUseMockProps =
    | Readonly<{ type: "success" }>
    | Readonly<{ type: "try" }>
    | Readonly<{ type: "delayed" }>
    | Readonly<{ type: "failed"; err: string }>

export function mapHowToUseMockProps(props: HowToUseMockProps): HowToUseState {
    switch (props.type) {
        case "success":
            return {
                type: "succeed-to-find",
                versions: allVersions(),
                currentVersion: markVersion("1.1.0"),
            }

        case "try":
            return { type: "try-to-find", currentVersion: markVersion("1.1.0") }

        case "delayed":
            return { type: "delayed-to-find", currentVersion: markVersion("1.1.0") }

        case "failed":
            return {
                type: "failed-to-find",
                err: { type: "infra-error", err: props.err },
                currentVersion: markVersion("1.1.0"),
            }
    }
}

function allVersions(): AllVersions {
    return [
        { version: markVersion("0.0.1"), isCurrent: false },
        { version: markVersion("1.0.0"), isCurrent: false },
        { version: markVersion("1.1.0"), isCurrent: true },
    ]
}

class HowToUseMockComponent extends MockComponent<HowToUseState> implements HowToUseComponent {
    load() {
        // mock では特に何もしない
    }
}
