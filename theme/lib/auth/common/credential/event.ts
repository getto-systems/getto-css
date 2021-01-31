export type LoadResult<T> =
    | Readonly<{ success: false; err: LoadApiCredentialError }>
    | Readonly<{ success: true; found: false }>
    | Readonly<{ success: true; found: true; content: T }>

export type LoadApiCredentialError = Readonly<{ type: "infra-error"; err: string }>
