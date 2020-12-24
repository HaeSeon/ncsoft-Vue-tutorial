<template>
  <!-- <div class="hello">
    <h1>{{ msg }}</h1>
  </div> -->
  <div id="counter">Counter: {{ counter }}</div>
  <button v-on:click="counterRestart">restart</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// export default defineComponent({
//   name: "HelloWorld",
//   props: {
//     msg: String,
//     counter: Number,
//   },
//   data() {
//     return {
//       counter: 0,
//     };
//   },
// });

interface Counter {
  counter: number;
}
export default defineComponent({
  name: "CounterApp",
  data(): Counter {
    return {
      counter: 0,
    };
  },
  methods: {
    counterRestart() {
      console.log("stop");
      this.counter = 0;
    },
  },
  mounted() {
    console.log("helllll");
    setInterval(() => {
      this.counter++;
    }, 1000);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>