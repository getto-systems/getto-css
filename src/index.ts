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
import { config } from "./config.js";

type State = {
  versions: Array<string>,
  version: string,
}

function Page() {
  const version = config.version;

  const [state, setState] = useState<State>({
    versions: version.all,
    version: version.current,
  });

  function redirect() {
    if (!config.isProduction) {
      alert(`redirect to: ${state.version}`);
      return;
    }

    const path = location.pathname;
    const redirect_to = path.replace(config.version.current, state.version);
    location.href = redirect_to;
  }

  return html`
    <article class="layout__main">
      <header class="main__header">
        <h1 class="main__title">ホーム</h1>
        <p class="main__breadcrumb">
          <a href="#menu">MAIN</a>
          <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
          <a href="/dist/index.html"><i class="lnir lnir-home"></i> ホーム</a>
        </p>
      </header>
      <section class="main__body container">
        <section class="box">
          <div>
            <header class="box__header">
              <h2 class="box__title">GETTO CSS</h2>
            </header>
            <section class="box__body">
              <dl class="form">
                <dt class="form__header">バージョン</dt>
                <dd class="form__field">
                  <select value="${state.version}">
                    ${state.versions.map((version) => html`<option value="${version}">${version}</option>`)}
                  </select>
                </dd>
              </dl>
            </section>
          </div>
          <footer class="box__footer">
            <section class="button__container">
              <button type="button" class="button button_edit" onClick="${redirect}"><i class="lnir lnir-pointer-up"></i> 選択</button>
            </section>
          </footer>
        </section>
        <section class="box">
          <div>
            <header class="box__header">
              <h2 class="box__title">badge / notice</h2>
            </header>
            <section class="box__body">
              <dl class="form">
                <dt class="form__header">badge</dt>
                <dd class="form__field">
                  <span class="badge badge_gray">10</span>
                  <span class="badge badge_alert">10</span>
                  <span class="badge badge_success">10</span>
                  <span class="badge badge_warning">10</span>
                  <span class="badge badge_pending">10</span>
                  <span class="badge badge_info">10</span>
                </dd>
              </dl>
              <dl class="form">
                <dt class="form__header">notice</dt>
                <dd class="form__field">
                  <p class="notice notice_gray">データを登録してください</p>
                  <p class="notice notice_alert">データを登録してください</p>
                  <p class="notice notice_success">データを登録してください</p>
                  <p class="notice notice_warning">データを登録してください</p>
                  <p class="notice notice_pending">データを登録してください</p>
                  <p class="notice notice_info">データを登録してください</p>
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

/*
import { useState, useRef, useEffect } from "preact/hooks";
import { html } from "htm/preact";

type Data = {
  message: string,
  show: boolean,
  value: string,
  input: string,
  date: Date,
};

function HelloWorld() {
  const [data, setData] = useState<Data>({
    message: "Hello, preact World!",
    show: false,
    value: "default",
    input: "",
    date: new Date(),
  });

  const form = useRef<HTMLFormElement>(null);

  const valueChanged = (e: { target: { value: string } }) => {
    setData({
      message: data.message,
      show: data.show,
      value: e.target.value,
      input: data.input,
      date: data.date,
    });
  };

  const inputChanged = (e: { target: { value: string } }) => {
    setData({
      message: data.message,
      show: data.show,
      value: data.value,
      input: e.target.value,
      date: data.date,
    });
  };

  const toggleForm = () => {
    setData({
      message: data.message,
      show: !data.show,
      value: data.value,
      input: data.value,
      date: data.date,
    });
  };

  useEffect(() => {
    const current = form.current;

    if (current) {
      if (data.show) {
        const input = current.input;
        input.focus();

        const val = input.value;
        input.setSelectionRange(val.length, val.length);
      }
    }
  }, [data.show]);

  const reset = () => {
    const current = form.current;
    if (current) {
      current.input.value = data.value;
    }
  };

  const showDate = (date: Date) => {
    return `${date}`;
  }

  setTimeout(() => {
    setData({
      message: data.message,
      show: data.show,
      value: data.value,
      input: data.value,
      date: new Date(),
    });
  }, 10000);

  return html`
    <h1>${data.message}(${data.value} / ${showDate(data.date)})</h1>
    <button type="button" onClick="${toggleForm}">Toggle</button>
    <input type="text" value="${data.value}" onInput="${valueChanged}"/>
    ${data.show ?
      html`
        <form ref="${form}">
          <input type="text" name="input" defaultValue="${data.input}" onInput="${inputChanged}"/>
          (${data.input})
          <button type="button" onClick="${reset}">reset</button>
        </form>
      ` :
      html``
    }
  `;
}

*/
