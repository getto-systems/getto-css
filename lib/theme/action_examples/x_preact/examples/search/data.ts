export type Model = Readonly<{
    // no members
}>

export type Row = Readonly<{
    id: number
    name: string
    state: string
    email: string
    price: number
    updatedAt: string
    memo: string
    focused: boolean
}>

export function generateSearchRows(): Row[] {
    return repeatedRows(100)

    function repeatedRows(count: number) {
        const result: Row[] = []
        for (let i = 0; i < count; i++) {
            result.push(...rows())
        }
        return [{ ...result[0], focused: true }, ...result]
    }
    function rows(): Row[] {
        return [
            {
                id: 1234,
                name: "GETTO CSS",
                state: "仮",
                email: "admin@example.com",
                price: 1200,
                updatedAt: "2020/06/19 08:03",
                memo: "simple admin theme",
                focused: false,
            },
            {
                id: 123,
                name: "GETTO",
                state: "作業中",
                email: "user@example.com",
                price: 13500,
                updatedAt: "2020/01/10",
                memo: "simple css theme",
                focused: false,
            },
        ]
    }
}
