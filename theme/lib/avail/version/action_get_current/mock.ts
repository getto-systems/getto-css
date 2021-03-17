import { mockGetCurrentVersionCoreAction } from "./core/mock"

import { initGetCurrentVersionResource } from "./impl"

import { GetCurrentVersionResource } from "./resource"

export function mockGetCurrentVersionResource(): GetCurrentVersionResource {
    return initGetCurrentVersionResource(mockGetCurrentVersionCoreAction("1.0.0"))
}
