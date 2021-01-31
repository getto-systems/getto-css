import { VNode } from "preact"
import { html } from "htm/preact"

import { VNodeContent } from "../../../preact/common"

export type ReportContent = Readonly<{
    index: number
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

// id 付与
// ルート要素: __css__print__report_${index}
// header 要素: __css__print__reportHeader_${index}
export function report_a4_portrait(content: ReportContent): VNode {
    return reportContent({ size: "a4", layout: "portrait" }, content)
}
function reportContent(style: ReportStyle, { index, header, body, footer }: ReportContent): VNode {
    return html`<article class="report ${reportClass(style)}" id=${reportID()} key=${reportID()}>
        <main>
            ${contentLimitMarker()}
            <section id=${reportHeaderID()}>${header}</section>
            <section>${body}</section>
        </main>
        <section>${footer}</section>
    </article>`

    function reportID() {
        return `__css__print__report_${index}`
    }
    function reportHeaderID() {
        return `__css__print__reportHeader_${index}`
    }

    function contentLimitMarker() {
        return html`<aside class="report__contentLimit">
            <mark class="report__contentLimit__mark"></mark>
        </aside>`
    }
}

export function reportHeader(content: VNodeContent): VNode {
    return html`<header class="report__header">${content}</header>`
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

export type ReportFooterContent = Readonly<{
    left: VNodeContent
    right: VNodeContent
}>
export function reportFooter({ left, right }: ReportFooterContent): VNode {
    return html`<footer class="report__footer">
        <aside class="report__footer_left">${left}</aside>
        <aside class="report__footer_right">${right}</aside>
    </footer>`
}

export function reportFolio(content: VNodeContent): VNode {
    return html`<address class="report__folio">${content}</address>`
}
