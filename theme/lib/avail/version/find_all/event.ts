import { GetVersionsError, VersionInfo } from "./data"

export type FindAllVersionEvent =
    | Readonly<{ type: "take-longtime-to-find" }>
    | Readonly<{ type: "failed-to-find"; err: GetVersionsError }>
    | Readonly<{ type: "succeed-to-find"; versions: VersionInfo[] }>
