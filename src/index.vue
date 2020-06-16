<template>

<article class="layout__main">
  <header class="main__header">
    <h1 class="main__title">ホーム</h1>
    <p class="main__breadcrumb">
      <span>MAIN</span>
      <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
      <a href="/dist/index.html"><i class="lnir lnir-home"></i> home</a>
    </p>
  </header>
  <section class="main__body">
    <a href="#">link</a>
  </section>
  <footer class="main__footer">
    <p class="main__footer__message">powered by LineIcons / copyright GETTO.systems</p>
  </footer>
</article>

</template>

<script lang="ts">
import { reactive } from "vue";

type State = {
};

export default {
  setup() {
    const state = reactive<State>({
    });

    return {
      state,
    };
  }
};
</script>

<style>
</style>
