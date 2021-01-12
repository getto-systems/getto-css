import { h, VNode } from "preact"
import { useState } from "preact/hooks"
import { html } from "htm/preact"

import { container } from "../../../common/layout"

import { Complex } from "./Complex"
import { Misc } from "./Misc"
import { TextBox } from "./TextBox"
import { NumberBox } from "./NumberBox"
import { EmailBox } from "./EmailBox"
import { SearchBox } from "./SearchBox"
import { TextArea } from "./TextArea"
import { Radio } from "./Radio"
import { Checkbox } from "./Checkbox"
import { ModalState } from "./Modal"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
    return html`
        ${container([h(Complex, useComplex())])}
        ${container([h(Misc, useForm()), h(Radio, useForm()), h(Checkbox, useForm())])}
        ${container([
            h(TextBox, useForm()),
            h(SearchBox, useForm()),
            h(NumberBox, useForm()),
            h(EmailBox, useForm()),
            h(TextArea, useForm()),
        ])}
    `

    function useForm() {
        const [state, setState] = useState({
            saving: false,
            editing: false,            
            modified: false,
            invalid: false,
            undoEnabled: false,
            redoEnabled: false,
        })
        return {
            ...state,
            onEdit: () => {
                setState({
                    ...state,
                    editing: true,
                })
            },
            onClose: () => {
                setState({
                    ...state,
                    editing: false,
                })
            },
            onInput: () => {
                setState({ ...state, modified: true, invalid: false, undoEnabled: true })
            },
            onInputAsInvalid: () => {
                setState({ ...state, modified: true, invalid: true, undoEnabled: true })
            },
            onSave: () => {
                setState({
                    ...state,
                    saving: true,
                    modified: false,
                    invalid: false,
                    undoEnabled: false,
                    redoEnabled: false,
                })

                setTimeout(() => {
                    setState({
                        ...state,
                        saving: false,
                        modified: false,
                        invalid: false,
                        undoEnabled: false,
                        redoEnabled: false,
                    })
                }, 3000)
            },
            onUndo: () => {
                setState({
                    ...state,
                    modified: false,
                    invalid: false,
                    undoEnabled: false,
                    redoEnabled: true,
                })
            },
            onRedo: () => {
                setState({
                    ...state,
                    modified: false,
                    invalid: false,
                    undoEnabled: true,
                    redoEnabled: false,
                })
            },
        }
    }
    function useComplex() {
        return {
            ...useForm(),
            complete: useModal(),
            delete: useModal(),
            generate: useGenerateModal(),
        }
    }
    function useModal() {
        const [state, setState] = useState<ModalState>({ active: false })
        return {
            modal: state,
            onOpen: () => {
                setState({ active: true, connecting: false })
            },
            onConnect: () => {
                setState({ active: true, connecting: true })

                setTimeout(() => {
                    setState({ active: false })
                }, 3000)
            },
            onClose: () => {
                setState({ active: false })
            },
        }
    }
    function useGenerateModal() {
        const [state, setState] = useState<ModalState>({ active: false })
        return {
            modal: state,
            onOpen: () => {
                setState({ active: true, connecting: true })

                setTimeout(() => {
                    setState({ active: true, connecting: false })
                }, 3000)
            },
            onConnect: () => {
                // 呼ばれないので特に何もしない
            },
            onClose: () => {
                setState({ active: false })
            },
        }
    }
}
