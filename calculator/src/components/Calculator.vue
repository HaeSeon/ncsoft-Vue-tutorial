<template>
  <div>
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
      <div v-on:click="pressAC()">C</div>
      <div v-on:click="pressNum('4')">4</div>
      <div v-on:click="pressNum('5')">5</div>
      <div v-on:click="pressNum('6')">6</div>
      <div v-on:click="pressOp('-')">-</div>
      <div v-on:click="pressAC()">AC</div>
      <div v-on:click="pressNum('1')">1</div>
      <div v-on:click="pressNum('2')">2</div>
      <div v-on:click="pressNum('3')">3</div>
      <div class="plus" v-on:click="pressOp('+')">+</div>
      <div v-on:click="pressNum('0')">0</div>
      <div v-on:click="pressNum('00')">00</div>
      <div v-on:click="pressNum('.')">.</div>
      <div v-on:click="pressEnter">=</div>
    </div>
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
      inputNum: "0",
      resultNum: "0",
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
      if (this.fromEnter == true) {
        // 1+1=2 하고 AC버튼 없이 숫자를 눌렀을 경우
        this.resultNum = "";
        if (num == "." && this.resultNum.includes(".")) {
          console.log("dot duplicated");
        } else if (num != "." && this.resultNum == "0") {
          this.resultNum = `${num}`;
        } else {
          this.resultNum = `${this.resultNum}${num}`;
        }
        this.view = this.resultNum;
        this.fromEnter = false;
      } else {
        if (num == "." && this.inputNum.includes(".")) {
          console.log("dot duplicated");
        } else if (num != "." && this.inputNum == "0") {
          this.inputNum = `${num}`;
        } else {
          this.inputNum = `${this.inputNum}${num}`;
        }
        console.log(
          "op : ",
          this.op,
          "inputNum : ",
          this.inputNum,
          "resultNum : ",
          this.resultNum
        );
        this.view = this.inputNum;
      }
    },
    pressOp(op: string) {
      if (this.inputNum != "") {
        //operation만 여러번 눌렀을 때 대비
        if (this.resultNum == "") {
          // 이전 결과값이 없으면
          this.resultNum = this.inputNum;
        } else if (this.fromEnter == true) {
          // 이전값이 넘어온 경로가 pressEnter이면
          console.log("pass");
        } else {
          // 이전값이 넘어온 경로가 pressOp이면
          this.resultNum = String(
            calcWithOp(Number(this.resultNum), Number(this.inputNum), this.op)
          );
        }
        this.view = this.resultNum;
        this.inputNum = "";
      }
      this.op = op;
      this.fromEnter = false;
    },
    pressEnter() {
      if (this.inputNum == "") {
        // 3+ = = = 처리
        this.inputNum = this.resultNum;
      }
      this.resultNum = String(
        calcWithOp(Number(this.resultNum), Number(this.inputNum), this.op)
      );
      this.fromEnter = true;
      this.view = this.resultNum;
    },
    pressNegate() {
      if (this.fromEnter == true) {
        // 3+3=6 에서 negate(6) 을 처리할 경우
        this.resultNum = String(-Number(this.resultNum));
        this.view = this.resultNum;
      } else {
        if (this.inputNum != "") {
          //negate(3)=-3
          this.inputNum = String(-Number(this.inputNum));
        } else {
          // 5 + negate() -> 5+negate(5)=0
          this.inputNum = String(-Number(this.resultNum));
        }
        this.view = this.inputNum;
      }
      console.log(
        "op : ",
        this.op,
        "inputNum : ",
        this.inputNum,
        "resultNum : ",
        this.resultNum
      );
    },
    pressAC() {
      this.resultNum = "";
      this.inputNum = "";
      this.view = "0";
      this.op = "";
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
