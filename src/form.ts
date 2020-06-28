import { h, render } from "preact";
import { Menu } from "./menu.ts";
import "./getto.css";

const app = h("main", { class: "layout" }, [
  h(Menu, null, null),
  h(Page, null, null),
]);
render(app, document.body);

import { useState } from "preact/hooks";
import { html } from "htm/preact";

type State = {
  "complete": Modal,
  "delete": Modal,
  "generate": Modal,
};

type Modal = {
  active: boolean,
  connecting: boolean,
};

function Page() {
  const [state, setState] = useState<State>({
    complete: {
      active: false,
      connecting: false,
    },
    delete: {
      active: false,
      connecting: false,
    },
    generate: {
      active: false,
      connecting: false,
    },
  });

  const delay = 2.5 * 1000;

  function setComplete() {
    state.complete.active = true;
    state.complete.connecting = false;

    setState({
      complete: state.complete,
      delete: state.delete,
      generate: state.generate,
    });
  }

  function doComplete() {
    state.complete.connecting = true;
    setState({
      complete: state.complete,
      delete: state.delete,
      generate: state.generate,
    });

    setTimeout(() => {
      state.complete.active = false;
      state.complete.connecting = false;
      setState({
        complete: state.complete,
        delete: state.delete,
        generate: state.generate,
      });
    }, delay);
  }

  function resetComplete() {
    state.complete.active = false;
    setState({
      complete: state.complete,
      delete: state.delete,
      generate: state.generate,
    });
  }

  function setDelete() {
    state.delete.active = true;
    state.delete.connecting = false;
    setState({
      complete: state.complete,
      delete: state.delete,
      generate: state.generate,
    });
  }

  function doDelete() {
    state.delete.connecting = true;
    setState({
      complete: state.complete,
      delete: state.delete,
      generate: state.generate,
    });

    setTimeout(() => {
      state.delete.active = false;
      state.delete.connecting = false;
      setState({
        complete: state.complete,
        delete: state.delete,
        generate: state.generate,
      });
    }, delay);
  }

  function resetDelete() {
    state.delete.active = false;
    setState({
      complete: state.complete,
      delete: state.delete,
      generate: state.generate,
    });
  }

  function setGenerate() {
    state.generate.active = true;
    state.generate.connecting = true;
    setState({
      complete: state.complete,
      delete: state.delete,
      generate: state.generate,
    });

    setTimeout(() => {
      state.generate.connecting = false;
      setState({
        complete: state.complete,
        delete: state.delete,
        generate: state.generate,
      });
    }, delay);
  }

  function resetGenerate() {
    state.generate.active = false;
    setState({
      complete: state.complete,
      delete: state.delete,
      generate: state.generate,
    });
  }

  function resetAll(e: MouseEvent) {
    if ((<HTMLElement>e.target).dataset.modal === "true") {
      resetComplete();
      resetDelete();
    }
  }

  return html`
    <article class="layout__main">
      <header class="main__header">
        <h1 class="main__title">フォーム</h1>
        <p class="main__breadcrumb">
          <a href="#menu">MAIN</a>
          <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
          <a href="/dist/form.html"><i class="lnir lnir-pencil"></i> フォーム</a>
        </p>
      </header>
      <section class="main__body container">
        ${work()}
        ${workForm()}
        ${miscForm()}
        ${checkForm()}
        ${textForm()}
        ${searchForm()}
        ${numberForm()}
        ${emailForm()}
        ${textareaForm()}
      </section>
      <footer class="main__footer">
        <p class="main__footer__message">powered by : LineIcons / みんなの文字</p>
      </footer>
    </article>
  `

  function work() {
    return html`
      <section class="box">
        <div>
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
                <big>
                  <span class="label label_gray">仮</span>
                </big>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">状態</dt>
              <dd class="form__field">
                <big>
                  <button type="button" class="button button_complete" onClick="${setComplete}">完了</button>
                </big>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">名前</dt>
              <dd class="form__field">
                GETTO CSS
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">レポート</dt>
              <dd class="form__field">
              ${!state.generate.connecting ?
                html`<button type="button" class="button button_generate" onClick="${setGenerate}">帳票を作成する</button>` :
                html`<button type="button" class="button button_generate button_generating"><i class="lnir lnir-spinner-11 lnir-is-spinning"></i> 作成中</button>`}
              </dd>
            </dl>
          </section>
        </div>
        <footer class="box__footer">
          <section class="button__container">
            <button type="button" class="button button_edit"><i class="lnir lnir-pencil"></i> 編集</button>
            <button type="button" class="button button_delete button_right" onClick="${setDelete}"><i class="lnir lnir-close"></i> 削除</button>
          </section>
        </footer>
      </section>
      ${completeModal()}
      ${deleteModal()}
      ${generateModal()}
    `

    function completeModal() {
      if (!state.complete.active && !state.complete.connecting) {
        return html``
      }

      if (state.complete.connecting) {
        return html`
          <aside class="modal" onClick="${resetAll}" data-modal="true">
            <section class="modal__box">
              <header class="modal__header">
                <h3 class="modal__title">完了処理中</h3>
              </header>
              <section class="modal__body">
                この作業を完了しています
              </section>
              <big>
                <footer class="modal__footer button__container">
                  <button type="button" class="button button_completeConfirm button_completing"><i class="lnir lnir-spinner-11 lnir-is-spinning"></i> 完了中</button>
                </footer>
              </big>
            </section>
          </aside>
        `
      }

      return html`
        <aside class="modal" onClick="${resetAll}" data-modal="true">
          <section class="modal__box">
            <header class="modal__header">
              <h3 class="modal__title">完了確認</h3>
            </header>
            <section class="modal__body">
              この作業を完了します
              <br/>
              よろしいですか？
            </section>
            <big>
              <footer class="modal__footer button__container">
                <button type="button" class="button button_completeConfirm" onClick="${doComplete}">完了</button>
                <button type="button" class="button button_cancel button_right" onClick="${resetComplete}">キャンセル</button>
              </footer>
            </big>
          </section>
        </aside>
      `
    }

    function deleteModal() {
      if (!state.delete.active && !state.delete.connecting) {
        return html``
      }

      if (state.delete.connecting) {
        return html`
          <aside class="modal" onClick="${resetAll}" data-modal="true">
            <section class="modal__box">
              <header class="modal__header">
                <h3 class="modal__title">削除処理中</h3>
              </header>
              <section class="modal__body">
                この作業を削除しています
              </section>
              <big>
                <footer class="modal__footer button__container">
                  <button type="button" class="button button_deleteConfirm button_deleting"><i class="lnir lnir-spinner-11 lnir-is-spinning"></i> 削除中</button>
                </footer>
              </big>
            </section>
          </aside>
        `
      }

      return html`
        <aside class="modal" onClick="${resetAll}" data-modal="true">
          <section class="modal__box">
            <header class="modal__header">
              <h3 class="modal__title">削除確認</h3>
            </header>
            <section class="modal__body">
              この作業を削除します
              <br/>
              削除すると復元することはできません
              <br/>
              よろしいですか？
            </section>
            <big>
              <footer class="modal__footer button__container">
                <button type="button" class="button button_deleteConfirm" onClick="${doDelete}">削除</button>
                <button type="button" class="button button_cancel button_right" onClick="${resetDelete}">キャンセル</button>
              </footer>
            </big>
          </section>
        </aside>
      `
    }

    function generateModal() {
      if (!state.generate.active && !state.generate.connecting) {
        return html``
      }

      if (state.generate.connecting) {
        return html`
          <aside class="modal" onClick="${resetAll}" data-modal="true">
            <section class="modal__box">
              <header class="modal__header">
                <h3 class="modal__title">帳票作成中</h3>
              </header>
              <section class="modal__body">
                <div class="loading loading_box">
                  <i class="lnir lnir-spinner-11 lnir-is-spinning"></i>
                  <p class="loading__message">読み込み中です</p>
                </div>
              </section>
            </section>
          </aside>
        `
      }

      return html`
        <aside class="modal" onClick="${resetAll}" data-modal="true">
          <section class="modal__box">
            <header class="modal__header">
              <h3 class="modal__title">帳票ダウンロード</h3>
            </header>
            <section class="modal__body">
              必要な書類をダウンロードしてください

              <ul class="list">
                <li class="list__item"><a href="#"><i class="lnir lnir-files"></i> 作業申請書</a></li>
                <li class="list__item"><a href="#"><i class="lnir lnir-files"></i> 作業申請書</a></li>
                <li class="list__item"><a href="#"><i class="lnir lnir-files"></i> 作業申請書</a></li>
                <li class="list__item"><a href="#"><i class="lnir lnir-files"></i> 作業申請書</a></li>
                <li class="list__item"><a href="#"><i class="lnir lnir-files"></i> 作業申請書</a></li>
              </ul>
            </section>
            <big>
              <footer class="modal__footer button__container">
              <span></span>
                <button type="button" class="button button_cancel button_right" onClick="${resetGenerate}"><i class="lnir lnir-close"></i> 閉じる</button>
              </footer>
            </big>
          </section>
        </aside>
      `
    }
  }

  function workForm() {
    return html`
      <form class="box box_editing">
        <div>
          <header class="box__header">
            <h2 class="box__title">作業</h2>
          </header>
          <section class="box__body">
            <dl class="form">
              <dt class="form__header"><label for="work-name">名前</label></dt>
              <dd class="form__field">
                <input type="text" value="GETTO CSS" id="work-name"/>
                <p class="form__help">識別のための作業名</p>
              </dd>
            </dl>
            <dl class="form form_error">
              <dt class="form__header"><label for="email">メール</label></dt>
              <dd class="form__field">
                <input type="email" value="" id="email"/>
                <p class="form__message">メールアドレスは必須です</p>
                <p class="form__help">連絡先のメールアドレス</p>
              </dd>
            </dl>
          </section>
        </div>
        <footer class="box__footer form_error">
          <section class="button__container">
            <button type="button" class="button button_save button_modified"><i class="lnir lnir-pencil"></i> 保存</button>
            <button type="button" class="button button_cancel button_right">キャンセル</button>
          </section>
          <p class="form__message">保存できない項目があります</p>
        </footer>
      </form>
    `
  }

  function miscForm() {
    return html`
      <form class="box box_editing">
        <div>
          <header class="box__header">
            <h2 class="box__title">フォーム</h2>
          </header>
          <section class="box__body">
            <dl class="form">
              <dt class="form__header">tel</dt>
              <dd class="form__field">
                <input type="tel" value=""/>
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
                <input type="date" value=""/>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">time</dt>
              <dd class="form__field">
                <input type="time" value=""/>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">file</dt>
              <dd class="form__field">
                <input type="file"/>
              </dd>
            </dl>
          </section>
        </div>
        <footer class="box__footer">
          <section class="button__container">
            <button type="button" class="button button_save button_modified"><i class="lnir lnir-pencil"></i> 保存</button>
            <button type="button" class="button button_cancel button_right">キャンセル</button>
          </section>
        </footer>
      </form>
    `
  }

  function checkForm() {
    return html`
      <form class="box box_editing">
        <div>
          <header class="box__header">
            <h2 class="box__title">フォーム</h2>
          </header>
          <section class="box__body">
            <dl class="form">
              <dt class="form__header">radio</dt>
              <dd class="form__field">
                <label class="input__radio"><input type="radio" name="radio" checked/>仮</label>
                <label class="input__radio"><input type="radio" name="radio"/>作業中</label>
                <label class="input__radio"><input type="radio" name="radio"/>完了</label>
                <label class="input__radio"><input type="radio" name="radio"/>審査申請中</label>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">radio block</dt>
              <dd class="form__field">
                <label class="input__radio input__radio_block"><input type="radio" name="radio-block" checked/>作業中</label>
                <label class="input__radio input__radio_block"><input type="radio" name="radio-block"/>審査申請中</label>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">checkbox</dt>
              <dd class="form__field">
                <label class="input__checkbox"><input type="checkbox"/>仮</label>
                <label class="input__checkbox"><input type="checkbox"/>作業中</label>
                <label class="input__checkbox"><input type="checkbox"/>完了</label>
                <label class="input__checkbox"><input type="checkbox"/>審査申請中</label>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">checkbox block</dt>
              <dd class="form__field">
                <label class="input__checkbox input__checkbox_block"><input type="checkbox"/>作業中</label>
                <label class="input__checkbox input__checkbox_block"><input type="checkbox"/>審査申請中</label>
              </dd>
            </dl>
          </section>
        </div>
        <footer class="box__footer">
          <section class="button__container">
            <button type="button" class="button button_saving"><i class="lnir lnir-spinner-11 lnir-is-spinning"></i> 保存中</button>
          </section>
        </footer>
      </form>
    `
  }

  function textForm() {
    return html`
      <form class="box box_editing">
        <div>
          <header class="box__header">
            <h2 class="box__title">フォーム</h2>
          </header>
          <section class="box__body">
            <dl class="form">
              <dt class="form__header">text small</dt>
              <dd class="form__field">
                <input type="text" value="" class="input_small"/>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">text</dt>
              <dd class="form__field">
                <input type="text" value=""/>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">text medium</dt>
              <dd class="form__field">
                <input type="text" value="" class="input_medium"/>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">text large</dt>
              <dd class="form__field">
                <input type="text" value="" class="input_large"/>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">text fill</dt>
              <dd class="form__field">
                <input type="text" value="" class="input_fill"/>
              </dd>
            </dl>
          </section>
        </div>
        <footer class="box__footer">
          <section class="button__container">
            <button type="button" class="button button_save"><i class="lnir lnir-pencil"></i> 保存</button>
            <button type="button" class="button button_cancel button_right">キャンセル</button>
          </section>
        </footer>
      </form>
    `
  }

  function searchForm() {
    return html`
      <form class="box box_editing">
        <div>
          <header class="box__header">
            <h2 class="box__title">フォーム</h2>
          </header>
          <section class="box__body">
            <dl class="form">
              <dt class="form__header">search small</dt>
              <dd class="form__field">
                <input type="search" value="" class="input_small"/>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">search</dt>
              <dd class="form__field">
                <input type="search" value=""/>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">search medium</dt>
              <dd class="form__field">
                <input type="search" value="" class="input_medium"/>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">search large</dt>
              <dd class="form__field">
                <input type="search" value="" class="input_large"/>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">search fill</dt>
              <dd class="form__field">
                <input type="search" value="" class="input_fill"/>
              </dd>
            </dl>
          </section>
        </div>
        <footer class="box__footer">
          <section class="button__container">
            <button type="button" class="button button_save"><i class="lnir lnir-pencil"></i> 保存</button>
            <button type="button" class="button button_cancel button_right">キャンセル</button>
          </section>
        </footer>
      </form>
    `
  }

  function numberForm() {
    return html`
      <form class="box box_editing">
        <div>
          <header class="box__header">
            <h2 class="box__title">フォーム</h2>
          </header>
          <section class="box__body">
            <dl class="form">
              <dt class="form__header">number small</dt>
              <dd class="form__field">
                <input type="number" value="" class="input_small"/>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">number</dt>
              <dd class="form__field">
                <input type="number" value=""/>
              </dd>
            </dl>
          </section>
        </div>
        <footer class="box__footer">
          <section class="button__container">
            <button type="button" class="button button_save"><i class="lnir lnir-pencil"></i> 保存</button>
            <button type="button" class="button button_cancel button_right">キャンセル</button>
          </section>
        </footer>
      </form>
    `
  }

  function emailForm() {
    return html`
      <form class="box box_editing">
        <div>
          <header class="box__header">
            <h2 class="box__title">フォーム</h2>
          </header>
          <section class="box__body">
            <dl class="form">
              <dt class="form__header">email small</dt>
              <dd class="form__field">
                <input type="email" value="" class="input_small"/>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">email</dt>
              <dd class="form__field">
                <input type="email" value=""/>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">email medium</dt>
              <dd class="form__field">
                <input type="email" value="" class="input_medium"/>
              </dd>
            </dl>
            <dl class="form">
              <dt class="form__header">email fill</dt>
              <dd class="form__field">
                <input type="email" value="" class="input_fill"/>
              </dd>
            </dl>
          </section>
        </div>
        <footer class="box__footer">
          <section class="button__container">
            <button type="button" class="button button_save"><i class="lnir lnir-pencil"></i> 保存</button>
            <button type="button" class="button button_cancel button_right">キャンセル</button>
          </section>
        </footer>
      </form>
    `
  }

  function textareaForm() {
    return html`
      <form class="box box_double box_editing">
        <div>
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
              <dt class="form__header">textarea fill</dt>
              <dd class="form__field">
                <textarea class="input_fill"></textarea>
              </dd>
            </dl>
          </section>
        </div>
        <footer class="box__footer">
          <section class="button__container">
            <button type="button" class="button button_save"><i class="lnir lnir-pencil"></i> 保存</button>
            <button type="button" class="button button_cancel button_right">キャンセル</button>
          </section>
        </footer>
      </form>
    `
  }
};
