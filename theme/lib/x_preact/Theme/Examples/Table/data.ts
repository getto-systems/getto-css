export type Model = Readonly<{
    // no members
}>

export type Row = Readonly<{
    id: number
    name: string
    state: string
    account: string
    host: string
    price: number
    updatedAt: string
    memo: string
}>

export function generateRows(): Row[] {
    return repeatedRows(100)

    function repeatedRows(count: number) {
        const result: Row[] = []
        for (let i = 0; i < count; i++) {
            result.push(...rows())
        }
        return result
    }
    function rows(): Row[] {
        return [
            {
                id: 1234,
                name: "GETTO CSS",
                state: "仮",
                account: "admin",
                host: "getto.systems",
                price: 1200,
                updatedAt: "2020/06/19 08:03",
                memo: "simple admin theme",
            },
            {
                id: 123,
                name: "GETTO",
                state: "作業中",
                account: "user",
                host: "example.com",
                price: 13500,
                updatedAt: "2020/01/10",
                memo: "simple css theme",
            },
        ]
    }
}
