import { VNode } from "preact"
import { html } from "htm/preact"

type Props = {
    // no props
}
export function Table(_: Props): VNode {
    return html`<table class="table table_sticky">
        <thead class="table__header">
            <tr>
                <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb">
                    <a href="#" class="table__sort">ID <i class="lnir lnir-chevron-down"></i></a>
                </th>
                <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb cell_border_rr">
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
                <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb">
                    <span class="linky">メモ</span>
                </th>
                <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb cell_border_l"></th>
            </tr>
        </thead>
        <tbody>
            ${repeatedRows()}
        </tbody>
    </table>`

    function repeatedRows() {
        const result = []
        for (let i = 0; i < 100; i++) {
            result.push(rows())
        }
        return result
    }

    function rows() {
        return html`
            <tr class="row row_hover">
                <td class="cell_border_b">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b cell_center"><span class="label label_gray">仮</span></td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_numeric">1,200</td>
                <td class="cell_border_b"><small>2020/06/19 08:03</small></td>
                <td class="cell_border_b">simple admin theme</td>
                <td class="cell_border_b cell_border_l">
                    <button class="button button_edit">編集</button>
                </td>
            </tr>
            <tr class="row row_hover">
                <td class="cell_border_b">123</td>
                <td class="cell_border_b cell_border_rr">
                    <section class="form form_error">
                        <input type="text" value="" id="work-name" />
                        <aside class="form__help">
                            <p>識別のための作業名</p>
                            <p class="form__notice">作業名は必須です</p>
                        </aside>
                    </section>
                </td>
                <td class="cell_border_b cell_center">
                    <span class="label label_warning">作業中</span>
                </td>
                <td class="cell_border_b">
                    <section class="form">
                        <input type="email" value="admin@example.com" id="work-name" />
                        <aside class="form__help">
                            <p>連絡先メールアドレス</p>
                        </aside>
                    </section>
                </td>
                <td class="cell_border_b cell_numeric">13,500</td>
                <td class="cell_border_b"><small>2020/01/10</small></td>
                <td class="cell_border_b">simple css theme</td>
                <td class="cell_border_b cell_border_l">
                    <button class="button button_edit">保存</button>
                </td>
            </tr>
        `
    }
}
