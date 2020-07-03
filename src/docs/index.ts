import { h, render } from "preact";
import { Menu } from "../menu.ts";
import "../getto.css";

const app = h("main", { class: "layout" }, [
  h(Page, null, null),
  h(Menu, null, null),
]);
render(app, document.body);

import { useState } from "preact/hooks";
import { html } from "htm/preact";

function Page() {
  return html`
    <article class="layout__main">
      <header class="main__header">
        <h1 class="main__title">ドキュメント</h1>
        <p class="main__breadcrumb">
          <a href="#menu">MAIN</a>
          <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
          <a href="/dist/docs/index.html"><i class="lnir lnir-question-circle"></i> ドキュメント</a>
        </p>
      </header>
      <section class="main__body container">
        <section class="box">
          <div>
            <header class="box__header">
              <h2 class="box__title">GETTO CSS</h2>
            </header>
            <section class="box__body">
              ドキュメント
            </section>
          </div>
        </section>
      </section>
      <footer class="main__footer">
        <p class="main__footer__message">powered by : LineIcons / みんなの文字</p>
      </footer>
    </article>
  `;
};
