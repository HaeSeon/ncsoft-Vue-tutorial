<template>
  <div class="home">
    <h3>{{ userId }}'s Note</h3>
    <Posts />
    <PostForm />
  </div>
</template>

<script lang="ts">
import { getUserId } from "@/module";
import { defineComponent } from "vue";
import PostForm from "./PostForm.vue";
import Posts from "./Posts.vue";

export default defineComponent({
  components: { Posts, PostForm },
  name: "Home",
  data() {
    return {
      userId: "",
    };
  },
  async mounted() {
    this.userId = await getUserId().catch((err) => {
      this.$router.replace("/login");
      throw err;
    });
  },
  methods: {},
});
</script>

<style lang="scss">
$blue: rgb(199, 232, 245);
$yellow: rgb(252, 245, 230);
$primaryLight: #fdf2f0;
$primaryColor: #f8dae2;
$primaryDark: #b57fb3;
.home {
  margin-right: 10%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2%;
  background-color: $primaryColor;
}

h3 {
  margin: 2%;
}
</style>
 