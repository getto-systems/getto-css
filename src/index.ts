import { createApp } from 'vue';
import Index from "./index.vue";
import Menu from "./menu.vue";
import "./getto.css";

createApp({
  components: {
    Index,
    Menu,
  },
  template: "<Index/><Menu/>",
}).mount('#main');
