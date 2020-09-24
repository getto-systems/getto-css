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
    is_modified: boolean,
    is_searching: boolean,
    is_error: boolean,

    data: Data,
}

type Data = {
    radio: string,
}

type Text = {
    id: string,
    name: string,
}

function Page() {
    const [state, setState] = useState<State>({
        is_modified: false,
        is_searching: false,
        is_error: false,

        data: {
            radio: "仮",
        },
    });

    const text: Text = {
        id: "",
        name: "GETTO CSS",
    };

    const delay = 2.5 * 1000;

    return html`
        <article class="layout__main">
            <header class="main__header">
                <h1 class="main__title">検索</h1>
                <p class="main__breadcrumb">
                    <a class="main__breadcrumb__item" href="#menu" class="main__breadcrumb__item">MAIN</a>
                    <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
                    <a class="main__breadcrumb__item" href="/${config.version}/search.html" class="main__breadcrumb__item"><i class="lnir lnir-search-alt"></i> 検索</a>
                </p>
            </header>
            <section class="main__body">
                ${searchForm()}
                <section class="container">
                    ${pager()}
                    ${searchColumn()}
                </section>
                ${table()}
            </section>
            <footer class="main__footer">
                <p class="main__footer__message">powered by : LineIcons / みんなの文字</p>
            </footer>
        </article>
    `;

    function idInput(e: InputEvent) {
        if (e.target instanceof HTMLInputElement) {
            const target = e.target as HTMLInputElement;
            text.id = target.value;

            setState({
                is_modified: true,
                is_searching: state.is_searching,
                is_error: state.is_error,

                data: state.data,
            });
        }
    }

    function nameInput(e: InputEvent) {
        if (e.target instanceof HTMLInputElement) {
            const target = e.target as HTMLInputElement;
            text.name = target.value;

            setState({
                is_modified: true,
                is_searching: state.is_searching,
                is_error: state.is_error,

                data: state.data,
            });
        }
    }

    function radioClicked(e: MouseEvent) {
        if (e.target instanceof HTMLInputElement) {
            const target = e.target as HTMLInputElement;
            state.data.radio = target.value;

            setState({
                is_modified: true,
                is_searching: state.is_searching,
                is_error: state.is_error,

                data: state.data,
            });
        }
    }

    function search(e: MouseEvent) {
        e.preventDefault();

        setState({
            is_modified: state.is_modified,
            is_searching: true,
            is_error: state.is_error,

            data: state.data,
        });

        setTimeout(() => {
            setState({
                is_modified: false,
                is_searching: false,
                is_error: true,

                data: state.data,
            });
        }, delay);
    }

    function searchForm() {
        return html`
            <form class="box box_fill box_search">
                <section class="box__body container">
                    <dl class="search">
                        <dt class="search__header">ID</dt>
                        <dd class="search__field">
                            <input type="text" class="input_fill" defaultValue="${text.id}" onInput="${idInput}"/>
                            <p class="search__help">完全一致検索</p>
                        </dd>
                    </dl>
                    <dl class="search search_double">
                        <dt class="search__header">名前</dt>
                        <dd class="search__field">
                            <input type="text" class="input_fill" defaultValue="${text.name}" onInput="${nameInput}"/>
                        </dd>
                    </dl>
                    <dl class="search">
                        <dt class="search__header">radio</dt>
                        <dd class="search__field">
                        <small>
                            <label class="input__radio input_checked">
                                <input type="radio" name="radio" value="仮" checked="${state.data.radio === "仮"}" onClick="${radioClicked}"/>仮
                            </label>
                            <label class="input__radio">
                                <input type="radio" name="radio" value="作業中" checked="${state.data.radio === "作業中"}" onClick="${radioClicked}"/>作業中
                            </label>
                            <label class="input__radio">
                                <input type="radio" name="radio" value="完了" checked="${state.data.radio === "完了"}" onClick="${radioClicked}"/>完了
                            </label>
                            <label class="input__radio">
                                <input type="radio" name="radio" value="審査申請中" checked="${state.data.radio === "審査申請中"}" onClick="${radioClicked}"/>審査申請中
                            </label>
                        </small>
                        </dd>
                    </dl>
                </section>
                <footer class="box__footer search_error">
                    ${searchButton()}
                    ${searchError()}
                </footer>
            </form>
        `

        function searchButton() {
            if (state.is_searching) {
                return html`
                    <button class="button button_searching" type="button">
                        <i class="lnir lnir-spinner-11 lnir-is-spinning"></i>
                        ${" "}
                        検索中
                    </button>
                `
            } else {
                return html`
                    <button class="button button_search ${state.is_modified ? "button_modified" : ""}" onClick="${search}">
                        <i class="lnir lnir-search-alt"></i>
                        ${" "}
                        検索
                    </button>
                `
            }
        }

        function searchError() {
            if (!state.is_error) {
                return html``
            }

            return html`
                <p class="search__message">通信エラーが発生しました。もう一度試してください</p>
            `
        }
    }

    function searchColumn() {
        return html`
            <section class="box box_grow">
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
                <table class="table table_thin table_sticky">
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
                    <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil"></i> 編集</a></td>
                </tr>
                <tr class="row row_hoverable">
                    <td class="cell_border_b">123</td>
                    <td class="cell_border_b cell_border_rr">GETTO</td>
                    <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
                    <td class="cell_border_b">user@example.com</td>
                    <td class="cell_border_b cell_nokern cell_right">13,500</td>
                    <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
                    <td class="cell_border_b">simple css theme</td>
                    <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil"></i> 編集</a></td>
                </tr>
            `
        }
    }
}
