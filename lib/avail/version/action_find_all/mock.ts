import { mockFindAllVersionCoreAction } from "./core/mock"
3
import { initFindAllVersionResource } from "./impl"

import { FindAllVersionResource } from "./resource"

export function mockFindAllVersionResource(): FindAllVersionResource {
    return initFindAllVersionResource(mockFindAllVersionCoreAction())
}
