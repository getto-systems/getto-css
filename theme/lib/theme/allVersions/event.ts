import { AllVersions, FindError, Version } from "./data"

export type FindEvent =
    | Readonly<{ type: "try-to-find"; currentVersion: Version }>
    | Readonly<{ type: "delayed-to-find"; currentVersion: Version }>
    | Readonly<{ type: "failed-to-find"; err: FindError; currentVersion: Version }>
    | Readonly<{ type: "succeed-to-find"; versions: AllVersions; currentVersion: Version }>
