import { h, VNode } from "preact"
import { html } from "htm/preact"

export type ModalProps = ModalBaseProps &
    Readonly<{
        modal: ModalState
    }>
export type ModalContentProps = ModalBaseProps &
    Readonly<{
        connecting: boolean
    }>
type ModalBaseProps = Readonly<{
    onOpen: Post<null>
    onConnect: Post<null>
    onClose: Post<null>
}>
type ModalFullProps = ModalProps &
    Readonly<{
        content: { (props: ModalContentProps): VNode }
    }>
export type ModalState = Readonly<{ active: false }> | Readonly<{ active: true; connecting: boolean }>

export function Modal(props: ModalFullProps): VNode {
    const { modal, content } = props
    if (!modal.active) {
        return html``
    }

    const contentProps = { ...props, connecting: modal.connecting }
    return html`<aside class="modal">${h(content, contentProps)}</aside>`
}

interface Post<T> {
    (event: T): void
}
