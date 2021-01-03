<template>
  <div class="note-container">
    <h1>{{ date }}</h1>
    <textarea v-model="post.content" rows="13" /><br />
    <button v-on:click="submitNote">작성 완료</button>
  </div>
</template>

<script lang="ts">
import { serverUrl } from "@/main";
import { getUserId } from "@/module";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Note",
  data() {
    return {
      post: { ownerId: "", content: "" },
    };
  },
  async mounted() {
    const noteId = new URLSearchParams(location.search).get("note_id");
    if (!noteId) {
      return;
    }
    const url = `${serverUrl}/notes/${noteId}`;
    const response = await fetch(url);
    const post = await response.json();
    console.log(post);
    this.post = post;
  },
  methods: {
    async submitNote() {
      const userId = await getUserId();
      const timestamp = new Date().getTime();
      const noteId = new URLSearchParams(location.search).get("note_id");
      const request = {
        ownerId: userId,
        content: this.post.content,
      };
      console.log(noteId);
      let result;
      if (!noteId) {
        const url = `${serverUrl}/notes`;
        const response = await fetch(url, {
          method: "post",
          body: JSON.stringify(request),
          headers: { "Content-Type": "application/json" },
        });
        result = await response.json();
      } else {
        const url = `${serverUrl}/notes/${noteId}`;
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

.note-container {
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
 