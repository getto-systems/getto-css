<template>

<section>
  <h2>Hello, Vue!</h2>
  <ul v-if="state.data.items">
    <li v-for="item in state.data.items"><a href="#" @click.prevent="clicked(item)">{{ item.label }}</a></li>
  </ul>
</section>

</template>

<script lang="ts">
import { reactive } from "vue";

type State = {
  data: Data,
};

type Data = {
  items: Array<Item>,
};

type Item = {
  label: string,
};

export default {
  setup() {
    const state = reactive<State>({
      data: {
        items: [],
      },
    });

    const clicked = (item: Item) => {
      console.log(item);
    };

    return {
      state,
      clicked,
    };
  }
};
</script>

<style>
</style>
