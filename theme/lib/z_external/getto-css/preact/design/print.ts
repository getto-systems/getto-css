import { VNode } from "preact"
import { html } from "htm/preact"

import { VNodeContent } from "../common"

export type ReportContent = Readonly<{
    header: VNodeContent
    content: VNodeContent
    footer: VNodeContent
}>

export function report_a4_portrait({ header, content, footer }: ReportContent): VNode {
    return html`<article class="report report_a4_portrait">
        <section>${header} ${content}</section>
        ${footer}
    </article>`
}

export function reportHeader(content: VNodeContent): VNode {
    return html`<header class="report__header">${content}</header>`
}

type ReportTitleTypedContent = Readonly<{
    type: ReportTitleType
    content: ReportTitleContent
}>
export type ReportTitleContent = Readonly<{
    style: ReportTitleStyle
    title: VNodeContent
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

export function reportBody(content: VNodeContent): VNode {
    return html`<main>${content}</main>`
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
