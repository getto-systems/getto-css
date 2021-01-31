import { VNode } from "preact"
import { useEffect, useState } from "preact/hooks"
import { html } from "htm/preact"

import { VNodeContent, VNodeKey } from "../../../preact/common"

export type ReportContent = Readonly<{
    id: string
    header: VNodeContent
    body: VNodeContent
    footer: VNodeContent
}>

type ReportStyle = Readonly<{ size: ReportPageSize; layout: ReportLayout }>
type ReportPageSize = "a4"
type ReportLayout = "portrait"
function reportClass({ size, layout }: ReportStyle) {
    return `report_${size}_${layout}`
}

// id 付与 : ルート要素
export function report_a4_portrait(content: ReportContent): VNode {
    return reportContent({ size: "a4", layout: "portrait" }, content)
}
function reportContent(style: ReportStyle, { id, header, body, footer }: ReportContent): VNode {
    return html`<article class="report ${reportClass(style)}" id=${id} key=${id}>
        <main>
            ${contentLimitMarker()}
            <header class="report__header">${header}</header>
            <section>${body}</section>
        </main>
        <footer class="report__footer">${footer}</footer>
    </article>`

    function contentLimitMarker() {
        return html`<aside class="report__contentLimit">
            <mark class="report__contentLimit__mark"></mark>
        </aside>`
    }
}

export type ReportTitleContent = Readonly<{
    style: ReportTitleStyle
    title: VNodeContent
}>

type ReportTitleTypedContent = Readonly<{
    type: ReportTitleType
    content: ReportTitleContent
}>

type ReportTitleType = "large" | "small" | "xSmall"
type ReportTitleStyle = "left" | "center"

function mapReportTitleType(type: ReportTitleType): string {
    return `report__title_${type}`
}
function mapReportTitleStyle(style: ReportTitleStyle): string {
    switch (style) {
        case "left":
            return ""

        default:
            return `report__title_${style}`
    }
}

export function reportTitle(content: ReportTitleContent): VNode {
    return reportTitleContent({ type: "large", content })
}
export function reportTitle_small(content: ReportTitleContent): VNode {
    return reportTitleContent({ type: "small", content })
}
export function reportTitle_xSmall(content: ReportTitleContent): VNode {
    return reportTitleContent({ type: "xSmall", content })
}
function reportTitleContent(report: ReportTitleTypedContent): VNode {
    return html`<h1 class="${titleClass()}">${report.content.title}</h1>`

    function titleClass(): string {
        return [
            "report__title",
            mapReportTitleType(report.type),
            mapReportTitleStyle(report.content.style),
        ].join(" ")
    }
}

export type ReportFoliosContent = Readonly<{
    left: VNodeContent
    right: VNodeContent
}>
export function reportFolios({ left, right }: ReportFoliosContent): VNode {
    return html`<section class="report__folio__container">
        <aside class="report__folio_left">${left}</aside>
        <aside class="report__folio_right">${right}</aside>
    </section>`
}

export function reportFolio(content: VNodeContent): VNode {
    return html`<address class="report__folio">${content}</address>`
}

// rows をページの高さによって分割する
export function useReportRowsComposition<R>(
    rows: R[],
    content: ReportRowsCompositionContent
): ReportRowsComposition<R> {
    const [data, setData] = useState(initialReportRowsComposition(rows))
    useEffect(() => {
        const nextComposition = composeReportRows(content, data)
        if (nextComposition.hasNext) {
            setData(nextComposition.data)
        }
    }, [data])
    return data
}

type ReportRowsComposition<R> = Readonly<{
    pagedRows: R[][]
    composeIndex: number
}>

type ReportRowsCompositionContent = Readonly<{
    root: { (index: number): HTMLElement | null }
    rowKey: { (tr: HTMLTableRowElement): string | null }
}>

function initialReportRowsComposition<R>(rows: R[]): ReportRowsComposition<R> {
    return { pagedRows: [rows], composeIndex: 0 }
}

