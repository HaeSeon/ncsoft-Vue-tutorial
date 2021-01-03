<template>
  <div class="notes-container">
    <ul class="note-list">
      <div v-for="note in notes" v-bind:key="note.id">
        {{ note.createDatetime }}<br /><br />
        {{ note.content }}
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export const serverUrl = `http://${location.hostname}:3001`;

export default defineComponent({
  name: "NoteList",
  data() {
    return {
      notes: [{ ownerId: String, content: String, createDatetime: Number }],
    };
  },

  methods: {
    readPosts() {
      const url = `${serverUrl}/notes`;
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          const posts = res.posts as any[];
          this.notes = posts.map((post) => {
            return {
              ownerId: post.owner_id,
              createDatetime: post.create_datetime,
              content: post.content,
            };
          });
          console.log(this.notes);
        });
    },
  },
  mounted() {
    this.readPosts();
  },
});
</script>

<style lang="scss">
$blue: rgb(199, 232, 245);
$yellow: rgb(252, 245, 230);
$primaryLight: #fdf2f0;
$primaryColor: #f8dae2;
$primaryDark: #b57fb3;

.notes-container {
  background: $primaryDark;
  width: 100%;
  height: 20%;
  padding: 2%;
}

.note-list {
  display: flex;
  padding: 0;
  margin: 0;
  div {
    background: $blue;
    padding: 10px;
    margin: 10px;
    width: 100px;
    height: 100px;
  }
}
</style>
 