<template>
  <div class="container">
    <NoteList v-on:click="openNoet" />
    <Note />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Note from "./Note.vue";
import NoteList from "./NoteList.vue";

export default defineComponent({
  components: { NoteList, Note },
  name: "Home",
  methods: {
    openNoet() {
      alert("heoho");
    },
  },
  mounted() {
    console.log("in home");
  },
});
</script>

<style lang="scss">
$blue: rgb(199, 232, 245);
$yellow: rgb(252, 245, 230);
$primaryLight: #fdf2f0;
$primaryColor: #f8dae2;
$primaryDark: #b57fb3;
.container {
  margin: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin-left: 5%;
  // margin-right: 5%;
  padding: 2%;
  background-color: $primaryColor;
}
</style>
 