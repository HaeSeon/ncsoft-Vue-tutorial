<template>
  <div class="note-item" v-on:click="getTodo">
    <div class="container">
      <p class="date">{{ date }}</p>
      <button class="delete-button" v-on:click="deleteNote">X</button>
      <p class="content">{{ content }}</p>
    </div>
  </div>
</template>

<script>
import { serverUrl } from "@/main";
import { convertDatestring } from "@/module";
export default {
  name: "NoteItem",
  props: {
    _id: String,
    ownerId: String,
    content: String,
    createDatetime: Number,
  },
  data() {
    return {
      date: convertDatestring(this.createDatetime || 1),
    };
  },
  methods: {
    getTodo() {
      location.search = `note_id=${this._id}`;
    },
    deleteNote() {
      const url = `${serverUrl}/notes/${this._id}`;
      fetch(url, {
        method: "delete",
      }).then(() => {
        location.reload();
      });
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.note-item {
  $blue: rgb(199, 232, 245);
  width: 100px;
  height: 100px;

  background: $blue;

  padding: 8px;
  margin: 8px;

  .container {
    display: grid;
    grid-template-columns: auto min-content;
    grid-template-rows: min-content auto;

    height: 100%;

    .date {
      font-size: 12px;
      width: fit-content;
    }

    .delete-button {
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 4px;
    }

    .content {
      grid-column-start: 1;
      grid-column-end: 3;
      overflow: hidden;
    }
  }
}
</style>