import { BaseTypes } from "../action_base/resource"

type ExamplesTypes = BaseTypes<EmptyResource>
type EmptyResource = {
    // no resource
}

export type ExamplesView = ExamplesTypes["view"]
export type ExamplesResource = ExamplesTypes["resource"]
