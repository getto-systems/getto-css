import { h, VNode } from "preact"
import { useErrorBoundary } from "preact/hooks"

import { useTerminate } from "../../z_common/hooks"

import { ApplicationError } from "../../z_common/System/ApplicationError"

import { MoveToNextVersionEntryPoint } from "../../../update/x_components/MoveToNextVersion/EntryPoint/entryPoint"
import { NextVersion } from "./NextVersion"

type Props = Readonly<{
    moveToNextVersion: MoveToNextVersionEntryPoint
}>
export function MoveToLatestVersion({ moveToNextVersion: { resource, terminate } }: Props): VNode {
    const [err] = useErrorBoundary((err) => {
        // ここでエラーをどこかに投げたい、けど認証前なのでこれでお茶を濁す
        console.log(err)
    })

    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    useTerminate(terminate)

    return h(NextVersion, resource)
}
