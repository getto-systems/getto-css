export type Model = Readonly<{
    sumPrice: number
}>

export type Row = Readonly<{
    id: number
    name: string
    email: string
    price: number[]
    updatedAt: string
}>

export function generateRows(): Row[] {
    return repeatedRows(50)

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
                email: "admin@example.com",
                price: [1200],
                updatedAt: "2020/06/19 08:03",
            },
            {
                id: 123,
                name: "GETTO",
                email: "user@example.com",
                price: [13500, 1500, 600],
                updatedAt: "2020/01/10",
            },
        ]
    }
}
