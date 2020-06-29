import { h, render } from "preact";
import { Menu } from "./menu.ts";
import "./getto.css";

const app = h("main", { class: "layout" }, [
  h(Page, null, null),
  h(Menu, null, null),
]);
render(app, document.body);

import { useState } from "preact/hooks";
import { html } from "htm/preact";

type State = {
  login: Modal,
}

type Modal = {
  active: boolean,
  connecting: boolean,
  fill: boolean,

  forget: Forget,
}

type Forget = {
  active: boolean,
  connecting: boolean,
  fill: boolean,
  complete: boolean,
}

type Text = {
  login: LoginText,
  forget: ForgetText,
}

type LoginText = {
  loginID: string,
  password: string,
}

type ForgetText = {
  email: string,
}

function Page() {
  const [state, setState] = useState<State>({
    login: {
      active: false,
      connecting: false,
      fill: false,

      forget: {
        active: false,
        connecting: false,
        fill: false,
        complete: false,
      },
    },
  });

  const text = {
    login: {
      loginID: "",
      password: "",
    },
    forget: {
      email: "",
    },
  };

  const delay = 2.5 * 1000;

  return html`
    <article class="layout__main">
      <header class="main__header">
        <h1 class="main__title">ログイン</h1>
        <p class="main__breadcrumb">
          <a href="#menu">MAIN</a>
          <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
          <a href="/dist/index.html"><i class="lnir lnir-enter"></i> ログイン</a>
        </p>
      </header>
      <section class="main__body container">
        ${logout()}
      </section>
      <footer class="main__footer">
        <p class="main__footer__message">powered by : LineIcons / みんなの文字</p>
      </footer>
    </article>
  `

  function setLogin() {
    state.login.active = true;
    state.login.connecting = false;
    setState({
      login: state.login,
    });
  }

  function doLogin() {
    state.login.connecting = true;
    setState({
      login: state.login,
    });

    setTimeout(() => {
      state.login.active = false;
      state.login.connecting = false;
      setState({
        login: state.login,
      });
    }, delay);
  }

  function resetLogin(e: MouseEvent) {
    e.preventDefault();

    state.login.active = false;
    setState({
      login: state.login,
    });
  }

  function setForget(e: MouseEvent) {
    e.preventDefault();

    state.login.forget.active = true;
    state.login.forget.connecting = false;
    state.login.forget.complete = false;
    setState({
      login: state.login,
    });
  }

  function doForget() {
    state.login.forget.connecting = true;
    setState({
      login: state.login,
    });

    setTimeout(() => {
      state.login.forget.connecting = false;
      state.login.forget.complete = true;
      setState({
        login: state.login,
      });
    }, delay);
  }

  function resetForget(e: MouseEvent) {
    e.preventDefault();

    state.login.forget.active = false;
    setState({
      login: state.login,
    });
  }

  function resetAll(e: MouseEvent) {
    if (e.target instanceof HTMLElement) {
      const target = e.target as HTMLElement;
      if (target.dataset.modal === "true") {
        resetLogin(e);
        resetForget(e);
      }
    }
  }

  function loginIDInput(e: InputEvent) {
    if (e.target instanceof HTMLInputElement) {
      const target = e.target as HTMLInputElement;
      text.login.loginID = target.value;

      state.login.fill = true;
      setState({
        login: state.login,
      });
    }
  }

  function passwordInput(e: InputEvent) {
    if (e.target instanceof HTMLInputElement) {
      const target = e.target as HTMLInputElement;
      text.login.password = target.value;

      state.login.fill = true;
      setState({
        login: state.login,
      });
    }
  }

  function emailInput(e: InputEvent) {
    if (e.target instanceof HTMLInputElement) {
      const target = e.target as HTMLInputElement;
      text.forget.email = target.value;

      state.login.forget.fill = true;
      setState({
        login: state.login,
      });
    }
  }

  function logout() {
    return html`
      <section class="box">
        <header class="box__header">
          <h2 class="box__title">ログアウト</h2>
        </header>
        <section class="box__body">
          <button type="button" class="button button_delete" onClick="${setLogin}"><i class="lnir lnir-exit"></i> ログアウト</button>
        </section>
      </section>
      ${modal()}
    `

    function modal() {
      if (!state.login.active && !state.login.connecting) {
        return html``
      }

      return html`
        <aside class="login" onClick="${resetAll}" data-modal="true">
          ${state.login.forget.active ?
            forget() :
            login()}
        </aside>
      `
    }

    function login() {
      return html`
        <section class="login__box">
          <header class="login__header">
            <cite class="login__brand">GETTO</cite>
            <strong class="login__title">CSS</strong>
            <cite class="login__subTitle">simple admin theme</cite>
          </header>
          <big>
            <section class="login__body">
              <dl class="form">
                <dt class="form__header"><label for="login-id">ログインID</label></dt>
                <dd class="form__field">
                  <input type="text" class="input_fill" id="login-id" onInput="${loginIDInput}"/>
                </dd>
              </dl>
              <dl class="form form_error">
                <dt class="form__header"><label for="password">パスワード</label></dt>
                <dd class="form__field">
                  <input type="text" class="input_fill" id="password" onInput="${passwordInput}"/>
                  <p class="form__message">パスワードを入力してください</p>
                </dd>
              </dl>
            </section>
          </big>
          <big>
            <footer class="login__footer button__container">
              ${loginButton()}
              <div class="login__link">
                <a href="#" onClick="${setForget}"><i class="lnir lnir-question-circle"></i> パスワードを忘れた方</a>
              </div>
            </footer>
          </big>
        </section>
      `

      function loginButton() {
        if (state.login.connecting) {
          return html`
            <button type="button" class="button button_saving">
              <i class="lnir lnir-spinner-11 lnir-is-spinning"></i> ログイン中
            </button>
          `
        } else {
          return html`
            <button type="button" class="button button_save ${state.login.fill ? "button_modified" : ""}" onClick="${doLogin}">
              ログイン
            </button>
          `
        }
      }
    }

    function forget() {
      return html`
        <section class="login__box">
          <header class="login__header">
            <cite class="login__brand">GETTO</cite>
            <strong class="login__title">CSS</strong>
            <cite class="login__subTitle">simple admin theme</cite>
          </header>
          <big>
            <section class="login__body">
              ${forgetContent()}
            </section>
          </big>
          <big>
            <footer class="login__footer button__container">
              ${forgetButton()}
              <div class="login__link">
                <a href="#" onClick="${resetForget}"><i class="lnir lnir-enter"></i> ログインフォームを表示</a>
              </div>
            </footer>
          </big>
        </section>
      `

      function forgetButton() {
        if (state.login.forget.complete || state.login.forget.connecting) {
          return html`<span></span>` // リンクを右寄せにするため
        }

        return html`
          <button type="button" class="button button_save ${state.login.forget.fill ? "button_modified" : ""}" onClick="${doForget}">
            メール送信
          </button>
        `
      }

      function forgetContent() {
        if (state.login.forget.complete) {
          return forgetComplete();
        }

        if (state.login.forget.connecting) {
          return forgetConnecting();
        }

        return forgetInput();

        function forgetComplete() {
          return html`
            <div class="loading loading_login">
              <p class="loading__message">
                送信した URL にアクセスして
                <br/>
                パスワードを変更してください
              </p>
            </div>
          `
        }

        function forgetConnecting() {
          return html`
            <div class="loading loading_login">
              <i class="lnir lnir-spinner-11 lnir-is-spinning"></i>
              <p class="loading__message">送信中です</p>
            </div>
          `
        }

        function forgetInput() {
          return html`
            <dl class="form">
              <dt class="form__header"><label for="forget-email">メールアドレス</label></dt>
              <dd class="form__field">
                <input type="email" class="input_fill" id="forget-email" onInput="${emailInput}"/>
                <p class="form__help">パスワードを変更できる変更 URL を送信します</p>
              </dd>
            </dl>
          `
        }
      }
    }
  }
}