function composeReportRows<R>(
    { rowKey, root }: ReportRowsCompositionContent,
    data: ReportRowsComposition<R>
): NextReportRowsComposition<R> {
    type ComposeInfo = Readonly<{ changeKeyCount: number; currentKey: CurrentKey }>
    type CurrentKey =
        | Readonly<{ type: "initial" }>
        | Readonly<{ type: "focused"; key: VNodeKey }>
        | Readonly<{ type: "notFound" }>

    type MarkerOffset = Readonly<{ found: false }> | Readonly<{ found: true; offset: number }>

    const page = root(data.composeIndex)
    if (!page) {
        return { hasNext: false }
    }

    const marker = findMarkerOffset(page)
    if (!marker.found) {
        return { hasNext: false }
    }

    return findNextComposition(page, marker.offset)

    function findMarkerOffset(page: HTMLElement): MarkerOffset {
        // report__contentLimit__mark は css によって report の padding 内部の高さになっている
        const markers = page.getElementsByClassName("report__contentLimit__mark")
        for (const marker of markers) {
            if (marker instanceof HTMLElement) {
                return {
                    found: true,
                    // padding 内部の高さから report__header の高さを除いたものを基準とすることで
                    // ヘッダに追加要素があっても適切に高さを計算できるようにする
                    offset: marker.offsetHeight - reportHeaderHeight(),
                }
            }
        }
        return { found: false }

        function reportHeaderHeight() {
            const headers = page.getElementsByClassName("report__header")
            for (const header of headers) {
                if (header instanceof HTMLElement) {
                    return header.offsetHeight
                }
            }
            return 0
        }
    }

    function findNextComposition(page: HTMLElement, offset: number): NextReportRowsComposition<R> {
        let info = initialComposeInfo()

        const tableBodies = page.getElementsByTagName("tbody")
        for (const body of tableBodies) {
            const tableRows = body.getElementsByTagName("tr")
            for (const tr of tableRows) {
                info = nextComposeInfo(info, rowKey(tr))

                if (body.offsetTop + tr.offsetTop + tr.offsetHeight > offset) {
                    return nextComposition(data, info.changeKeyCount)
                }
            }
        }

        return { hasNext: false }
    }

    function initialComposeInfo(): ComposeInfo {
        return { changeKeyCount: 0, currentKey: { type: "initial" } }
    }
    function nextComposeInfo(info: ComposeInfo, key: string | null): ComposeInfo {
        if (!key) {
            return { changeKeyCount: info.changeKeyCount, currentKey: { type: "notFound" } }
        }

        switch (info.currentKey.type) {
            case "initial":
                return {
                    changeKeyCount: info.changeKeyCount,
                    currentKey: { type: "focused", key },
                }

            case "notFound":
                return {
                    changeKeyCount: info.changeKeyCount + 1,
                    currentKey: { type: "focused", key },
                }

            case "focused":
                if (key === info.currentKey.key) {
                    return info
                } else {
                    return {
                        changeKeyCount: info.changeKeyCount + 1,
                        currentKey: { type: "focused", key },
                    }
                }
        }
    }
}

type NextReportRowsComposition<R> =
    | Readonly<{ hasNext: false }>
    | Readonly<{ hasNext: true; data: ReportRowsComposition<R> }>

function nextComposition<R>(
    data: ReportRowsComposition<R>,
    splitIndex: number
): NextReportRowsComposition<R> {
    return {
        hasNext: true,
        data: {
            pagedRows: [
                ...data.pagedRows.slice(0, -1),
                ...splitRows(data.pagedRows[data.pagedRows.length - 1]),
            ],
            composeIndex: data.composeIndex + 1,
        },
    }

    function splitRows<R>(rows: R[]): R[][] {
        // スペースによっては splitIndex に 0 が指定される場合がある
        // 少なくとも 1行は分割しないと無限ループになるのでその場合は index に 1 を使用する
        const index = Math.max(1, splitIndex)
        return [rows.slice(0, index), rows.slice(index)]
    }
}
