<script lang="ts">
import { Ref, ref, reactive, watch } from "vue";

type State = {
  is_modified: boolean,
  is_searching: boolean,
};

export default {
  setup() {
    const delay = 2.5 * 1000;

    const state = reactive<State>({
      is_modified: false,
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
    <h1 class="main__title">一覧</h1>
    <p class="main__breadcrumb">
      <a href="#menu">MAIN</a>
      <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
      <a href="/dist/list.html"><i class="lnir lnir-list"></i> 一覧</a>
    </p>
  </header>
  <section class="main__body">
    <form class="box box_fill">
      <section class="box__body">
        <button v-if="!state.is_searching" class="button button_search" :class="{ button_modified: state.is_modified }" @click.prevent="search"><i class="lnir lnir-reload"></i> 再読み込み</button>
        <button v-else class="button button_searching" @click.prevent="search"><i class="lnir lnir-spinner-11 lnir-is-spinning"></i> 読み込み中</button>
      </section>
    </form>
    <section class="content">
      <select class="pager">
        <option>1 / 10 ページ</option>
        <option>2 / 10 ページ</option>
        <option>3 / 10 ページ</option>
        <option>4 / 10 ページ</option>
        <option>5 / 10 ページ</option>
        <option>6 / 10 ページ</option>
        <option>7 / 10 ページ</option>
        <option>8 / 10 ページ</option>
        <option>9 / 10 ページ</option>
        <option>10 / 10 ページ</option>
      </select>
      <span>1 ～ 1000 件 / 全 5000 件中</span>
    </section>
    <section class="content content_overflow">
      <table class="table table_sticky">
        <thead class="table__header">
          <tr>
            <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb"><a href="#" class="table__sort">ID <i class="lnir lnir-chevron-down"></i></a></th>
            <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb cell_border_rr"><a href="#" class="table__sort">名前</a></th>
            <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb"><a href="#" class="table__sort">状態</a></th>
            <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb"><a href="#" class="table__sort">メールアドレス</a></th>
            <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb"><a href="#" class="table__sort">価格</a></th>
            <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb"><a href="#" class="table__sort">更新日時</a></th>
            <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb">メモ</th>
            <th class="cell_sticky cell_sticky_top cell_border_t cell_border_bb cell_border_l"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="row row_hoverable">
            <td class="cell_border_b">1234</td>
            <td class="cell_border_b cell_border_rr">GETTO CSS</td>
            <td class="cell_border_b cell_center"><span class="label label_gray">仮</span></td>
            <td class="cell_border_b">admin@example.com</td>
            <td class="cell_border_b cell_nokern cell_right">1,200</td>
            <td class="cell_border_b cell_nokern"><small>2020/06/19 08:03</small></td>
            <td class="cell_border_b">simple admin theme</td>
            <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
          </tr>
          <tr class="row row_edit">
            <td class="cell_border_b">123</td>
            <td class="cell_border_b cell_border_rr">
              <section class="form form_error">
                <input type="text" value="" id="work-name">
                <p class="form__message">作業名は必須です</p>
                <p class="form__help">識別のための作業名</p>
              </section>
            </td>
            <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
            <td class="cell_border_b">
              <section class="form">
                <input type="email" value="admin@example.com" id="work-name">
                <p class="form__help">連絡先メールアドレス</p>
              </section>
            </td>
            <td class="cell_border_b cell_nokern cell_right">13,500</td>
            <td class="cell_border_b cell_nokern"><small>2020/01/10</small></td>
            <td class="cell_border_b">simple css theme</td>
            <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
  <footer class="main__footer">
    <p class="main__footer__message">powered by : LineIcons / みんなの文字</p>
  </footer>
</article>

</template>

<style>
</style>
