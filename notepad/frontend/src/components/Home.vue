<template>
  <div class="home">
    <h3>{{ userId }}'s Note</h3>
    <NoteList />
    <Note />
  </div>
</template>

<script lang="ts">
import { getUserId } from "@/module";
import { defineComponent } from "vue";
import Note from "./Note.vue";
import NoteList from "./NoteList.vue";

export default defineComponent({
  components: { NoteList, Note },
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
  margin: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin-left: 5%;
  // margin-right: 5%;
  padding: 2%;
  background-color: $primaryColor;

  .notes-container {
    margin-top: 16px;
  }
}
</style>
 