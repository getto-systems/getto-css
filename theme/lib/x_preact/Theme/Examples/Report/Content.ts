import { VNode } from "preact"
import { html } from "htm/preact"

type Props = {
    // no props
}
export function Content(_: Props): VNode {
    return html`${firstPage()} ${secondPage(2)} ${secondPage(3)} ${secondPage(4)} ${secondPage(5)}`

    function firstPage() {
        return html`<section class="report report_a4_portrait">
            <main>
                <header class="report__header">
                    <h2 class="report__title report__title_center">作業申請書</h2>
                </header>
                ${reportTable(13)}
            </main>
            ${reportFooter(1)}
        </section>`
    }

    function secondPage(number: number) {
        return html`<section class="report report_a4_portrait">
            <main>
                <header class="report__header">
                    <h3 class="report__repeatTitle">作業申請書</h3>
                </header>
                ${reportTable(14)}
            </main>
            ${reportFooter(number)}
        </section>`
    }

    function reportTable(rows: number) {
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

    function reportFooter(pageNumber: number) {
        return html`<footer class="report__footer">
            <cite class="report__folio">作成日: 2020/06/19</cite>
            <address class="report__folio">${pageNumber} / 5ページ</address>
        </footer>`
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
                <td class="cell_border_b cell_mono cell_right">1,200</td>
                <td class="cell_border_b cell_border_r"><small>2020/06/19 08:03</small></td>
            </tr>
            <tr>
                <td class="cell_border_b cell_border_l cell_border_rr">123</td>
                <td class="cell_border_b">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_mono cell_right">13,500</td>
                <td class="cell_border_b cell_border_r"><small>2020/01/10</small></td>
            </tr>
        `
    }
}
