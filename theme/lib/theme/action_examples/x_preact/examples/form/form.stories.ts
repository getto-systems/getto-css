import "../../../../../theme/css"
import { h, VNode } from "preact"

import { ComplexComponent } from "./complex"
import { CompleteComponent, DeleteComponent, FormComponent, FormState } from "./container"
import { ModalState } from "./modal"

export default {
    title: "Theme/Examples/Form",
    argTypes: {
        type: {
            table: { disable: true },
        },
    },
}

type MockProps =
    | Readonly<{ type: "initial" }>
    | Readonly<{ type: "editing" }>
    | Readonly<{ type: "invalid" }>
    | Readonly<{ type: "modified" }>
    | Readonly<{ type: "undoEnabled" }>
    | Readonly<{ type: "redoEnabled" }>
    | Readonly<{ type: "try-to-save" }>
    | Readonly<{ type: "complete" }>
    | Readonly<{ type: "try-to-complete" }>
    | Readonly<{ type: "delete" }>
    | Readonly<{ type: "try-to-delete" }>

const Template: Story<MockProps> = (args) => {
    const { state, modal } = map(args)
    return h(ComplexComponent, {
        state,
        component: initMockFormComponent(),
        modal: {
            complete: { state: modal.complete, component: initMockCompleteComponent() },
            delete: { state: modal.delete, component: initMockDeleteComponent() },
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
    function map(args: MockProps): ComplexState {
        switch (args.type) {
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
}

function initMockFormComponent(): FormComponent {
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
function initMockCompleteComponent(): CompleteComponent {
    return {
        open: noop,
        close: noop,
        complete: noop,
    }
}
function initMockDeleteComponent(): DeleteComponent {
    return {
        open: noop,
        close: noop,
        delete: noop,
    }
}
function noop() {
    // 何もしない
}

interface Story<T> {
    args?: T
    (args: T): VNode
}

export const Initial = Template.bind({})
Initial.args = {
    type: "initial",
}

export const Editing = Template.bind({})
Editing.args = {
    type: "editing",
}

export const Invalid = Template.bind({})
Invalid.args = {
    type: "invalid",
}

export const Modified = Template.bind({})
Modified.args = {
    type: "modified",
}

export const UndoEnabled = Template.bind({})
UndoEnabled.args = {
    type: "undoEnabled",
}

export const RedoEnabled = Template.bind({})
RedoEnabled.args = {
    type: "redoEnabled",
}

export const TryToSave = Template.bind({})
TryToSave.args = {
    type: "try-to-save",
}

export const Complete = Template.bind({})
Complete.args = {
    type: "complete",
}

export const TryToComplete = Template.bind({})
TryToComplete.args = {
    type: "try-to-complete",
}

export const Delete = Template.bind({})
Delete.args = {
    type: "delete",
}

export const TryToDelete = Template.bind({})
TryToDelete.args = {
    type: "try-to-delete",
}
