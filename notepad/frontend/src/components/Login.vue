<template>
  <div class="login">
    <h2>Login page</h2>
    <!-- <form class="login_form"> -->
    <input v-model="user.id" placeholder="id" class="input" /><br />
    <input
      v-model="user.password"
      type="password"
      placeholder="password"
      class="input"
    /><br />
    <button class="button" v-on:click="login">Login</button><br />
    <router-link to="/signup">SignUp</router-link>
    <!-- </form> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export const serverUrl = `http://${location.hostname}:3001`;

export default defineComponent({
  name: "Login",
  data() {
    return {
      user: { id: "", password: "" },
    };
  },
  methods: {
    async login() {
      // fetch(`${serverUrl}`)
      //   .then((res) => res.json())
      //   .then((res) => {
      //     console.log(`${res.users[0].id} 님 환영합니다`, res);
      //   });
      const request = {
        id: this.user.id,
        password: this.user.password,
      };

      const url = `${serverUrl}/auth/login`;
      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify(request),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log(result);
      this.$router.replace("home");
    },
  },
});
</script>

<style>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 25%;
  margin-right: 25%;
  padding: 2%;
  background-color: #fef1e9;
}

.login_form {
  margin: 3%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.input {
  width: 80%;
  background-color: #fdebe0;
  border: 1px solid white;
}

.button {
  width: 100%;
  height: 30px;
  cursor: pointer;
  border: 1px solid white;

  background-color: rgb(255, 198, 175);
}
</style>
 