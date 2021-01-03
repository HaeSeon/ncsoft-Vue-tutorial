<template>
  <div class="note-container">
    <h1>{{ date }}</h1>
    <textarea v-model="post.content" rows="13" />
    <button v-on:click="createNote">작성 완료</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export const serverUrl = `http://${location.hostname}:3001`;

export default defineComponent({
  name: "Note",
  data() {
    return {
      post: { ownerId: String, content: String },
    };
  },
  methods: {
    async createNote() {
      const timestamp = new Date().getTime();
      const request = {
        // 카멜케이스....
        ownerId: "5fed5d8dde9a450bf092be9e",
        content: this.post.content,
        createDatetime: timestamp,
      };
      const url = `${serverUrl}/notes`;
      await fetch(url, {
        method: "post",
        body: JSON.stringify(request),
        headers: { "Content-Type": "application/json" },
      });
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
 