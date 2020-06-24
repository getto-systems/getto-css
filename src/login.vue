<script lang="ts">
import { Ref, reactive, ref, watch } from "vue";

type State = {
  login: Modal,
  forget: Modal,
};

type Modal = {
  active: boolean,
  connecting: boolean,
  fill: boolean,
  complete: boolean,
};

type Data = {
  login: Credential,
  forget: Forget,
};

type Credential = {
  loginID: Ref<string>,
  password: Ref<string>,
}

type Forget = {
  email: Ref<string>,
}

export default {
  setup() {
    const state = reactive<State>({
      login: {
        active: false,
        connecting: false,
        fill: false,
        complete: false,
      },
      forget: {
        active: false,
        connecting: false,
        fill: false,
        complete: false,
      },
    });

    const data = {
      login: {
        loginID: ref(""),
        password: ref(""),
      },
      forget: {
        email: ref(""),
      },
    };

    const delay = 2.5 * 1000;

    watch([data.login.loginID, data.login.password], (current,prev) => {
      state.login.fill = data.login.loginID.value.length > 0 && data.login.password.value.length > 0;
    });

    watch([data.forget.email], (current,prev) => {
      state.forget.fill = data.forget.email.value.length > 0;
    });

    function setLogin() {
      state.login.active = true;
      state.login.connecting = false;
    }

    function doLogin() {
      state.login.connecting = true;
      setTimeout(() => {
        state.login.active = false;
        state.login.connecting = false;
      }, delay);
    }

    function resetLogin() {
      state.login.active = false;
    }

    function setForget() {
      state.forget.active = true;
      state.forget.connecting = false;
      state.forget.complete = false;
    }

    function doForget() {
      state.forget.connecting = true;
      setTimeout(() => {
        state.forget.connecting = false;
        state.forget.complete = true;
      }, delay);
    }

    function resetForget() {
      state.forget.active = false;
    }

    function resetAll() {
      resetLogin();
      resetForget();
    }

    return {
      state,
      data,
      setLogin,
      doLogin,
      resetLogin,
      setForget,
      doForget,
      resetForget,
      resetAll,
    };
  }
};
</script>

<template>

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
    <section class="box">
      <header class="box__header">
        <h2 class="box__title">ログアウト</h2>
      </header>
      <section class="box__body">
        <button type="button" class="button button_delete" @click="setLogin"><i class="lnir lnir-exit"></i> ログアウト</button>
      </section>
    </section>
  </section>
  <footer class="main__footer">
    <p class="main__footer__message">powered by : LineIcons / みんなの文字</p>
  </footer>

  <aside v-if="state.login.active || state.login.connecting" class="login" @click.self="resetAll">
    <div v-if="!state.forget.active">
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
                <input type="text" class="input_fill" v-model="data.login.loginID" id="login-id">
              </dd>
            </dl>
            <dl class="form form_error">
              <dt class="form__header"><label for="password">パスワード</label></dt>
              <dd class="form__field">
                <input type="text" class="input_fill" v-model="data.login.password" id="password">
                <p class="form__message">パスワードを入力してください</p>
              </dd>
            </dl>
          </section>
        </big>
        <big>
          <footer class="login__footer button__container">
            <button v-if="!state.login.connecting" type="button" class="button button_save" :class="{ button_modified: state.login.fill }" @click="doLogin">ログイン</button>
            <button v-else type="button" class="button button_saving"><i class="lnir lnir-spinner-11 lnir-is-spinning"></i> ログイン中</button>
            <div class="login__link">
              <a href="#" @click.prevent="setForget"><i class="lnir lnir-question-circle"></i> パスワードを忘れた方</a>
            </div>
          </footer>
        </big>
      </section>
    </div>
    <div v-else>
      <section class="login__box">
        <header class="login__header">
          <cite class="login__brand">GETTO</cite>
          <strong class="login__title">CSS</strong>
          <cite class="login__subTitle">simple admin theme</cite>
        </header>
        <big>
          <section class="login__body">
            <div v-if="state.forget.complete">
              <div class="loading loading_login">
                <p class="loading__message">送信した URL にアクセスして<br>パスワードを変更してください</p>
              </div>
            </div>
            <div v-else-if="!state.forget.connecting">
              <dl class="form">
                <dt class="form__header"><label for="forget-email">メールアドレス</label></dt>
                <dd class="form__field">
                  <input type="email" class="input_fill" v-model="data.forget.email" id="forget-email">
                  <p class="form__help">パスワードを変更できる変更 URL を送信します</p>
                </dd>
              </dl>
            </div>
            <div v-else>
              <div class="loading loading_login">
                <i class="lnir lnir-spinner-11 lnir-is-spinning"></i>
                <p class="loading__message">送信中です</p>
              </div>
            </div>
          </section>
        </big>
        <big>
          <footer class="login__footer button__container">
            <button v-if="!state.forget.complete && !state.forget.connecting" type="button" class="button button_save" :class="{ button_modified: state.forget.fill }" @click="doForget">メール送信</button>
            <span v-else></span>
            <div class="login__link">
              <a href="#" @click.prevent="resetForget"><i class="lnir lnir-enter"></i> ログインする</a>
            </div>
          </footer>
        </big>
      </section>
    </div>
  </aside>
</article>

</template>

<style>
</style>
