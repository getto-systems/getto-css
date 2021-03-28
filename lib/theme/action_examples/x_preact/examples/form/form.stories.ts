import "../../../../../theme/css"
import { h } from "preact"

import { enumKeys, storyTemplate } from "../../../../../z_vendor/storybook/preact/story"

import { ComplexComponent } from "./complex"
import { CompleteAction, DeleteAction, FormAction, FormState } from "./container"
import { ModalState } from "./modal"

enum FormEnum {
    "initial",
    "editing",
    "invalid",
    "modified",
    "undoEnabled",
    "redoEnabled",
    "try-to-save",
    "complete",
    "try-to-complete",
    "delete",
    "try-to-delete",
}

export default {
    title: "Theme/Examples/Form",
    argTypes: {
        form: {
            control: { type: "select", options: enumKeys(FormEnum) },
        },
    },
}

type MockProps = Readonly<{
    form: keyof typeof FormEnum
}>

const template = storyTemplate<MockProps>((props) => {
    const { state, modal } = map()
    return h(ComplexComponent, {
        state,
        action: mockFormAction(),
        modal: {
            complete: { state: modal.complete, component: mockCompleteAction() },
            delete: { state: modal.delete, component: mockDeleteAction() },
        },
    })

    type ComplexState = Readonly<{
        state: FormState
        modal: Readonly<{
            complete: ModalState
            delete: ModalState
            generate: ModalState
        }>
    }>
    function map(): ComplexState {
        switch (props.form) {
            case "initial":
                return {
                    state: {
                        type: "static",
                    },
                    modal: {
                        complete: { active: false },
                        delete: { active: false },
                        generate: { active: false },
                    },
                }

            case "editing":
                return {
                    state: {
                        type: "editing",
                        state: {
                            modified: false,
                            invalid: false,
                            undoEnabled: false,
                            redoEnabled: false,
                        },
                    },
                    modal: {
                        complete: { active: false },
                        delete: { active: false },
                        generate: { active: false },
                    },
                }

            case "invalid":
                return {
                    state: {
                        type: "editing",
                        state: {
                            modified: true,
                            invalid: true,
                            undoEnabled: false,
                            redoEnabled: false,
                        },
                    },
                    modal: {
                        complete: { active: false },
                        delete: { active: false },
                        generate: { active: false },
                    },
                }

            case "modified":
                return {
                    state: {
                        type: "editing",
                        state: {
                            modified: true,
                            invalid: false,
                            undoEnabled: false,
                            redoEnabled: false,
                        },
                    },
                    modal: {
                        complete: { active: false },
                        delete: { active: false },
                        generate: { active: false },
                    },
                }

            case "undoEnabled":
                return {
                    state: {
                        type: "editing",
                        state: {
                            modified: true,
                            invalid: false,
                            undoEnabled: true,
                            redoEnabled: false,
                        },
                    },
                    modal: {
                        complete: { active: false },
                        delete: { active: false },
                        generate: { active: false },
                    },
                }

            case "redoEnabled":
                return {
                    state: {
                        type: "editing",
                        state: {
                            modified: true,
                            invalid: false,
                            undoEnabled: false,
                            redoEnabled: true,
                        },
                    },
                    modal: {
                        complete: { active: false },
                        delete: { active: false },
                        generate: { active: false },
                    },
                }

            case "try-to-save":
                return {
                    state: {
                        type: "try-to-save",
                        state: {
                            modified: false,
                            invalid: false,
                            undoEnabled: false,
                            redoEnabled: false,
                        },
                    },
                    modal: {
                        complete: { active: false },
                        delete: { active: false },
                        generate: { active: false },
                    },
                }

            case "complete":
                return {
                    state: {
                        type: "static",
                    },
                    modal: {
                        complete: { active: true, state: { connecting: false } },
                        delete: { active: false },
                        generate: { active: false },
                    },
                }

            case "try-to-complete":
                return {
                    state: {
                        type: "static",
                    },
                    modal: {
                        complete: { active: true, state: { connecting: true } },
                        delete: { active: false },
                        generate: { active: false },
                    },
                }

            case "delete":
                return {
                    state: {
                        type: "static",
                    },
                    modal: {
                        complete: { active: false },
                        delete: { active: true, state: { connecting: false } },
                        generate: { active: false },
                    },
                }

            case "try-to-delete":
                return {
                    state: {
                        type: "static",
                    },
                    modal: {
                        complete: { active: false },
                        delete: { active: true, state: { connecting: true } },
                        generate: { active: false },
                    },
                }
        }
    }
})

function mockFormAction(): FormAction {
    return {
        edit: noop,
        close: noop,
        inputInvalidValue: noop,
        inputValidValue: noop,
        undo: noop,
        redo: noop,
        save: noop,
        delete: noop,
    }
}
function mockCompleteAction(): CompleteAction {
    return {
        open: noop,
        close: noop,
        complete: noop,
    }
}
function mockDeleteAction(): DeleteAction {
    return {
        open: noop,
        close: noop,
        delete: noop,
    }
}
function noop() {
    // 何もしない
}

export const Form = template({ form: "initial" })
