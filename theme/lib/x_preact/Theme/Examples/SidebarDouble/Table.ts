import { VNode } from "preact"
import { html } from "htm/preact"

type Props = {
    // no props
}
export function Table(_: Props): VNode {
    return html`<table class="table table_sticky layout__app__sidebar__largeElement">
        <thead class="table__header">
            <tr>
                <th
                    class="cell_sticky cell_sticky_left cell_sticky_top cell_border_t cell_border_bb cell_border_rr"
                >
                    <a href="#">ID <i class="lnir lnir-chevron-down"></i></a>
                </th>
                <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb">
                    <a href="#">名前</a>
                </th>
                <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb">
                    <a href="#">状態</a>
                </th>
                <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb">
                    <a href="#">メールアドレス</a>
                </th>
                <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb">
                    <a href="#">価格</a>
                </th>
                <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb">
                    <a href="#">更新日時</a>
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
                <td class="cell_sticky cell_sticky_left cell_border_b cell_border_rr">1234</td>
                <td class="cell_border_b">GETTO CSS</td>
                <td class="cell_border_b cell_center"><span class="label label_gray">仮</span></td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_mono cell_right">1,200</td>
                <td class="cell_border_b"><small>2020/06/19 08:03</small></td>
                <td class="cell_border_b">simple admin theme</td>
                <td class="cell_border_b cell_border_l">
                    <a href="#"><i class="lnir lnir-pencil"></i> 編集</a>
                </td>
            </tr>
            <tr class="row row_hover">
                <td class="cell_sticky cell_sticky_left cell_border_b cell_border_rr">123</td>
                <td class="cell_border_b">GETTO</td>
                <td class="cell_border_b cell_center">
                    <span class="label label_warning">作業中</span>
                </td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_mono cell_right">13,500</td>
                <td class="cell_border_b"><small>2020/01/10</small></td>
                <td class="cell_border_b">simple css theme</td>
                <td class="cell_border_b cell_border_l">
                    <a href="#"><i class="lnir lnir-pencil"></i> 編集</a>
                </td>
            </tr>
        `
    }
}
