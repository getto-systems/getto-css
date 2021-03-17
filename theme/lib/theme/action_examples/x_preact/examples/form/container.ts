import { h, VNode } from "preact"
import { useState } from "preact/hooks"
import { html } from "htm/preact"

import { container } from "../../../../../z_vendor/getto-css/preact/design/box"

import { ComplexComponent } from "./complex"
import { MiscComponent } from "./misc"
import { TextBoxComponent } from "./text_box"
import { PasswordBoxComponent } from "./password_box"
import { NumberBoxComponent } from "./number_box"
import { EmailBoxComponent } from "./email_box"
import { SearchBoxComponent } from "./search_box"
import { TextAreaComponent } from "./textarea"
import { RadioComponent } from "./radio"
import { CheckboxComponent } from "./checkbox"
import { ModalProps, ModalState } from "./modal"
import { ButtonComponent } from "./button"

type ContainerProps = {
    // no props
}
export function FormContainerComponent(_: ContainerProps): VNode {
    return html`
        ${container([h(ComplexComponent, useComplexProps())])}
        ${container([
            h(ButtonComponent, NO_PROPS),
            h(MiscComponent, useEditingFormProps()),
            h(RadioComponent, useEditingFormProps()),
            h(CheckboxComponent, useEditingFormProps()),
        ])}
        ${container([
            h(NumberBoxComponent, useEditingFormProps()),
            h(EmailBoxComponent, useEditingFormProps()),
            h(TextBoxComponent, useEditingFormProps()),
            h(PasswordBoxComponent, useEditingFormProps()),
            h(SearchBoxComponent, useEditingFormProps()),
            h(TextAreaComponent, useEditingFormProps()),
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
