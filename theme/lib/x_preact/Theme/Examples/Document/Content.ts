import { VNode } from "preact"
import { html } from "htm/preact"

type Props = {
    // no props
}
export function Content(_: Props): VNode {
    return html`
        <section class="content content_overflow">
            ${firstPage()} ${secondPage(2)} ${secondPage(3)} ${secondPage(4)} ${secondPage(5)}
        </section>
    `

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
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
            </tr>
            <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
            </tr>
        `
    }

    function firstPage() {
        return html`
            <section class="document document_a4_portrait">
                <div>
                    <header class="document__header">
                        <h2 class="document__title document__title_center">作業申請書</h2>
                    </header>

                    <table class="table table_fill">
                        <thead class="table__header">
                            <tr>
                                <th class="cell_border_t cell_border_bb cell_border_l">ID</th>
                                <th class="cell_border_t cell_border_bb cell_border_rr">名前</th>
                                <th class="cell_border_t cell_border_bb">メールアドレス</th>
                                <th class="cell_border_t cell_border_bb">価格</th>
                                <th class="cell_border_t cell_border_bb cell_border_r">更新日時</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${repeatedRows(11)}
                        </tbody>
                    </table>
                </div>
                <footer class="document__footer">
                    <p class="document__folio">作成日: 2020/06/19</p>
                    <p class="document__folio">1 / 5ページ</p>
                </footer>
            </section>
        `
    }

    function secondPage(number: number) {
        return html`
            <section class="document document_a4_portrait">
                <div>
                    <header class="document__header">
                        <p>作業申請書: ${number} / 5ページ</p>
                    </header>

                    <table class="table table_fill">
                        <thead class="table__header">
                            <tr>
                                <th class="cell_border_t cell_border_bb cell_border_l">ID</th>
                                <th class="cell_border_t cell_border_bb cell_border_rr">名前</th>
                                <th class="cell_border_t cell_border_bb">メールアドレス</th>
                                <th class="cell_border_t cell_border_bb">価格</th>
                                <th class="cell_border_t cell_border_bb cell_border_r">更新日時</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${repeatedRows(13)}
                        </tbody>
                    </table>
                </div>
                <footer class="document__footer">
                    <p class="document__folio">作成日: 2020/06/19</p>
                    <p class="document__folio">${number} / 5ページ</p>
                </footer>
            </section>
        `
    }
}
