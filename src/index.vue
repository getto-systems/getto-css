<script lang="ts">
import { Ref, reactive, ref } from "vue";

type State = {
  versions: Array<string>,
};

type Data = {
  version: Ref<string>,
};

export default {
  setup() {
    const state = reactive<State>({
      versions: [
        "xxx.xxx.xxx",
      ],
    });

    const data: Data = {
      version: ref(state.versions[0]),
    };

    return {
      state,
      data,
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
          <button type="button" class="button button_edit"><i class="lnir lnir-pointer-up"></i> 選択</button>
        </section>
      </footer>
    </section>
  </section>
  <footer class="main__footer">
    <p class="main__footer__message">powered by : LineIcons / みんなの文字</p>
  </footer>
</article>

</template>

<style>
</style>
