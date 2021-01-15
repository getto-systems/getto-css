import { h, VNode } from "preact"
import { html } from "htm/preact"

export type ModalProps<C> = Readonly<{
    state: ModalState
    component: C
}>
export interface ModalContent<C> {
    (props: ModalContentProps<C>): VNode
}
export type ModalContentProps<C> = Readonly<{
    state: ModalContentState
    component: C
}>

export type ModalState =
    | Readonly<{ active: false }>
    | Readonly<{ active: true; state: ModalContentState }>

export type ModalContentState = Readonly<{ connecting: boolean }>

export function Modal<C>(content: ModalContent<C>): { (props: ModalProps<C>): VNode } {
    return (props) => {
        const { state, component } = props
        if (!state.active) {
            return html``
        }

        const contentProps = { state: state.state, component }
        return html`<aside class="modal">${h(content, contentProps)}</aside>`
    }
}
