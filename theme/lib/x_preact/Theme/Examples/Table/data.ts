export type Model = Readonly<{
    logs: Record<number, Log[]>
    alarmMaxLength: number
    temperatureTypes: TemperatureType[]
}>

export type Row = Readonly<{
    row_id: number
    name: string
    state: string
    account: string
    host: string
    price: number
    alarms: string[]
    amounts: Record<TemperatureType, number>
    updatedAt: string
    memo: string
}>

export type Log = Readonly<{
    log_id: number
    loggedAt: string
}>

export type TemperatureType = "high" | "low"

export function generateRows(): Row[] {
    return generate(50, rows)

    function rows(): Row[] {
        return [
            {
                row_id: 12,
                name: "GETTO CSS",
                state: "仮",
                account: "admin",
                host: "getto.systems",
                price: 1200,
                alarms: ["10:00"],
                amounts: {
                    high: 300,
                    low: 200,
                },
                updatedAt: "2020/06/19 08:03",
                memo: "simple admin theme",
            },
            {
                row_id: 123,
                name: "GETTO Example",
                state: "作業中",
                account: "user",
                host: "example.com",
                price: 13500,
                alarms: ["12:00", "16:00", "20:00"],
                amounts: {
                    high: 500,
                    low: 100,
                },
                updatedAt: "2020/01/10",
                memo: "simple css theme",
            },
            {
                row_id: 1234,
                name: "GETTO KeyTuner",
                state: "完了",
                account: "info",
                host: "getto.systems",
                price: 600,
                alarms: [],
                amounts: {
                    high: 500,
                    low: 100,
                },
                updatedAt: "2020/01/10",
                memo: "simple css theme",
            },
        ]
    }
}

export function generateLogs(): Record<number, Log[]> {
    const logs: Record<number, Log[]> = {}

    logs[12] = generate(3, rows)
    logs[123] = generate(0, rows)
    logs[1234] = generate(5, rows)

    return logs

    function rows(index: number): Log[] {
        return [
            {
                log_id: index + 1,
                loggedAt: `${Math.ceil(Math.random() * 1000)}`,
            }
        ]
    }
}

function generate<T>(count: number, rows: { (index: number): T[] }): T[] {
    const result: T[] = []
    for (let i = 0; i < count; i++) {
        result.push(...rows(i))
    }
    return result
}
