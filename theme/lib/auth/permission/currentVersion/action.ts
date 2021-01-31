import { FindEvent } from "./event"

export type CurrentVersionAction = Readonly<{
    find: FindPod
}>

export interface FindPod {
    (): Find
}
export interface Find {
    (post: Post<FindEvent>): void
}

interface Post<T> {
    (event: T): void
}
