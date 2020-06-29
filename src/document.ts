import { h, render } from "preact";
import { Menu } from "./menu.ts";
import "./getto.css";

const app = h("main", { class: "layout" }, [
  h(Menu, null, null),
  h(Page, null, null),
]);
render(app, document.body);

import { useState } from "preact/hooks";
import { html } from "htm/preact";

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
        <h1 class="main__title">書類</h1>
        <p class="main__breadcrumb">
          <a href="#menu">MAIN</a>
          <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
          <a href="/dist/document.html"><i class="lnir lnir-folder"></i> 書類</a>
        </p>
      </header>
      <section class="main__body">
        ${searchForm()}
        <section class="content content_overflow">
          ${page(1)}
          ${page(2)}
          ${page(3)}
          ${page(4)}
          ${page(5)}
        </section>
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
      <form class="box box_fill paper_hide">
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
          <button class="button button_search" onClick="${search}"><i class="lnir lnir-reload"></i> 再読み込み</button>
        `
      }
    }
  }

  function page(number: number) {
    if (number === 1) {
      return firstPage();
    } else {
      return secondPage(number);
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
}
