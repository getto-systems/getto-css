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
                    <a href="#menu" class="main__breadcrumb__item">MAIN</a>
                    <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
                    <a href="/${config.version}/search.html" class="main__breadcrumb__item"><i class="lnir lnir-search-alt"></i> 検索</a>
                </p>
            </header>
            <section class="main__body">
                ${searchForm()}
                ${searchColumn()}
                ${pager()}
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
          <dl class="search search_double search_use">
            <dt class="search__header">名前</dt>
            <dd class="search__field">
              <input type="text" class="input_fill" defaultValue="${text.name}" onInput="${nameInput}"/>
            </dd>
          </dl>
          <dl class="search search_use">
            <dt class="search__header">radio</dt>
            <dd class="search__field">
              <small>
                <label class="input__radio search_checked">
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
            <section class="search__column">
                <div><label class="input__checkbox search__column_active"><input type="checkbox" checked/>ID</label></div>
                <div><label class="input__checkbox search__column_active"><input type="checkbox" checked/>名前</label></div>
                <div><label class="input__checkbox search__column_active"><input type="checkbox" checked/>状態</label></div>
                <div><label class="input__checkbox search__column_active"><input type="checkbox" checked/>メールアドレス</label></div>
                <div><label class="input__checkbox search__column_active"><input type="checkbox" checked/>更新日時</label></div>
                <div><label class="input__checkbox search__column_active"><input type="checkbox" checked/>メモ</label></div>
            </section>
        `
    }

    function pager() {
        return html`
      <section class="content">
        <select class="pager">
          <option>1 / 10 ページ</option>
          <option>2 / 10 ページ</option>
          <option>3 / 10 ページ</option>
          <option>4 / 10 ページ</option>
          <option>5 / 10 ページ</option>
          <option>6 / 10 ページ</option>
          <option>7 / 10 ページ</option>
          <option>8 / 10 ページ</option>
          <option>9 / 10 ページ</option>
          <option>10 / 10 ページ</option>
        </select>
        <span>1 ～ 1000 件 / 全 5000 件中</span>
      </section>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
              <td class="cell_border_b cell_nokern cell_right">13,500</td>
              <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
              <td class="cell_border_b">simple css theme</td>
              <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
            </tr>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
              <td class="cell_border_b cell_nokern cell_right">13,500</td>
              <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
              <td class="cell_border_b">simple css theme</td>
              <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
            </tr>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
              <td class="cell_border_b cell_nokern cell_right">13,500</td>
              <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
              <td class="cell_border_b">simple css theme</td>
              <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
            </tr>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
              <td class="cell_border_b cell_nokern cell_right">13,500</td>
              <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
              <td class="cell_border_b">simple css theme</td>
              <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
            </tr>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
              <td class="cell_border_b cell_nokern cell_right">13,500</td>
              <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
              <td class="cell_border_b">simple css theme</td>
              <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
            </tr>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
              <td class="cell_border_b cell_nokern cell_right">13,500</td>
              <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
              <td class="cell_border_b">simple css theme</td>
              <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
            </tr>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
              <td class="cell_border_b cell_nokern cell_right">13,500</td>
              <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
              <td class="cell_border_b">simple css theme</td>
              <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
            </tr>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
              <td class="cell_border_b cell_nokern cell_right">13,500</td>
              <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
              <td class="cell_border_b">simple css theme</td>
              <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
            </tr>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
              <td class="cell_border_b cell_nokern cell_right">13,500</td>
              <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
              <td class="cell_border_b">simple css theme</td>
              <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
            </tr>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
              <td class="cell_border_b cell_nokern cell_right">13,500</td>
              <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
              <td class="cell_border_b">simple css theme</td>
              <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
            </tr>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
              <td class="cell_border_b cell_nokern cell_right">13,500</td>
              <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
              <td class="cell_border_b">simple css theme</td>
              <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
            </tr>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
              <td class="cell_border_b cell_nokern cell_right">13,500</td>
              <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
              <td class="cell_border_b">simple css theme</td>
              <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
            </tr>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
              <td class="cell_border_b cell_nokern cell_right">13,500</td>
              <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
              <td class="cell_border_b">simple css theme</td>
              <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
            </tr>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
              <td class="cell_border_b cell_nokern cell_right">13,500</td>
              <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
              <td class="cell_border_b">simple css theme</td>
              <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
            </tr>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
              <td class="cell_border_b cell_nokern cell_right">13,500</td>
              <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
              <td class="cell_border_b">simple css theme</td>
              <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
            </tr>
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
            <tr class="row row_hoverable">
              <td class="cell_border_b">123</td>
              <td class="cell_border_b cell_border_rr">GETTO</td>
              <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
              <td class="cell_border_b">user@example.com</td>
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
