<template>
  <div class="signup">
    <h2>SignUp page</h2>
    <input v-model="user.id" class="input" placeholder="id" /><br />
    <input v-model="user.password" class="input" placeholder="password" /><br />
    <button class="button" v-on:click="signUp">SignUp</button>
    <router-link to="/auth/login">Login</router-link>
  </div>
</template>

<script lang="ts">
import { serverUrl } from "@/main";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SignUp",
  data() {
    return {
      user: { id: "", password: "" },
      message: "",
    };
  },
  methods: {
    async signUp() {
      const request = {
        id: this.user.id,
        password: this.user.password,
      };
      const url = `${serverUrl}/auth/signup`;
      const response = await fetch(url, {
        method: "post",
        body: JSON.stringify(request),
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log(result.ok);
      if (result.ok == true) {
        console.log(result.token);
        document.cookie = `token=${result.token}`;

        this.$router.replace("/home");
      } else {
        this.message = "회원가입 실패";
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

.signup {
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
}

h2 {
  margin: 10%;
}

.button {
  width: 84%;
  height: 50px;
  cursor: pointer;
  border: 1px solid white;

  background-color: $primaryDark;
}
</style>
 
 