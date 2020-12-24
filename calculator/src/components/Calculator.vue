<template>
  <h1>쌀집 계산기</h1>

  <div class="grid-container">
    <div class="result-viewer">Result</div>
    <div v-on:click="excuteMC">MC</div>
    <div v-on:click="excuteMR">MR</div>
    <div>M-</div>
    <div>M+</div>
    <div>÷</div>
    <div>+/-</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>X</div>
    <div>C</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>-</div>
    <div>AC</div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div class="plus">+</div>
    <div>0</div>
    <div>00</div>
    <div>.</div>
    <div>=</div>
  </div>

  <!-- <button v-on:click="Enter">Enter</button> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Result {
  result: number;
}

export default defineComponent({
  name: "CalculatorApp",

  data() {
    return {
      result: 50,
    };
  },
  methods: {
    excuteMC() {
      console.log("MC");
    },
    excuteMR() {
      console.log("MR");
    },
  },
  mounted() {
    console.log("helllll");
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 10px;
  background-color: pink;
  padding: 10px;
}

.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
}

.result-viewer {
  grid-column-start: 1;
  grid-column-end: 6;
}
.plus {
  grid-column-start: 5;
  grid-column-end: 6;
  grid-row-start: 5;
  grid-row-end: 7;
}
</style>