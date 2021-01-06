<template>
  <div class="post-container">
    <h1>{{ date }}</h1>
    <textarea v-model="post.content" rows="13" />
    <button v-on:click="submitPost">작성 완료</button>
  </div>
</template>

<script lang="ts">
import { serverUrl } from "@/main";
import { getUserId } from "@/module";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Post",
  data() {
    return {
      post: { ownerId: "", content: "" },
    };
  },
  async mounted() {
    const postId = new URLSearchParams(location.search).get("post_id");
    if (!postId) {
      return;
    }
    const url = `${serverUrl}/posts/${postId}`;
    const response = await fetch(url);
    const post = await response.json();
    console.log(post);
    this.post = post;
  },
  methods: {
    async submitPost() {
      const userId = await getUserId();
      const timestamp = new Date().getTime();
      const postId = new URLSearchParams(location.search).get("post_id");
      const request = {
        ownerId: userId,
        content: this.post.content,
      };
      console.log(postId);
      let result;
      if (!postId) {
        const url = `${serverUrl}/posts`;
        const response = await fetch(url, {
          method: "post",
          body: JSON.stringify(request),
          headers: { "Content-Type": "application/json" },
        });
        result = await response.json();
      } else {
        const url = `${serverUrl}/posts/${postId}`;
        const response = await fetch(url, {
          method: "put",
          body: JSON.stringify(request),
          headers: { "Content-Type": "application/json" },
        });
        result = await response.json();
      }
      console.log(result.ok);
      if (result.ok == true) {
        // alert("저장 완료");
        location.reload();
      } else {
        alert("노트 저장 실패");
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

.post-container {
  background: $yellow;
  padding: 2%;
  width: 100%;
  height: 80%;
}

textarea {
  background: $yellow;
  border: 0px;
  width: 90%;
  font-size: 2em;
}
</style>
 