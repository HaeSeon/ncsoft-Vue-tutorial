<template>
  <div class="posts-container">
    <ul ref="postsContainer" class="post-list">
      <div v-for="post in posts" v-bind:key="post.id">
        <Post v-bind="post" />
      </div>
    </ul>
    <button v-on:click="addPost">새로운 노트 작성</button>
  </div>
</template>

<script lang="ts">
import { serverUrl } from "@/main";
import { getToken } from "@/module";
import { defineComponent, PropType, reactive } from "vue";
import Post from "./Post.vue";

interface Post {
  ownerId: string;
  content: string;
  createDatetime: number;
}

export default defineComponent({
  name: "Posts",
  components: {
    Post: Post,
  },
  props: {
    onSelect: Function,
  },
  data() {
    return {
      isLoading: false,
      posts: [] as Post[],
      scrolledToBottom: false,
    };
  },
  methods: {
    async readPosts() {
      this.isLoading = true;
      const url = `${serverUrl}/posts?start=${this.posts.length}`;
      const response = await fetch(url, {
        headers: {
          token: getToken(),
        },
      });
      const res = (await response.json()) as any;
      const posts = res.posts as any[];

      this.posts.push(
        ...posts.map((post) => {
          return {
            ownerId: post.owner_id,
            createDatetime: post.create_datetime,
            content: post.content,
            _id: post._id,
          };
        })
      );
      this.isLoading = false;
    },
    addPost() {
      location.search = "";
    },
    scroll() {
      const $postsContainer = this.$refs.postsContainer as HTMLUListElement;
      $postsContainer.onscroll = () => {
        const totalWidth = $postsContainer.scrollWidth;
        const currentScroll =
          $postsContainer.clientWidth + $postsContainer.scrollLeft;
        if (currentScroll + 10 >= totalWidth && !this.isLoading) {
          // load more
          this.readPosts();
        }
      };
    },
  },
  mounted() {
    this.readPosts();
    this.scroll();
  },
});
</script>

<style lang="scss">
$yellow: rgb(252, 245, 230);
$primaryLight: #fdf2f0;
$primaryColor: #f8dae2;
$primaryDark: #b57fb3;

.posts-container {
  background: $primaryDark;
  width: 100%;
  height: 20%;
  padding: 2%;
}

.post-list {
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
.post-list::-webkit-scrollbar {
  display: none;
}
</style>
 