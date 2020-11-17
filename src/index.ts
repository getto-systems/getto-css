import { h, render } from "preact";
import { Menu } from "./menu";
import "./getto.css";

const app = h("main", { class: "layout" }, [
    h(Page, null, null),
    h(Menu, null, null),
]);
render(app, document.body);

import { useState, useEffect } from "preact/hooks";
import { html } from "htm/preact";
import { config } from "./config.js";

type State = {
    versions: Array<string>,
    version: string,
    loaded: boolean,
}

function Page() {
    const [state, setState] = useState<State>({
        versions: [config.version],
        version: config.version,
        loaded: false,
    });

    function onLoad() {
        if (state.loaded) {
            return;
        }

        (async () => {
            const response = await fetch("/versions.txt");
            if (!response.ok) {
                return [config.version];
            }

            const content = await response.text();
            const versions = content.split("\n").filter((version) => version != "");
            if (versions.length === 0) {
                return [config.version];
            }

            setState({
                versions: versions.reverse(),
                version: state.version,
                loaded: true,
            });
        })();
    }

    function versionChanged(e: InputEvent) {
        if (e.target instanceof HTMLSelectElement) {
            const target = e.target as HTMLSelectElement;
            const version = target.value;
            setState({
                versions: state.versions,
                version,
                loaded: state.loaded,
            });
        }
    }

    useEffect(() => {
        onLoad();
    }, []);

    function redirect() {
        if (!config.isProduction) {
            alert(`redirect to: ${state.version}`);
            return;
        }

        const path = location.pathname;
        const redirect_to = path.replace(config.version, state.version);
        location.href = redirect_to;
    }

    return html`
        <article class="layout__main">
            <header class="main__header">
                <h1 class="main__title">ホーム</h1>
                <p class="main__breadcrumb">
                    <a class="main__breadcrumb__item" href="#menu">MAIN</a>
                    <span class="main__breadcrumb__separator"><i class="lnir lnir-chevron-right"></i></span>
                    <a class="main__breadcrumb__item" href="/${config.version}/index.html"><i class="lnir lnir-home"></i> ホーム</a>
                </p>
            </header>
            <section class="main__body container">
                <section class="box box_double">
                    <div>
                        <header class="box__header">
                            <h2 class="box__title">GETTO CSS</h2>
                        </header>
                        <section class="box__body">
                            <dl class="form">
                                <dt class="form__header">バージョン</dt>
                                <dd class="form__field">
                                    <select value="${state.version}" onChange="${versionChanged}">
                                        ${state.versions.map((version) => html`<option value="${version}">${version}</option>`)}
                                    </select>
                                </dd>
                            </dl>
                            <dl class="form">
                                <dt class="form__header">状態</dt>
                                <dd class="form__field">
                                    <big>${stateLabel()}</big>
                                </dd>
                            </dl>
                            <dl class="form">
                                <dt class="form__header">リンクタグ</dt>
                                <dd class="form__field">
                                    <pre>${linkTagExample()}</pre>
                                </dd>
                            </dl>
                        </section>
                    </div>
                    <footer class="box__footer">
                        <section class="button__container">
                            <button type="button" class="button button_edit" onClick="${redirect}"><i class="lnir lnir-pointer-up"></i> 選択</button>
                        </section>
                    </footer>
                </section>

                <section class="box">
                    <div>
                        <header class="box__header">
                            <h2 class="box__title">label / badge / notice</h2>
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
                                <dt class="form__header">label</dt>
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
                                <dt class="form__header">notice</dt>
                                <dd class="form__field">
                                    <p class="notice notice_stack notice_gray">データを登録してください</p>
                                    <p class="notice notice_stack notice_alert">データを登録してください</p>
                                    <p class="notice notice_stack notice_success">データを登録してください</p>
                                    <p class="notice notice_stack notice_warning">データを登録してください</p>
                                    <p class="notice notice_stack notice_pending">データを登録してください</p>
                                    <p class="notice notice_stack notice_info">データを登録してください</p>
                                </dd>
                            </dl>
                        </section>
                    </div>
                </section>

                <section class="box">
                    <div>
                        <header class="box__header">
                            <h2 class="box__title">paragraph</h2>
                        </header>
                        <section class="box__body">
                            <dl class="form">
                                <dt class="form__header">クラスなし</dt>
                                <dd class="form__field">
                                    <p>コンテンツ</p>
                                    <p>コンテンツ</p>
                                    <p>コンテンツ</p>
                                    <p>コンテンツ</p>
                                </dd>
                            </dl>
                            <dl class="form">
                                <dt class="form__header">paragraph クラス</dt>
                                <dd class="form__field">
                                    <p class="paragraph">コンテンツ</p>
                                    <p class="paragraph">コンテンツ</p>
                                    <p class="paragraph">コンテンツ</p>
                                    <p class="paragraph">コンテンツ</p>
                                </dd>
                            </dl>
                        </section>
                    </div>
                </section>

                <section class="box">
                    <div>
                        <header class="box__header">
                            <h2 class="box__title">vertical</h2>
                        </header>
                        <section class="box__body">
                            <p>コンテンツ</p>
                            <p>コンテンツ</p>
                            <div class="vertical vertical_small"></div>
                            <p>コンテンツ</p>
                            <p>コンテンツ</p>
                            <div class="vertical vertical_medium"></div>
                            <p>コンテンツ</p>
                            <p>コンテンツ</p>
                            <div class="vertical vertical_large"></div>
                            <p>コンテンツ</p>
                            <p>コンテンツ</p>
                        </section>
                    </div>
                </section>
            </section>
            <footer class="main__footer">
                <p class="main__footer__message">powered by : LineIcons / みんなの文字</p>
            </footer>
        </article>
    `;

    function stateLabel() {
        if (state.versions[0] === config.version) {
            return html`<span class="label label_info">最新</span>`
        } else {
            return html`<span class="label label_alert">新しいバージョンがあります</span>`
        }
    }

    function linkTagExample() {
        return `<link rel="stylesheet"\n href="https://trellis.getto.systems/css/${config.version}/getto.css">`
    }
};
