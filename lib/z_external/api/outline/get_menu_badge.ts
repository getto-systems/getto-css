import { ApiCommonError, ApiResult } from "../data"

interface GetMenuBadge {
    (): Promise<GetMenuBadgeResult>
}
type GetMenuBadgeResult = ApiResult<MenuBadgeItem[], ApiCommonError>
type MenuBadgeItem = Readonly<{ path: string; count: number }>

export function newApi_GetMenuBadge(): GetMenuBadge {
    return async (): Promise<GetMenuBadgeResult> => {
        // デモンストレーション用に値を返すだけなので通信はしない
        return { success: true, value: [{ path: "/index.html", count: 50 }] }
    }
}
