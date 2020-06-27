import { html, Component, render } from "htm/preact";

type Props = {}
type State = {
  message: string,
}

class HelloWorld extends Component {
  state: State = {
    message: "Hello, preact World!",
  };

  render(props: Props, state: State) {
    return html`
      <h1>${state.message}</h1>
    `
  }
}

const main = document.getElementById("main");
if (main !== null) {
  render(html`<${HelloWorld} />`, main);
}


/*
import { createApp } from 'vue';
import Page from "./index.vue";
import Menu from "./menu.vue";
import "./getto.css";

createApp({
  components: {
    Page,
    Menu,
  },
  template: "<Page/><Menu/>",
}).mount('#main');
*/
