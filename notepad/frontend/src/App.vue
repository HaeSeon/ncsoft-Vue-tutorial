<template>
  <div id="app">
    <!-- <div id="nav">
      <h1>HaeSunnySideOf's notepad</h1>
      <br />
      <br />
      <router-link to="/home">Home</router-link> |
      <router-link to="/auth/login">Login</router-link>
    </div> -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss">
$primaryColor: #f8dae2;
body {
  margin: 0;
  background: $primaryColor;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: pink;
    }
  }
}
</style>
