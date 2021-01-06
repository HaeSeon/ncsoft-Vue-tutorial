<template>
  <div class="login">
    <h2>Login page</h2>
    <input v-model="user.id" placeholder="id" class="input" />
    <input
      v-model="user.password"
      type="password"
      placeholder="password"
      class="input"
    />
    <p>{{ message }}</p>
    <button class="button" v-on:click="login">Login</button>
    <router-link to="/signup">SignUp</router-link>
  </div>
</template>

<script lang="ts">
import { serverUrl } from "@/main";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Login",
  data() {
    return {
      user: { id: "", password: "" },
      message: "",
    };
  },
  methods: {
    async login() {
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
      if (result.ok == true) {
        document.cookie = "";
        document.cookie = `token=${result.token}`;

        this.$router.replace("/home");
      } else {
        this.message = "로그인 실패";
      }
    },
  },
});
</script>

<style lang="scss">
$blue: rgb(199, 232, 245);
$yellow: rgb(252, 245, 230);
$primaryLight: #fdf2f0;
$primaryColor: #f8dae2;
$primaryDark: #b57fb3;

.login {
  margin: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 25%;
  margin-right: 25%;
  padding: 4%;
  background-color: $primaryColor;
}

.input {
  width: 80%;
  height: 40px;
  background-color: $primaryLight;
  border: 1px solid white;
  margin: 10px;
}

h2 {
  margin: 10%;
}

.button {
  margin: 10px;
  width: 80%;
  height: 50px;
  cursor: pointer;
  border: 1px solid white;

  background-color: $primaryDark;
}
</style>
 