import { FindInfra } from "../infra"

import { FindPod } from "../action"
import { AllVersions, markVersion } from "../data"

export const find = (infra: FindInfra): FindPod => () => async (post) => {
    const { find, config, delayed, currentVersion } = infra

    post({ type: "try-to-find", currentVersion: markVersion(currentVersion) })

    // ネットワークの状態が悪い可能性があるので、一定時間後に delayed イベントを発行
    const response = await delayed(find.find(), config.delay, () =>
        post({ type: "delayed-to-find", currentVersion: markVersion(currentVersion) })
    )
    if (!response.success) {
        post({ type: "failed-to-find", err: response.err, currentVersion: markVersion(currentVersion) })
        return
    }
    if (!response.found) {
        // 見つからなかった場合は空の配列をもとに作成する
        post({
            type: "succeed-to-find",
            versions: allVersions([]),
            currentVersion: markVersion(currentVersion),
        })
        return
    }

    post({
        type: "succeed-to-find",
        versions: allVersions(response.versions),
        currentVersion: markVersion(currentVersion),
    })

    function allVersions(versions: string[]): AllVersions {
        if (!versions.includes(currentVersion)) {
            versions.push(currentVersion)
        }

        return versions
            .map((version) => {
                return {
                    version: markVersion(version),
                    isCurrent: version === currentVersion,
                }
            })
            .reverse() // 最新順で返す
    }
}
