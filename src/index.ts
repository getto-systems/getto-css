import { createApp } from 'vue';
import Menu from "./menu.vue";
import Index from "./index.vue";
import "./getto.css";

createApp({
  components: {
    Menu,
    Index,
  },
  template: "<Index/><Menu/>",
}).mount('#main');
