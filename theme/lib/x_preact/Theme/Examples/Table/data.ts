export type Model = Readonly<{
    alarmMaxLength: number
}>

export type Row = Readonly<{
    id: number
    name: string
    state: string
    account: string
    host: string
    price: number
    alarms: string[]
    updatedAt: string
    memo: string
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
                id: 12,
                name: "GETTO CSS",
                state: "仮",
                account: "admin",
                host: "getto.systems",
                price: 1200,
                alarms: ["10:00"],
                updatedAt: "2020/06/19 08:03",
                memo: "simple admin theme",
            },
            {
                id: 123,
                name: "GETTO Example",
                state: "作業中",
                account: "user",
                host: "example.com",
                price: 13500,
                alarms: ["12:00", "16:00", "20:00"],
                updatedAt: "2020/01/10",
                memo: "simple css theme",
            },
            {
                id: 1234,
                name: "GETTO KeyTuner",
                state: "完了",
                account: "info",
                host: "getto.systems",
                price: 600,
                alarms: [],
                updatedAt: "2020/01/10",
                memo: "simple css theme",
            },
        ]
    }
}
