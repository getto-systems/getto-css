import { VNode } from "preact"
import { html } from "htm/preact"

type Props = {
    // no props
}
export function Table(_: Props): VNode {
    return html`
        <section class="content content_overflow">
            <table class="table table_thin table_sticky">
                <thead class="table__header">
                    <tr>
                        <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb">
                            <a href="#" class="table__sort">ID <i class="lnir lnir-chevron-down"></i></a>
                        </th>
                        <th
                            class="cell_sticky cell_sticky_top cell_border_t cell_border_bb cell_border_rr"
                        >
                            <a href="#" class="table__sort">名前</a>
                        </th>
                        <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb">
                            <a href="#" class="table__sort">状態</a>
                        </th>
                        <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb">
                            <a href="#" class="table__sort">メールアドレス</a>
                        </th>
                        <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb">
                            <a href="#" class="table__sort">価格</a>
                        </th>
                        <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb">
                            <a href="#" class="table__sort">更新日時</a>
                        </th>
                        <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb">メモ</th>
                        <th
                            class="cell_sticky cell_sticky_top cell_border_t cell_border_bb cell_border_l"
                        ></th>
                    </tr>
                </thead>
                <tbody>
                    ${repeatedRows()}
                </tbody>
            </table>
        </section>
    `

    function repeatedRows() {
        const result = []
        for (let i = 0; i < 100; i++) {
            result.push(rows())
        }
        return result
    }

    function rows() {
        return html`
            <tr class="row row_hoverable">
                <td class="cell_border_b">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b cell_center"><span class="label label_gray">仮</span></td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_nokern"><small>2020/06/19 08:03</small></td>
                <td class="cell_border_b">simple admin theme</td>
                <td class="cell_border_b cell_border_l">
                    <a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a>
                </td>
            </tr>
            <tr class="row row_edit">
                <td class="cell_border_b">123</td>
                <td class="cell_border_b cell_border_rr">
                    <section class="form form_error">
                        <input type="text" value="" id="work-name" />
                        <p class="form__message">作業名は必須です</p>
                        <p class="form__help">識別のための作業名</p>
                    </section>
                </td>
                <td class="cell_border_b cell_center">
                    <span class="label label_warning">作業中</span>
                </td>
                <td class="cell_border_b">
                    <section class="form">
                        <input type="email" value="admin@example.com" id="work-name" />
                        <p class="form__help">連絡先メールアドレス</p>
                    </section>
                </td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
                <td class="cell_border_b">simple css theme</td>
                <td class="cell_border_b cell_border_l">
                    <a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a>
                </td>
            </tr>
        `
    }
}
