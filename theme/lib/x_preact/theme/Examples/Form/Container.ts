import { h, VNode } from "preact"
import { useState } from "preact/hooks"
import { html } from "htm/preact"

import { container } from "../../../../z_vendor/getto-css/preact/design/box"

import { Complex } from "./Complex"
import { Misc } from "./Misc"
import { TextBox } from "./TextBox"
import { PasswordBox } from "./PasswordBox"
import { NumberBox } from "./NumberBox"
import { EmailBox } from "./EmailBox"
import { SearchBox } from "./SearchBox"
import { TextArea } from "./TextArea"
import { Radio } from "./Radio"
import { Checkbox } from "./Checkbox"
import { ModalProps, ModalState } from "./Modal"
import { Button } from "./Button"

type ContainerProps = {
    // no props
}
export function Container(_: ContainerProps): VNode {
    return html`
        ${container([h(Complex, useComplexProps())])}
        ${container([
            h(Button, NO_PROPS),
            h(Misc, useEditingFormProps()),
            h(Radio, useEditingFormProps()),
            h(Checkbox, useEditingFormProps()),
        ])}
        ${container([
            h(NumberBox, useEditingFormProps()),
            h(EmailBox, useEditingFormProps()),
            h(TextBox, useEditingFormProps()),
            h(PasswordBox, useEditingFormProps()),
            h(SearchBox, useEditingFormProps()),
            h(TextArea, useEditingFormProps()),
        ])}
    `

    function useStaticFormProps(action: { delete: Action<null> }): FormProps {
        return useFormProps({ type: "static" }, action)
    }
    function useEditingFormProps(): FormProps {
        return useFormProps(initialFormEditing, {
            delete: () => {
                // なにもしない
            },
        })
    }
    function useFormProps(initialState: FormState, action: { delete: Action<null> }): FormProps {
        const [state, setState] = useState<FormState>(initialState)
        const component: FormComponent = {
            edit: () => {
                setState(initialFormEditing)
            },
            close: () => {
                setState({ type: "static" })
            },
            inputValidValue: () => {
                setState({
                    type: "editing",
                    state: {
                        modified: true,
                        invalid: false,
                        undoEnabled: true,
                        redoEnabled: false,
                    },
                })
            },
            inputInvalidValue: () => {
                setState({
                    type: "editing",
                    state: {
                        modified: true,
                        invalid: true,
                        undoEnabled: true,
                        redoEnabled: false,
                    },
                })
            },
            undo: () => {
                setState({
                    type: "editing",
                    state: {
                        modified: false,
                        invalid: false,
                        undoEnabled: false,
                        redoEnabled: true,
                    },
                })
            },
            redo: () => {
                setState({
                    type: "editing",
                    state: {
                        modified: true,
                        invalid: false,
                        undoEnabled: true,
                        redoEnabled: false,
                    },
                })
            },
            save: () => {
                setState({ type: "try-to-save", state: initialEditState })

                setTimeout(() => {
                    setState(initialFormEditing)
                }, 3000)
            },
            ...action,
        }
        return { state, component }
    }
    function useComplexProps() {
        const modal = {
            complete: useCompleteModal(),
            delete: useDeleteModal(),
        }
        return {
            ...useStaticFormProps({
                delete: () => {
                    modal.delete.component.open(null)
                },
            }),
            modal,
        }
    }

    function useCompleteModal(): ModalProps<CompleteComponent> {
        const [state, setState] = useState<ModalState>({ active: false })
        const component: CompleteComponent = {
            open: () => {
                setState({ active: true, state: { connecting: false } })
            },
            complete: () => {
                setState({ active: true, state: { connecting: true } })

                setTimeout(() => {
                    setState({ active: false })
                }, 3000)
            },
            close: () => {
                setState({ active: false })
            },
        }
        return { state, component }
    }
    function useDeleteModal(): ModalProps<DeleteComponent> {
        const [state, setState] = useState<ModalState>({ active: false })
        const component: DeleteComponent = {
            open: () => {
                setState({ active: true, state: { connecting: false } })
            },
            delete: () => {
                setState({ active: true, state: { connecting: true } })

                setTimeout(() => {
                    setState({ active: false })
                }, 3000)
            },
            close: () => {
                setState({ active: false })
            },
        }
        return { state, component }
    }
}

export type FormProps = Readonly<{
    state: FormState
    component: FormComponent
}>
export interface FormComponent {
    edit: Action<null>
    close: Action<null>
    inputValidValue: Action<null>
    inputInvalidValue: Action<null>
    undo: Action<null>
    redo: Action<null>
    save: Action<null>
    delete: Action<null>
}
export type FormState =
    | Readonly<{ type: "static" }>
    | Readonly<{ type: "editing"; state: EditState }>
    | Readonly<{ type: "try-to-save"; state: EditState }>

export type EditState = Readonly<{
    modified: boolean
    invalid: boolean
    undoEnabled: boolean
    redoEnabled: boolean
}>

const initialEditState: EditState = {
    modified: false,
    invalid: false,
    undoEnabled: false,
    redoEnabled: false,
}
const initialFormEditing: FormState = {
    type: "editing",
    state: initialEditState,
}

export interface CompleteComponent {
    open: Action<null>
    complete: Action<null>
    close: Action<null>
}

export interface DeleteComponent {
    open: Action<null>
    delete: Action<null>
    close: Action<null>
}

const NO_PROPS = {}

interface Action<T> {
    (event: T): void
}