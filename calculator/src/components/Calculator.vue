<template>
  <h1>쌀집 계산기</h1>

  <div class="grid-container">
    <div class="result-viewer">{{ view }}</div>
    <div v-on:click="excuteMC">MC</div>
    <div v-on:click="excuteMR">MR</div>
    <div v-on:click="excuteMminus">M-</div>
    <div v-on:click="excuteMplus">M+</div>
    <div v-on:click="pressOp('/')">÷</div>
    <div v-on:click="pressNegate">+/-</div>
    <div v-on:click="pressNum('7')">7</div>
    <div v-on:click="pressNum('8')">8</div>
    <div v-on:click="pressNum('9')">9</div>
    <div v-on:click="pressOp('*')">X</div>
    <div>C</div>
    <div v-on:click="pressNum('4')">4</div>
    <div v-on:click="pressNum('5')">5</div>
    <div v-on:click="pressNum('6')">6</div>
    <div v-on:click="pressOp('-')">-</div>
    <div>AC</div>
    <div v-on:click="pressNum('1')">1</div>
    <div v-on:click="pressNum('2')">2</div>
    <div v-on:click="pressNum('3')">3</div>
    <div class="plus" v-on:click="pressOp('+')">+</div>
    <div v-on:click="pressNum('0')">0</div>
    <div v-on:click="pressNum('00')">00</div>
    <div>.</div>
    <div v-on:click="pressEnter">=</div>
  </div>

  <!-- <button v-on:click="Enter">Enter</button> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";

function calcWithOp(num2: number, num1: number, op: string): number {
  if (!op) {
    return num1;
  }
  switch (op) {
    case "+":
      return num2 + num1;
    case "-":
      return num2 - num1;
    case "*":
      return num2 * num1;
    case "/":
      return num2 / num1;
    default:
      throw `invalid operator`;
  }
}

export default defineComponent({
  name: "CalculatorApp",
  data() {
    return {
      num1: "",
      num2: "",
      fromEnter: false,
      op: "",
      view: "0",
      memory: "",
    };
  },
  methods: {
    excuteMC() {
      console.log("MC");
    },
    excuteMR() {
      console.log("MR");
    },
    pressNum(num: string) {
      this.num1 = String(this.num1) + num;
      console.log("op : ", this.op, "num1 : ", this.num1, "num2 : ", this.num2);
      this.view = this.num1;
    },
    pressOp(op: string) {
      if (this.num2 == "") {
        // 이전 결과값이 없으면
        this.num2 = this.num1;
      } else if (this.fromEnter == true) {
        // 이전값이 넘어온 경로가 pressEnter이면
        console.log("pass");
      } else {
        // 이전값이 넘어온 경로가 pressOp이면
        this.num2 = String(
          calcWithOp(Number(this.num2), Number(this.num1), this.op)
        );
        console.log(
          "In operation calc calc, num1 : ",
          this.num1,
          "op : ",
          this.op,
          "num2 : ",
          this.num2
        );
      }
      this.op = op;
      this.view = this.num2;
      this.num1 = "";
      this.fromEnter = false;
      console.log("op : ", this.op, "num1 : ", this.num1, "num2 : ", this.num2);
    },
    pressEnter() {
      console.log(
        "before calc, num1 : ",
        this.num1,
        "op : ",
        this.op,
        "num2 : ",
        this.num2
      );
      this.num2 = String(
        calcWithOp(Number(this.num2), Number(this.num1), this.op)
      );
      this.num1 = "";
      this.fromEnter = true;
      console.log(
        "after calc, num1 : ",
        this.num1,
        "op : ",
        this.op,
        "num2 : ",
        this.num2
      );
      this.view = this.num2;
    },
    pressNegate() {
      this.num1 = String(-Number(this.num1));
      this.view = this.num1;
    },
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
