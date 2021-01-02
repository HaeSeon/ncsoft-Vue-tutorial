<template>
  <div class="signup">
    <h2>SignUp page</h2>
    <form @submit="onSubmit">
      <input v-model="id" placeholder="id" /><br />
      <input v-model="password" placeholder="password" /><br />
      <button type="submit">SignUp</button>
      <router-link to="/login"><button>Login</button></router-link>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SignUp",
  data() {
    return {
      id: "",
      password: "",
    };
  },
  mounted() {
    console.log("in signup");
  },
});
</script>

<style>
.login {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 30%;
  padding: 15px;
}
button {
  margin: 20px;
  width: 15%;
  cursor: pointer;
}
</style>
 