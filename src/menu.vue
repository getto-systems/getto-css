<script lang="ts">
import { reactive } from "vue";

type State = {
  data: Data,
};

type Data = {
  version: string,
  menus: Array<Menu>,
};

type Menu = {
  label: string,
  badge: number,
  isExpand: boolean,
  items: Array<Item>,
};

type Item = {
  icon: string,
  href: string,
  isActive: boolean,
  label: string,
  badge: number,
};

export default {
  setup() {
    const path = location.pathname;
    const version = (() => {
      const info = location.pathname.split("/");
      if (info.length > 2) {
        if (info[1] === "dist") {
          return "xxx.xxx.xxx";
        }
        return info[1];
      }
      return "-";
    })();

    function menu(label: string, items: Array<Item>) {
      const badge = items.reduce((acc, item) => acc + item.badge, 0);
      return {label, badge, isExpand: true, items};
    }

    function item(icon: string, href: string, label: string, badge: number) {
      return {
        icon,
        href,
        isActive: href === path,
        label,
        badge,
      };
    }

    const state = reactive<State>({
      data: {
        version,
        menus: [
          menu("MAIN", [
            item("lnir lnir-home", "/dist/index.html", "ホーム", 1),
            item("lnir lnir-search", "/dist/search.html", "検索", 0),
          ]),
          menu("DATA", [
            item("lnir lnir-cog", "/dist/data.html", "商品", 0),
            item("lnir lnir-home", "/dist/data.html", "売上", 0),
            item("lnir lnir-home", "/dist/data.html", "原価", 0),
            item("lnir lnir-home", "/dist/data.html", "作業・稼働実績統計", 0),
          ]),
          menu("MASTER", [
            item("lnir lnir-package", "/dist/setting.html", "入荷予定", 1),
            item("lnir lnir-file-name", "/dist/setting.html", "看板・入荷予定表", 10),
            item("lnir lnir-cog", "/dist/setting.html", "設定", 0),
          ]),
          menu("USER", [
            item("lnir lnir-package", "/dist/setting.html", "入荷予定", 1),
            item("lnir lnir-file-name", "/dist/setting.html", "看板・入荷予定表", 10),
            item("lnir lnir-cog", "/dist/setting.html", "設定", 0),
          ]),
        ],
      },
    });

    const toggleMenu = (menu: Menu) => {
      menu.isExpand = !menu.isExpand;
    };

    return {
      state,
      toggleMenu,
    };
  }
};
</script>

<template>

<section class="layout__menu menu">
  <header class="layout__menu__header menu__header">
    <cite class="menu__brand">GETTO</cite>
    <strong class="menu__title">CSS</strong>
    <cite class="menu__subTitle">simple admin theme</cite>
  </header>
  <nav class="menu__body" id="menu">
    <ul v-for="menu in state.data.menus" class="menu__nav" :class="{ menu__nav_collapsed: !menu.isExpand }">
      <li>
        <a href="#" class="menu__nav__header menu__nav__link" @click.prevent="toggleMenu(menu)">
          {{ menu.label }}
          <span v-if="menu.badge > 0" class="badge badge_alert">{{ menu.badge }}</span>

          <span class="menu__nav__handle">
            <i v-if="menu.isExpand" class="lnir lnir-chevron-down"></i>
            <i v-else class="lnir lnir-chevron-left"></i>
          </span>
        </a>
      </li>
      <ul class="menu__nav__items" :class="{ menu__nav__items_expand: menu.isExpand }">
        <li v-for="item in menu.items" class="menu__nav__item">
          <a :href="item.href" class="menu__nav__link" :class="{ menu__nav__item_active: item.isActive }">
            <i :class="item.icon"></i>
            {{ item.label }}
            <span v-if="item.badge > 0" class="badge badge_alert">{{ item.badge }}</span>
          </a>
        </li>
      </ul>
    </ul>
  </nav>
  <footer class="menu__footer">
    <p class="menu__footer__message">copyright GETTO.systems</p>
    <p class="menu__footer__message">version: {{ state.data.version }}</p>
  </footer>
</section>

</template>

<style>
</style>
