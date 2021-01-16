import { FindInfra } from "../infra"

import { FindPod } from "../action"
import { markVersion } from "../data"

export const find = (infra: FindInfra): FindPod => () => async (post) => {
    const { currentVersion } = infra

    post({
        type: "succeed-to-find",
        currentVersion: markVersion(currentVersion),
    })
}
