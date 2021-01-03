<template>
  <div class="signup">
    <h2>SignUp page</h2>
    <input v-model="id" class="input" placeholder="id" /><br />
    <input v-model="password" class="input" placeholder="password" /><br />
    <button class="button">SignUp</button>
    <router-link to="/auth/login">Login</router-link>
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


<style lang="scss">
$blue: rgb(199, 232, 245);
$yellow: rgb(252, 245, 230);
$primaryLight: #fdf2f0;
$primaryColor: #f8dae2;
$primaryDark: #b57fb3;

.signup {
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
  background-color: $primaryLight;
  border: 1px solid white;
}

.button {
  width: 85%;
  height: 50px;
  cursor: pointer;
  border: 1px solid white;

  background-color: $primaryDark;
}
</style>
 
 