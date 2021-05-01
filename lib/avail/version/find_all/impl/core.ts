import { delayedChecker } from "../../../../z_vendor/getto-application/infra/timer/helper"
import { allVersionsRemoteConverter } from "./converter"

import { FindAllVersionInfra } from "../infra"

import { FindAllVersionMethod } from "../method"

interface Find {
    (infra: FindAllVersionInfra): FindAllVersionMethod
}
export const findAllVersion: Find = (infra) => async (post) => {
    const { version, versionsURL, config } = infra
    const get = infra.get(allVersionsRemoteConverter(version))

    // ネットワークの状態が悪い可能性があるので、一定時間後に take longtime イベントを発行
    const response = await delayedChecker(get(versionsURL), config.takeLongtimeThreshold, () =>
        post({ type: "take-longtime-to-find" }),
    )
    if (!response.success) {
        return post({ type: "failed-to-find", err: response.err })
    }

    return post({ type: "succeed-to-find", versions: response.value })
}
