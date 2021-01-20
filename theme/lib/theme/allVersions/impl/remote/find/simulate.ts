import { FindClient, FindResponse } from "../../../infra"

export function initSimulateFindClient(simulator: FindSimulator): FindClient {
    return new SimulateFindClient(simulator)
}

export interface FindSimulator {
    // エラーにする場合は RenewError を throw (それ以外を throw するとこわれる)
    find(): Promise<string[]>
}

class SimulateFindClient implements FindClient {
    simulator: FindSimulator

    constructor(simulator: FindSimulator) {
        this.simulator = simulator
    }

    async find(): Promise<FindResponse> {
        try {
            const versions = await this.simulator.find()
            return {
                success: true,
                found: true,
                versions,
            }
        } catch (err) {
            return { success: false, err }
        }
    }
}
