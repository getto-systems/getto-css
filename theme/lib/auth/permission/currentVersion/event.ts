import { Version } from "./data";

export type FindEvent = Readonly<{ type: "succeed-to-find"; currentVersion: Version }>
