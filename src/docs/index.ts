import { h, render } from "preact";
import { Menu } from "../menu";
import "../getto.css";

const app = h("main", { class: "layout" }, [
    h(Page, null, null),
    h(Menu, null, null),
]);
render(app, document.body);

import { useState } from "preact/hooks";
import { html } from "htm/preact";
import { config } from "../config.js";

function Page() {
    return html`
    <article class="layout__main">
      <header class="main__header">
        <h1 class="main__title">ドキュメント</h1>
        <p class="main__breadcrumb">
          <a href="#menu">MAIN</a>
          <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
          <a href="/${config.version}/docs/index.html"><i class="lnir lnir-question-circle"></i> ドキュメント</a>
        </p>
      </header>
      <section class="main__body container">
        <section class="box">
          <div>
            <header class="box__header">
              <h2 class="box__title">GETTO CSS のゴール</h2>
            </header>
            <section class="box__body paragraph">
              <p>業務アプリケーションで使用可能な、汎用の管理画面用 CSS を提供する</p>
              <br/>
              <p>この CSS を読み込むだけで、ある程度体裁が整うようにしたい</p>
              <br/>
              <p>各プロジェクト固有のスタイルは分離</p>
            </section>
          </div>
        </section>
        <section class="box">
          <div>
            <header class="box__header">
              <h2 class="box__title">コンポーネント定義について</h2>
            </header>
            <section class="box__body paragraph">
              <p>コンポーネント定義は提供しない</p>
              <p>この CSS を使用するためのコンポーネント定義(React とか Vue とか)が必要</p>
              <br/>
              <p>コンポーネント定義は CSS と密結合</p>
              <strong><p>各プロジェクトでは、この結合部分は分離しておくこと</p></strong>
            </section>
          </div>
        </section>
        <section class="box">
          <div>
            <header class="box__header">
              <h2 class="box__title">色テーマ</h2>
            </header>
            <section class="box__body paragraph">
              <p>color.css にまとめて定義してある</p>
              <p>差し替えは想定していない</p>
            </section>
          </div>
        </section>
        <section class="box">
          <div>
            <header class="box__header">
              <h2 class="box__title">フォントとアイコン</h2>
            </header>
            <section class="box__body paragraph">
              <section class="content">
                <p>フォントとアイコンはバンドルしない</p>
                <p>各プロジェクトで選択可能</p>
                <p>最適化は以下のリソースを使用</p>
              </section>
              <dl class="form">
                <dt class="form__header">フォント</dt>
                <dd class="form__field">
                  <p>みんなの文字</p>
                </dd>
              </dl>
              <dl class="form">
                <dt class="form__header">アイコン</dt>
                <dd class="form__field">
                  <p>LineIcons</p>
                </dd>
              </dl>
            </section>
          </div>
        </section>
        <section class="box">
          <div>
            <header class="box__header">
              <h2 class="box__title">フォントサイズ</h2>
            </header>
            <section class="box__body paragraph">
              <dl class="form">
                <dt class="form__header">相対指定</dt>
                <dd class="form__field">
                  <ul>
                    <li>big / small</li>
                    <li>badge / label / notice</li>
                    <li>button / input</li>
                    <li>loading</li>
                  </ul>
                </dd>
              </dl>
              <dl class="form">
                <dt class="form__header">絶対指定</dt>
                <dd class="form__field">
                  <ul>
                    <li>main : title / footer</li>
                    <li>menu : title / brand / footer</li>
                    <li>modal : title</li>
                    <li>search : header / help</li>
                    <li>form : header / help / message</li>
                    <li>table : th</li>
                    <li>document : title / folio</li>
                    <li>login : 各構成要素</li>
                  </ul>
                </dd>
              </dl>
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
