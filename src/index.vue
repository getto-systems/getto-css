<script lang="ts">
import { Ref, reactive, ref } from "vue";
import { config } from "./config.js";

type State = {
  versions: Array<string>,
};

type Data = {
  version: Ref<string>,
};

export default {
  setup() {
    const version = config.version;

    const state = reactive<State>({
      versions: version.all,
    });

    const data: Data = {
      version: ref(version.current),
    };

    function redirect() {
      if (!config.isProduction) {
        return;
      }

      const path = location.pathname;
      const redirect_to = path.replace(config.version.current, data.version.value);
      location.href = redirect_to;
    }

    return {
      state,
      data,
      redirect,
    };
  }
};
</script>

<template>

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
              <select v-model="data.version">
                <option v-for="version in state.versions" :key="version">{{ version }}</option>
              </select>
            </dd>
          </dl>
        </section>
      </div>
      <footer class="box__footer">
        <section class="button__container">
          <button type="button" class="button button_edit" @click.prevent="redirect"><i class="lnir lnir-pointer-up"></i> 選択</button>
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

</template>

<style>
</style>
