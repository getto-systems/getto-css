import { FindAllVersionEvent } from "./event"

export interface FindAllVersionMethod {
    <S>(post: Post<FindAllVersionEvent, S>): Promise<S>
}

interface Post<E, S> {
    (event: E): S
}
