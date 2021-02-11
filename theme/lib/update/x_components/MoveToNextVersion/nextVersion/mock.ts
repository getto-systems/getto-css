import { MockComponent, MockPropsPasser } from "../../../../sub/getto-example/x_components/Application/mock"

import { NextVersionComponent, NextVersionState } from "./component"

export type NextVersionMockPropsPasser = MockPropsPasser<NextVersionMockProps>
export type NextVersionMockProps =
    | Readonly<{ type: "delayed" }>
    | Readonly<{ type: "failed"; err: string }>

export function initNextVersionComponent(passer: NextVersionMockPropsPasser): NextVersionMockComponent {
    return new NextVersionMockComponent(passer)
}

class NextVersionMockComponent extends MockComponent<NextVersionState> implements NextVersionComponent {
    constructor(passer: NextVersionMockPropsPasser) {
        super()
        passer.addPropsHandler((props) => {
            this.post(mapProps(props))
        })

        function mapProps(props: NextVersionMockProps): NextVersionState {
            switch (props.type) {
                case "delayed":
                    return { type: "delayed-to-find" }

                case "failed":
                    return {
                        type: "failed-to-find",
                        err: { type: "failed-to-check", err: { type: "infra-error", err: props.err } },
                    }
            }
        }
    }

    find(): void {
        // mock ではなにもしない
    }
}
