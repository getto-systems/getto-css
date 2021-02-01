export class BaseComponent<S> {
    listener: Post<S>[] = []

    onStateChange(post: Post<S>): void {
        this.listener.push(post)
    }
    post(state: S): void {
        this.listener.forEach((post) => post(state))
    }

    terminate(): void {
        this.listener.splice(0, this.listener.length)
    }
}

interface Post<T> {
    (state: T): void
}
