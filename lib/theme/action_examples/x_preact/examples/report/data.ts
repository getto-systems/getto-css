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

export function generateReportRows(): Row[] {
    return repeatedRows(50)

    function repeatedRows(count: number) {
        const result: Row[] = []
        for (let i = 0; i < count; i++) {
            result.push(row_simple(result.length + 1))
            result.push(row_tree(result.length + 1))
        }
        return result
    }
    function row_simple(id: number): Row {
        return {
            id,
            name: "GETTO CSS",
            email: "admin@example.com",
            price: [1200],
            updatedAt: "2020/06/19 08:03",
        }
    }
    function row_tree(id: number): Row {
        return {
            id: id,
            name: "GETTO",
            email: "user@example.com",
            price: [13500, 1500, 600],
            updatedAt: "2020/01/10",
        }
    }
}
