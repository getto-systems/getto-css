import { h, render } from "preact";
import { Menu } from "./menu";
import "./getto.css";

const app = h("main", { class: "layout" }, [
    h(Page, null, null),
    h(Menu, null, null),
]);
render(app, document.body);

import { useState } from "preact/hooks";
import { html } from "htm/preact";
import { config } from "./config.js";

type State = {
    is_searching: boolean,
}

function Page() {
    const [state, setState] = useState<State>({
        is_searching: false,
    });

    const delay = 2.5 * 1000;

    return html`
        <article class="layout__main">
            <header class="main__header">
                <h1 class="main__title">一覧</h1>
                <p class="main__breadcrumb">
                    <a class="main__breadcrumb__item" href="#menu">MAIN</a>
                    <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
                    <a class="main__breadcrumb__item" href="/${config.version}/list.html"><i class="lnir lnir-list"></i> 一覧</a>
                </p>
            </header>
            <section class="main__body">
                ${searchForm()}
                <section class="container">
                    ${searchColumn()}
                    ${pager()}
                </section>
                ${table()}
            </section>
            <footer class="main__footer">
                <p class="main__footer__message">powered by : LineIcons / みんなの文字</p>
            </footer>
        </article>
    `

    function search(e: MouseEvent) {
        e.preventDefault();

        setState({
            is_searching: true,
        });

        setTimeout(() => {
            setState({
                is_searching: false,
            });
        }, delay);
    }

    function searchForm() {
        return html`
            <form class="box box_fill">
                <section class="box__body">
                    ${searchButton()}
                </section>
            </form>
        `

        function searchButton() {
            if (state.is_searching) {
                return html`
                    <button class="button button_searching"><i class="lnir lnir-spinner-11 lnir-is-spinning"></i> 読み込み中</button>
                `
            } else {
                return html`
                    <button class="button button_search" onClick="${search}">
                        <i class="lnir lnir-reload"></i> 再読み込み
                    </button>
                `
            }
        }
    }

    function searchColumn() {
        return html`
            <section class="box box_double">
                <section class="box__body">
                    <dl>
                        <dt class="search__header">表示する列</dt>
                        <dd class="search__field">
                            <section class="search__column">
                                <label class="search__column__item input__checkbox input_checked"><input type="checkbox" checked/>ID</label>
                                <label class="search__column__item input__checkbox input_checked"><input type="checkbox" checked/>名前</label>
                                <label class="search__column__item input__checkbox input_checked"><input type="checkbox" checked/>状態</label>
                                <label class="search__column__item input__checkbox input_checked"><input type="checkbox" checked/>メールアドレス</label>
                                <label class="search__column__item input__checkbox input_checked"><input type="checkbox" checked/>更新日時</label>
                                <label class="search__column__item input__checkbox input_checked"><input type="checkbox" checked/>メモ</label>
                                <label class="search__column__item input__checkbox"><input type="checkbox"/>正式名称</label>
                                <label class="search__column__item input__checkbox"><input type="checkbox"/>問い合わせ電話番号</label>
                            </section>
                        </dd>
                    </dl>

                </section>
            </section>
        `
    }

    function pager() {
        return html`
            <form class="box">
                <section class="box__body">
                    <dl>
                        <dt class="search__header">全 5532 件中</dt>
                        <dd class="search__field">
                            <select class="pager__select">
                                <option>1 ～ 1000 件</option>
                                <option>1001 ～ 2000 件</option>
                                <option>2001 ～ 3000 件</option>
                                <option>3001 ～ 4000 件</option>
                                <option>4001 ～ 5000 件</option>
                                <option>5001 ～ 5532 件</option>
                            </select>
                        </dd>
                    </dl>
                </section>
                <footer class="box__footer search_error">
                    <button class="button button_search"><i class="lnir lnir-pointer-right"></i> 移動</button>
                </footer>
            </form>
        `
    }

    function table() {
        return html`
            <section class="content content_overflow">
                <table class="table table_sticky">
                <thead class="table__header">
                    <tr>
                        <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb"><a href="#" class="table__sort">ID <i class="lnir lnir-chevron-down"></i></a></th>
                        <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb cell_border_rr"><a href="#" class="table__sort">名前</a></th>
                        <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb"><a href="#" class="table__sort">状態</a></th>
                        <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb"><a href="#" class="table__sort">メールアドレス</a></th>
                        <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb"><a href="#" class="table__sort">価格</a></th>
                        <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb"><a href="#" class="table__sort">更新日時</a></th>
                        <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb">メモ</th>
                        <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb cell_border_l"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="row row_hoverable">
                        <td class="cell_border_b">1234</td>
                        <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                        <td class="cell_border_b cell_center"><span class="label label_gray">仮</span></td>
                        <td class="cell_border_b">admin@example.com</td>
                        <td class="cell_border_b cell_nokern cell_right">1,200</td>
                        <td class="cell_border_b cell_nokern"><small>2020/06/19 08:03</small></td>
                        <td class="cell_border_b">simple admin theme</td>
                        <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
                    </tr>
                    <tr class="row row_edit">
                        <td class="cell_border_b">123</td>
                        <td class="cell_border_b cell_border_rr">
                            <section class="form form_error">
                                <input type="text" value="" id="work-name"/>
                                <p class="form__message">作業名は必須です</p>
                                <p class="form__help">識別のための作業名</p>
                            </section>
                        </td>
                        <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
                        <td class="cell_border_b">
                            <section class="form">
                                <input type="email" value="admin@example.com" id="work-name"/>
                                <p class="form__help">連絡先メールアドレス</p>
                            </section>
                        </td>
                        <td class="cell_border_b cell_nokern cell_right">13,500</td>
                        <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
                        <td class="cell_border_b">simple css theme</td>
                        <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
                    </tr>
                </tbody>
                </table>
            </section>
        `
    }
}
