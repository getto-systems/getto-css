import { env } from "../../../../y_environment/env"

import { newGetVersionsRemote } from "../infra/remote/get_versions"

import { FindAllVersionInfra } from "../infra"

export function newFindAllVersionInfra(): FindAllVersionInfra {
    return {
        version: env.version,
        versionsURL: env.isProduction ? "/versions.txt" : "/root/versions.txt",
        get: newGetVersionsRemote(),
        config: {
            takeLongtimeThreshold: { delay_millisecond: 300 },
        },
    }
}
