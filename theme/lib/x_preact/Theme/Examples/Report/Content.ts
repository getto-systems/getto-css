import { VNode } from "preact"
import { html } from "htm/preact"
import {
    reportBody,
    reportFolio,
    reportFooter,
    reportHeader,
    reportTitle,
    reportTitle_small,
    reportTitle_xSmall,
    report_a4_portrait,
} from "../../../../z_external/getto-css/preact/design/print"

type Props = {
    // no props
}
export function Content(_: Props): VNode {
    return html`${firstPage()} ${secondPage()} ${thirdPage(3)} ${thirdPage(4)} ${thirdPage(5)}`

    function firstPage() {
        return report_a4_portrait({
            header: reportHeader(reportTitle({ style: "center", title: "作業申請書" })),
            content: reportBody(content(13)),
            footer: footer(1),
        })
    }

    function secondPage() {
        return report_a4_portrait({
            header: reportHeader(reportTitle_small({ style: "center", title: "作業申請書" })),
            content: content(14),
            footer: footer(2),
        })
    }

    function thirdPage(number: number) {
        return report_a4_portrait({
            header: reportHeader(reportTitle_xSmall({ style: "left", title: "作業申請書" })),
            content: content(14),
            footer: footer(number),
        })
    }

    function footer(pageNumber: number) {
        return reportFooter({
            left: reportFolio("作成日: 2020/06/19"),
            right: reportFolio(`${pageNumber} / 5ページ`),
        })
    }

    function content(rows: number) {
        return html`<table class="table table_fill table_small">
            ${tableHeader()}
            <tbody>
                ${repeatedRows(rows)}
            </tbody>
        </table>`
    }

    function tableHeader() {
        return html`<thead class="table__header">
            <tr>
                <th class="cell_border_t cell_border_bb cell_border_l cell_border_rr">
                    <span class="linky">ID</span>
                </th>
                <th class="cell_border_t cell_border_bb"><span class="linky">名前</span></th>
                <th class="cell_border_t cell_border_bb"><span class="linky">メールアドレス</span></th>
                <th class="cell_border_t cell_border_bb"><span class="linky">価格</span></th>
                <th class="cell_border_t cell_border_bb cell_border_r">
                    <span class="linky">更新日時</span>
                </th>
            </tr>
        </thead>`
    }

    function repeatedRows(count: number) {
        const result = []
        for (let i = 0; i < count; i++) {
            result.push(rows())
        }
        return result
    }

    function rows() {
        return html`
            <tr>
                <td class="cell_border_b cell_border_l cell_border_rr">1234</td>
                <td class="cell_border_b">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_numeric">1,200</td>
                <td class="cell_border_b cell_border_r"><small>2020/06/19 08:03</small></td>
            </tr>
            <tr>
                <td class="cell_border_b cell_border_l cell_border_rr">123</td>
                <td class="cell_border_b">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_numeric">13,500</td>
                <td class="cell_border_b cell_border_r"><small>2020/01/10</small></td>
            </tr>
        `
    }
}
