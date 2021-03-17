import { ApiResult } from "../data"

type ApiNonce = string
type LoadResult = ApiResult<MenuBadgeItem[], LoadError>
type MenuBadgeItem = Readonly<{ path: string; count: number }>

type LoadError =
    | Readonly<{ type: "bad-request" }>
    | Readonly<{ type: "server-error" }>
    | Readonly<{ type: "bad-response"; err: string }>
    | Readonly<{ type: "infra-error"; err: string }>

interface Get {
    (nonce: ApiNonce): Promise<LoadResult>
}
export function initApi_GetMenuBadge(_apiServerURL: string): Get {
    return async (_nonce: ApiNonce): Promise<LoadResult> => {
        // デモンストレーション用に値を返すだけなので通信はしない
        return { success: true, value: [{ path: "/index.html", count: 50 }] }
    }
}
