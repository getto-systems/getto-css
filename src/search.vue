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

<template>

<article class="layout__main">
  <header class="main__header">
    <h1 class="main__title">検索</h1>
    <p class="main__breadcrumb">
      <span>MAIN</span>
      <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
      <a href="/dist/search.html"><i class="lnir lnir-home"></i> 検索</a>
    </p>
  </header>
  <section class="main__body">
    <form class="box box_fill">
      <section class="box__body container">
        <dl class="search">
          <dt class="search__header">ID</dt>
          <dd class="search__field">
            <input type="text" value="" class="input_fill">
            <p class="search__help">完全一致検索</p>
          </dd>
        </dl>
        <dl class="search search_double">
          <dt class="search__header">名前</dt>
          <dd class="search__field">
            <input type="text" value="" class="input_fill">
          </dd>
        </dl>
        <dl class="search">
          <dt class="search__header">radio</dt>
          <dd class="search__field">
            <small>
              <label class="input__radio"><input type="radio" name="radio" checked>仮</label>
              <label class="input__radio"><input type="radio" name="radio">作業中</label>
              <label class="input__radio"><input type="radio" name="radio">完了</label>
              <label class="input__radio"><input type="radio" name="radio">審査申請中</label>
            </small>
          </dd>
        </dl>
        <dl class="search">
          <dt class="search__header">checkbox</dt>
          <dd class="search__field">
            <small>
              <label class="input__checkbox"><input type="checkbox">仮</label>
              <label class="input__checkbox"><input type="checkbox">作業中</label>
              <label class="input__checkbox"><input type="checkbox">完了</label>
              <label class="input__checkbox"><input type="checkbox">審査申請中</label>
            </small>
          </dd>
        </dl>
      </section>
      <footer class="box__footer">
        <button class="button button_search"><i class="lnir lnir-search-alt"></i> 検索</button>
      </footer>
    </form>
    <section>
      テーブル
    </section>
  </section>
  <footer class="main__footer">
    <p class="main__footer__message">powered by LineIcons / copyright GETTO.systems</p>
  </footer>
</article>

</template>

<style>
</style>
