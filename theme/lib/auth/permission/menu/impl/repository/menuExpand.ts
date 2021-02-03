import {
    TypedStorage,
    TypedStorageConverter,
    TypedStorageDecoded,
} from "../../../../../z_infra/storage/infra"
import { MenuExpand, MenuExpandRepository, MenuExpandResponse, ToggleExpandResponse } from "../../infra"

export type MenuExpandStorage = Readonly<{
    menuExpand: TypedStorage<MenuExpand>
}>
export function initMenuExpandRepository(storage: MenuExpandStorage): MenuExpandRepository {
    return new Repository(storage)
}

class Repository implements MenuExpandRepository {
    storage: MenuExpandStorage

    restored = false

    constructor(storage: MenuExpandStorage) {
        this.storage = storage
    }

    findMenuExpand(): MenuExpandResponse {
        try {
            const result = this.storage.menuExpand.get()
            if (!result.found) {
                return { success: true, menuExpand: [] }
            }
            if (result.decodeError) {
                // デコードできない値が保存されているなら削除する
                this.storage.menuExpand.remove()
                return { success: true, menuExpand: [] }
            }
            return { success: true, menuExpand: result.value }
        } catch (err) {
            return { success: false, err: { type: "infra-error", err: `${err}` } }
        }
    }

    saveMenuExpand(menuExpand: MenuExpand): ToggleExpandResponse {
        try {
            this.storage.menuExpand.set(menuExpand)
            return { success: true }
        } catch (err) {
            return { success: false, err: { type: "infra-error", err: `${err}` } }
        }
    }
}

export function initMenuExpandConverter(): TypedStorageConverter<MenuExpand> {
    return new MenuExpandConverter()
}

class MenuExpandConverter implements TypedStorageConverter<MenuExpand> {
    encode(value: MenuExpand): string {
        return JSON.stringify(value)
    }
    decode(raw: string): TypedStorageDecoded<MenuExpand> {
        return validate(JSON.parse(raw))

        function validate(json: unknown): TypedStorageDecoded<MenuExpand> {
            if (!(json instanceof Array)) {
                return { decodeError: true, err: `menu expand parse error: invalid array : ${raw}` }
            }
            if (
                !json.every(
                    (value) => value instanceof Array && value.every((val) => typeof val === "string")
                )
            ) {
                return {
                    decodeError: true,
                    err: `menu expand parse error: invalid array entry : ${raw}`,
                }
            }
            return { decodeError: false, value: json }
        }
    }
}
