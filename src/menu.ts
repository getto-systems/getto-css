import { useState } from "preact/hooks";
import { html } from "htm/preact";
import { config } from "./config.js";

type State = {
    data: Data,
}

type Data = {
    version: string,
    menus: Array<Menu>,
}

type Menu = {
    label: string,
    badge: number,
    isExpand: boolean,
    items: Array<Item>,
}

type Item = {
    icon: string,
    href: string,
    isActive: boolean,
    label: string,
    badge: number,
}

export function Menu() {
    const path = location.pathname;
    const version = config.version;

    const [state, setState] = useState<State>({
        data: {
            version,
            menus: [
                createMenu("MAIN", [
                    createItem("lnir lnir-home", `/${config.version}/index.html`, "ホーム", 98),
                    createItem("lnir lnir-pencil", `/${config.version}/form.html`, "フォーム", 1),
                    createItem("lnir lnir-search", `/${config.version}/search.html`, "検索", 0),
                    createItem("lnir lnir-list", `/${config.version}/list.html`, "一覧", 0),
                    createItem("lnir lnir-folder", `/${config.version}/document.html`, "書類", 0),
                    createItem("lnir lnir-enter", `/${config.version}/login.html`, "ログイン", 0),
                    createItem("lnir lnir-close", `/${config.version}/not_found.html`, "NotFound", 0),
                    createItem("lnir lnir-question-circle", `/${config.version}/docs/index.html`, "ドキュメント", 0),
                ]),
                createMenu("DOCUMENT", [
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                ]),
                createMenu("DOCUMENT", [
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                ]),
                createMenu("DOCUMENT", [
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                ]),
                createMenu("DOCUMENT", [
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                    createItem("lnir lnir-folder", `/${config.version}/document.html?`, "書類", 0),
                ]),
            ],
        },
    });

    function createMenu(label: string, items: Array<Item>) {
        const badge = items.reduce((acc, item) => acc + item.badge, 0);
        const isExpand = items.some((item) => item.isActive)
        return { label, badge, isExpand, items };
    }

    function createItem(icon: string, href: string, label: string, badge: number) {
        return {
            icon,
            href,
            isActive: href === path,
            label,
            badge,
        };
    }

    return html`
        <section class="layout__menu menu">
            <header class="layout__menu__header menu__header">
                <cite class="menu__brand">GETTO</cite>
                <strong class="menu__title">CSS</strong>
                <cite class="menu__subTitle">simple admin theme</cite>
            </header>

            <aside class="menu__box">
                <dl class="form">
                    <dt class="form__header">シーズン</dt>
                    <dd class="form__field">
                        ${new Date().getFullYear()}年
                    </dd>
                </dl>
            </aside>

            <nav class="menu__body" id="menu">
                ${state.data.menus.map(menu)}
            </nav>
            <footer class="menu__footer">
                <p class="menu__footer__message">copyright GETTO.systems</p>
                <p class="menu__footer__message">version: ${state.data.version}</p>
            </footer>
        </section>
    `;

    function menu(menu: Menu) {
        return html`
            <details class="menu__nav" open="${menu.isExpand ? true : false}">
                <summary class="menu__nav__summary">
                    <span class="menu__nav__summary__label">
                        ${menu.label}
                    </span>
                    <span class="menu__nav__summary__badge">
                        ${badge(menu)}
                    </span>
                </summary>
                <ul class="menu__nav__items">
                    ${menu.items.map(item)}
                </ul>
            </details>
        `
    }

    function badge(item: { badge: number }) {
        if (item.badge > 0) {
            return html`<span class="badge badge_alert">${item.badge}</span>`;
        } else {
            return html``;
        }
    }

    function item(item: Item) {
        return html`
            <li class="menu__nav__item">
                <a href="${item.href}" class="menu__nav__link ${item.isActive ? "menu__nav__item_active" : ""}">
                    <span class="menu__nav__item__label">
                        <i class="${item.icon}"></i>
                        ${" "}
                        ${item.label}
                    </span>
                    <span class="menu__nav__item__badge">
                        ${badge(item)}
                    </span>
                </a>
            </li>
        `;
    }
}
