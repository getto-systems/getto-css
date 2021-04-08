export type ApiResult<V, E> =
    | Readonly<{ success: true; value: V }>
    | Readonly<{ success: false; err: E }>

export type ApiCommonError = Readonly<{ type: "server-error" }>
