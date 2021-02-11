import { h, VNode } from "preact"
import { useErrorBoundary } from "preact/hooks"

import { useTermination } from "../../z_common/hooks"

import { ApplicationError } from "../../z_common/System/ApplicationError"

import { MoveToNextVersionEntryPoint } from "../../../update/x_components/MoveToNextVersion/EntryPoint/entryPoint"
import { NextVersion } from "./NextVersion"

type Props = MoveToNextVersionEntryPoint
export function EntryPoint({ resource, terminate }: Props): VNode {
    useTermination(terminate)

    const [err] = useErrorBoundary((err) => {
        // ここでエラーをどこかに投げたい、けど認証前なのでこれでお茶を濁す
        console.log(err)
    })
    if (err) {
        return h(ApplicationError, { err: `${err}` })
    }

    return h(NextVersion, resource)
}
