<template>
  <h1>안녕하세요. 최상위 components인 App.vue 입니다.</h1>
  <!-- <router-view /> -->
  <Home />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Home from "./components/Home.vue";

export default defineComponent({
  name: "App",
  components: {
    Home,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
