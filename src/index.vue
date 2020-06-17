<template>

<article class="layout__main">
  <header class="main__header">
    <h1 class="main__title">ホーム</h1>
    <p class="main__breadcrumb">
      <span>MAIN</span>
      <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
      <a href="/dist/index.html"><i class="lnir lnir-home"></i> ホーム</a>
    </p>
  </header>
  <section class="main__body container">
    <section class="box">
      <header class="box__header">
        <h2 class="box__title">作業</h2>
      </header>
      <section class="box__body">
        <dl class="form">
          <dt class="form__header">状態</dt>
          <dd class="form__field">
            <span class="label label_gray">仮</span>
            <span class="label label_alert">エラー</span>
            <span class="label label_warning">作業中</span>
            <span class="label label_success">完了</span>
            <span class="label label_pending">保留</span>
            <span class="label label_info">情報</span>
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">状態</dt>
          <dd class="form__field">
            <big><span class="label label_gray">仮</span></big>
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">名前</dt>
          <dd class="form__field">
            GETTO CSS
          </dd>
        </dl>
      </section>
      <footer class="box__footer">
        <button type="button" class="button button_edit">編集</button>
      </footer>
    </section>
    <form class="box box_editing">
      <header class="box__header">
        <h2 class="box__title">作業</h2>
      </header>
      <section class="box__body">
        <dl class="form">
          <dt class="form__header"><label for="work-name">名前</label></dt>
          <dd class="form__field">
            <input type="text" value="GETTO CSS" id="work-name">
            <p class="form__help">識別のための作業名</p>
          </dd>
        </dl>
        <dl class="form form_error">
          <dt class="form__header"><label for="email">メール</label></dt>
          <dd class="form__field">
            <input type="email" value="" id="email">
            <p class="form__message">メールアドレスは必須です</p>
            <p class="form__help">連絡先のメールアドレス</p>
          </dd>
        </dl>
      </section>
      <footer class="box__footer">
        <button class="button button_edit">編集</button>
      </footer>
    </form>
    <form class="box box_editing">
      <header class="box__header">
        <h2 class="box__title">フォーム</h2>
      </header>
      <section class="box__body">
        <dl class="form">
          <dt class="form__header">tel</dt>
          <dd class="form__field">
            <input type="tel" value="">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">select</dt>
          <dd class="form__field">
            <select>
              <option>仮</option>
              <option>作業中</option>
              <option>保留</option>
              <option>完了</option>
            </select>
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">date</dt>
          <dd class="form__field">
            <input type="date" value="">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">time</dt>
          <dd class="form__field">
            <input type="time" value="">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">file</dt>
          <dd class="form__field">
            <input type="file">
          </dd>
        </dl>
      </section>
      <footer class="box__footer">
        <button class="button button_edit">編集</button>
      </footer>
    </form>
    <section class="box">
      <header class="box__header">
        <h2 class="box__title">コンテンツ</h2>
      </header>
      <section class="box__body">
        <p>TODO: 読み込み中にしたい</p>
      </section>
      <footer class="box__footer">
        <p class="box__message box__message_right">
          <a href="#"><i class="lnir lnir-cog"></i> 設定</a>
        </p>
      </footer>
    </section>
    <form class="box box_editing">
      <header class="box__header">
        <h2 class="box__title">フォーム</h2>
      </header>
      <section class="box__body">
        <dl class="form">
          <dt class="form__header">text small</dt>
          <dd class="form__field">
            <input type="text" value="" class="input_small">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">text</dt>
          <dd class="form__field">
            <input type="text" value="">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">text medium</dt>
          <dd class="form__field">
            <input type="text" value="" class="input_medium">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">text large</dt>
          <dd class="form__field">
            <input type="text" value="" class="input_large">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">text fill</dt>
          <dd class="form__field">
            <input type="text" value="" class="input_fill">
          </dd>
        </dl>
      </section>
      <footer class="box__footer">
        <button class="button button_edit">編集</button>
      </footer>
    </form>
    <form class="box box_editing">
      <header class="box__header">
        <h2 class="box__title">フォーム</h2>
      </header>
      <section class="box__body">
        <dl class="form">
          <dt class="form__header">search small</dt>
          <dd class="form__field">
            <input type="search" value="" class="input_small">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">search</dt>
          <dd class="form__field">
            <input type="search" value="">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">search medium</dt>
          <dd class="form__field">
            <input type="search" value="" class="input_medium">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">search large</dt>
          <dd class="form__field">
            <input type="search" value="" class="input_large">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">search fill</dt>
          <dd class="form__field">
            <input type="search" value="" class="input_fill">
          </dd>
        </dl>
      </section>
      <footer class="box__footer">
        <button class="button button_edit">編集</button>
      </footer>
    </form>
    <form class="box box_editing">
      <header class="box__header">
        <h2 class="box__title">フォーム</h2>
      </header>
      <section class="box__body">
        <dl class="form">
          <dt class="form__header">number small</dt>
          <dd class="form__field">
            <input type="number" value="" class="input_small">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">number</dt>
          <dd class="form__field">
            <input type="number" value="">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">number medium</dt>
          <dd class="form__field">
            <input type="number" value="" class="input_medium">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">number large</dt>
          <dd class="form__field">
            <input type="number" value="" class="input_large">
          </dd>
        </dl>
      </section>
      <footer class="box__footer">
        <button class="button button_edit">編集</button>
      </footer>
    </form>
    <form class="box box_editing">
      <header class="box__header">
        <h2 class="box__title">フォーム</h2>
      </header>
      <section class="box__body">
        <dl class="form">
          <dt class="form__header">email small</dt>
          <dd class="form__field">
            <input type="email" value="" class="input_small">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">email</dt>
          <dd class="form__field">
            <input type="email" value="">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">email medium</dt>
          <dd class="form__field">
            <input type="email" value="" class="input_medium">
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">email fill</dt>
          <dd class="form__field">
            <input type="email" value="" class="input_fill">
          </dd>
        </dl>
      </section>
      <footer class="box__footer">
        <button class="button button_edit">編集</button>
      </footer>
    </form>
    <form class="box box_double box_editing">
      <header class="box__header">
        <h2 class="box__title">フォーム</h2>
      </header>
      <section class="box__body">
        <dl class="form">
          <dt class="form__header">textarea small</dt>
          <dd class="form__field">
            <textarea class="input_small"></textarea>
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">textarea</dt>
          <dd class="form__field">
            <textarea></textarea>
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">textarea medium</dt>
          <dd class="form__field">
            <textarea class="input_medium"></textarea>
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">textarea large</dt>
          <dd class="form__field">
            <textarea class="input_large"></textarea>
          </dd>
        </dl>
        <dl class="form">
          <dt class="form__header">textarea fill</dt>
          <dd class="form__field">
            <textarea class="input_fill"></textarea>
          </dd>
        </dl>
      </section>
      <footer class="box__footer">
        <button class="button button_edit">編集</button>
      </footer>
    </form>
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
