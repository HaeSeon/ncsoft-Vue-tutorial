<template>
  <div class="notes-container">
    <ul class="note-list">
      <div v-for="note in notes" v-bind:key="note.id">
        <NoteItem v-bind="note" />
      </div>
    </ul>
    <button v-on:click="addPost">새로운 노트 작성</button>
  </div>
</template>

<script lang="ts">
import { serverUrl } from "@/main";
import { getToken } from "@/module";
import { defineComponent, PropType, reactive } from "vue";
import NoteItemVue from "./NoteItem.vue";

interface Post {
  ownerId: string;
  content: string;
  createDatetime: number;
}

export default defineComponent({
  name: "NoteList",
  components: {
    NoteItem: NoteItemVue,
  },
  props: {
    onSelect: Function,
  },
  data() {
    return {
      notes: [] as Post[],
    };
  },
  methods: {
    readPosts: async function () {
      const url = `${serverUrl}/notes`;
      const response = await fetch(url, {
        headers: {
          token: getToken(),
        },
      });
      const res = (await response.json()) as any;
      const posts = res.posts as any[];

      this.notes = posts.map((post) => {
        return {
          ownerId: post.owner_id,
          createDatetime: post.create_datetime,
          content: post.content,
          _id: post._id,
        };
      });
    },

    addPost() {
      location.search = "";
    },
  },
  mounted() {
    this.readPosts();
  },
});
</script>

<style lang="scss">
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

  overflow-x: scroll;
}
button {
  padding: 10px;
  cursor: pointer;
  border: 1px solid white;

  background-color: $primaryColor;
}
.note-list::-webkit-scrollbar {
  display: none;
}
</style>
 