import { FindAllVersionEvent } from "./event"

export interface FindAllVersionMethod {
    (post: Post<FindAllVersionEvent>): void
}

interface Post<T> {
    (event: T): void
}
