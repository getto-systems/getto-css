<script lang="ts">
import { Ref, ref, reactive, watch } from "vue";

type State = {
  is_searching: boolean,
};

export default {
  setup() {
    const delay = 2.5 * 1000;

    const state = reactive<State>({
      is_searching: false,
    });

    function search() {
      state.is_searching = true;

      setTimeout(() => {
        state.is_searching = false;
      }, delay);
    }

    return {
      state,
      search,
    };
  }
};
</script>

<template>

<article class="layout__main">
  <header class="main__header">
    <h1 class="main__title">書類</h1>
    <p class="main__breadcrumb">
      <a href="#menu">MAIN</a>
      <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
      <a href="/dist/document.html"><i class="lnir lnir-folder"></i> 書類</a>
    </p>
  </header>
  <section class="main__body">
    <form class="box box_fill">
      <section class="box__body">
        <button v-if="!state.is_searching" class="button button_search" :class="{ button_modified: state.is_modified }" @click.prevent="search"><i class="lnir lnir-reload"></i> 再読み込み</button>
        <button v-else class="button button_searching" @click.prevent="search"><i class="lnir lnir-spinner-11 lnir-is-spinning"></i> 読み込み中</button>
      </section>
    </form>
    <section class="content content_overflow">
      <section class="document document_a4_portrait">
        <div>
          <header class="document__header">
            <h2 class="document__title document__title_center">作業申請書</h2>
          </header>

          <table class="table table_fill">
            <thead class="table__header">
              <tr>
                <th class="cell_border_t cell_border_bb cell_border_l">ID</th>
                <th class="cell_border_t cell_border_bb cell_border_rr">名前</th>
                <th class="cell_border_t cell_border_bb">メールアドレス</th>
                <th class="cell_border_t cell_border_bb">価格</th>
                <th class="cell_border_t cell_border_bb cell_border_r">更新日時</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
            </tbody>
          </table>
        </div>
        <footer class="document__footer">
          <p class="document__folio">作成日: 2020/06/19</p>
          <p class="document__folio">1 / 5ページ</p>
        </footer>
      </section>

      <section class="document document_a4_portrait">
        <div>
          <header class="document__header">
            <p>作業申請書: 2 / 5ページ</p>
          </header>

          <table class="table table_fill">
            <thead class="table__header">
              <tr>
                <th class="cell_border_t cell_border_bb cell_border_l">ID</th>
                <th class="cell_border_t cell_border_bb cell_border_rr">名前</th>
                <th class="cell_border_t cell_border_bb">メールアドレス</th>
                <th class="cell_border_t cell_border_bb">価格</th>
                <th class="cell_border_t cell_border_bb cell_border_r">更新日時</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">1234</td>
                <td class="cell_border_b cell_border_rr">GETTO CSS</td>
                <td class="cell_border_b">admin@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">1,200</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/06/19 08:03</small></td>
              </tr>
              <tr>
                <td class="cell_border_b cell_border_l">123</td>
                <td class="cell_border_b cell_border_rr">GETTO</td>
                <td class="cell_border_b">user@example.com</td>
                <td class="cell_border_b cell_nokern cell_right">13,500</td>
                <td class="cell_border_b cell_border_r cell_nokern"><small>2020/01/10</small></td>
              </tr>
            </tbody>
          </table>
        </div>
        <footer class="document__footer">
          <p class="document__folio">作成日: 2020/06/19</p>
          <p class="document__folio">1 / 5ページ</p>
        </footer>
      </section>
    </section>
  </section>
  <footer class="main__footer">
    <p class="main__footer__message">powered by : LineIcons / みんなの文字</p>
  </footer>
</article>

</template>

<style>
</style>
