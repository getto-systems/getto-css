import { FindAllVersionResource } from "./resource"

import { FindAllVersionCoreAction } from "./core/action"

export function initFindAllVersionResource(
    action: FindAllVersionCoreAction,
): FindAllVersionResource {
    return { findAll: action }
}
