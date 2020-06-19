<script lang="ts">
import { Ref, ref, reactive, watch } from "vue";

type State = {
  is_modified: boolean,
  is_searching: boolean,
  is_error: boolean,
};

type Data = {
  id: Ref<string>,
  name: Ref<string>,
  radio: Ref<string>,
};

export default {
  setup() {
    const delay = 2.5 * 1000;

    const data: Data = {
      id: ref(""),
      name: ref("GETTO CSS"),
      radio: ref("仮"),
    };
    const state = reactive<State>({
      is_modified: false,
      is_searching: false,
      is_error: false,
    });

    watch([data.id, data.name, data.radio], (current,prev) => {
      state.is_modified = true;
    });

    function search() {
      state.is_searching = true;

      setTimeout(() => {
        state.is_searching = false;
        state.is_error = true;
      }, delay);
    }

    return {
      data,
      state,
      search,
    };
  }
};
</script>

<template>

<article class="layout__main">
  <header class="main__header">
    <h1 class="main__title">検索</h1>
    <p class="main__breadcrumb">
      <a href="#menu">MAIN</a>
      <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
      <a href="/dist/search.html"><i class="lnir lnir-home"></i> 検索</a>
    </p>
  </header>
  <section class="main__body">
    <form class="box box_fill box_search">
      <section class="box__body container">
        <dl class="search">
          <dt class="search__header">ID</dt>
          <dd class="search__field">
            <input type="text" v-model="data.id" class="input_fill">
            <p class="search__help">完全一致検索</p>
          </dd>
        </dl>
        <dl class="search search_double search_use">
          <dt class="search__header">名前</dt>
          <dd class="search__field">
            <input type="text" v-model="data.name" class="input_fill">
          </dd>
        </dl>
        <dl class="search search_use">
          <dt class="search__header">radio</dt>
          <dd class="search__field">
            <small>
              <label class="input__radio search_checked"><input type="radio" name="radio" value="仮" v-model="data.radio">仮</label>
              <label class="input__radio"><input type="radio" name="radio" value="作業中" v-model="data.radio">作業中</label>
              <label class="input__radio"><input type="radio" name="radio" value="完了" v-model="data.radio">完了</label>
              <label class="input__radio"><input type="radio" name="radio" value="審査申請中" v-model="data.radio">審査申請中</label>
            </small>
          </dd>
        </dl>
      </section>
      <footer class="box__footer search_error">
        <button v-if="!state.is_searching" class="button button_search" :class="{ button_modified: state.is_modified }" @click.prevent="search"><i class="lnir lnir-search-alt"></i> 検索</button>
        <button v-else class="button button_searching" @click.prevent="search"><i class="lnir lnir-spinner-11 lnir-is-spinning"></i> 検索中</button>
        <p v-if="state.is_error" class="search__message">通信エラーが発生しました。もう一度試してください</p>
      </footer>
    </form>
    <section class="content">
      <select>
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
    </section>
    <section class="content content_overflow">
      <table class="table table_sticky">
        <thead class="table__header">
          <tr>
            <th class="cell_sticky sticky_top cell_border_t cell_border_bb"><a href="#" class="table__sort">ID <i class="lnir lnir-chevron-down"></i></a></th>
            <th class="cell_sticky sticky_top sticky_left cell_border_t cell_border_bb cell_border_rr"><a href="#" class="table__sort">名前</a></th>
            <th class="cell_sticky sticky_top cell_border_t cell_border_bb"><a href="#" class="table__sort">状態</a></th>
            <th class="cell_sticky sticky_top cell_border_t cell_border_bb"><a href="#" class="table__sort">メールアドレス</a></th>
            <th class="cell_sticky sticky_top cell_border_t cell_border_bb"><a href="#" class="table__sort">価格</a></th>
            <th class="cell_sticky sticky_top cell_border_t cell_border_bb"><a href="#" class="table__sort">更新日時</a></th>
            <th class="cell_sticky sticky_top cell_border_t cell_border_bb">メモ</th>
            <th class="cell_sticky sticky_top cell_border_t cell_border_bb cell_border_l"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="cell_border_b">1234</td>
            <td class="cell_border_b cell_border_rr">GETTO CSS</td>
            <td class="cell_border_b cell_center"><span class="label label_gray">仮</span></td>
            <td class="cell_border_b">admin@example.com</td>
            <td class="cell_border_b cell_nokern cell_right">1,200</td>
            <td class="cell_border_b cell_nokern"><small>2020/06/19 08:03</small></td>
            <td class="cell_border_b">simple admin theme</td>
            <td class="cell_border_b cell_border_l"><a href="#"><i class="lnir lnir-pencil-alt"></i> 編集</a></td>
          </tr>
          <tr>
            <td class="cell_border_b">123</td>
            <td class="cell_border_b cell_border_rr">GETTO</td>
            <td class="cell_border_b cell_center"><span class="label label_warning">作業中</span></td>
            <td class="cell_border_b">user@example.com</td>
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
    <p class="main__footer__message">powered by LineIcons / copyright GETTO.systems</p>
  </footer>
</article>

</template>

<style>
</style>
