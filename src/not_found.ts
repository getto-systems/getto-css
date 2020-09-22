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

function Page() {
    return html`
        <aside class="login">
            <section class="login__box">
                <header class="login__header">
                    <cite class="login__brand">GETTO</cite>
                    <strong class="login__title">CSS</strong>
                    <cite class="login__subTitle">simple admin theme</cite>
                </header>
                <section class="login__message">
                    <h3 class="login__message__title">見つかりませんでした</h3>
                    <section class="login__message__body paragraph">
                        <p>リンクされたページは存在しません</p>
                        <p>お手数ですが、管理者にクリックしたリンクをお伝えください</p>
                    </section>
                </section>
                <footer class="login__footer button__container">
                    <div></div>
                    <div class="login__link">
                        <a href="/${config.version}/index.html"><i class="lnir lnir-home"></i> ホームへ</a>
                    </div>
                </footer>
            </section>
        </aside>
    `
}
