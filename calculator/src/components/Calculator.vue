<template>
  <div>
    <h1>쌀집 계산기</h1>

    <div class="grid-container">
      <div class="result-viewer">{{ view }}</div>
      <div @click="handleMC">MC</div>
      <div @click="handleMR">MR</div>
      <div @click="handleMminus">M-</div>
      <div @click="handleMplus">M+</div>
      <div @click="handlePressOp('/')">÷</div>
      <div @click="handlePressNegate">+/-</div>
      <div @click="handlePressNum('7')">7</div>
      <div @click="handlePressNum('8')">8</div>
      <div @click="handlePressNum('9')">9</div>
      <div @click="handlePressOp('*')">X</div>
      <div @click="handlepressAC()">C</div>
      <div @click="handlePressNum('4')">4</div>
      <div @click="handlePressNum('5')">5</div>
      <div @click="handlePressNum('6')">6</div>
      <div @click="handlePressOp('-')">-</div>
      <div @click="handlepressAC()">AC</div>
      <div @click="handlePressNum('1')">1</div>
      <div @click="handlePressNum('2')">2</div>
      <div @click="handlePressNum('3')">3</div>
      <div class="plus" @click="handlePressOp('+')">+</div>
      <div @click="handlePressNum('0')">0</div>
      <div @click="handlePressNum('00')">00</div>
      <div @click="handlePressNum('.')">.</div>
      <div @click="handlePreeEnter">=</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// function add(firstNum: number, secondNum: number) {
//   return firstNum + secondNum;
// }

// function add_(input: { num1: number; num2: number }) {
//   return input.num1 + input.num2;
// }

// interface User {
//   name: string;
//   pn: string;
//   address: string;
//   password: string;
// }

// const ogu: User = {
//   name: "오구",
//   pn: "5959",
//   password: "이해선욤뇸",
//   address: "문래파라곤해서니방",
// };

// getUser(ogu);

// function getUser(user: {
//   name: string;
//   pn?: string;
//   address: string;
//   password?: string;
// }) {
//   return true;
// }

// function main() {
//   add(1, 2);
//   add_({
//     num1: 1,
//     num2: 2,
//   });
// }

// example
// const CalcFunctions: Record<Operator, Function> = {
//   "+": (a: number, b: number): number => a + b,
//   "-": (a: number, b: number): number => a - b,
//   "*": () => {},
//   "/": () => {},
// };

// function main() {
//   const firstNum = 1;
//   const secondNum = 2;
//   const sumResult = CalcFunctions["+"](firstNum, secondNum);
//   console.log(sumResult);
// }

type Operator = "+" | "-" | "*" | "/";
interface CalculateFunction {
  (operand1: number, operand2: number): number;
}

const calcFuncs: Record<Operator, CalculateFunction> = {
  "+": (num1, num2) => num1 + num2,
  "-": (num1, num2) => num1 - num2,
  "*": (num1, num2) => num1 * num2,
  "/": (num1, num2) => num1 / num2,
};

interface CalculatorData {
  inputNum: string;
  resultNum: string;
  fromEnter: boolean;
  op: Operator | undefined;
  view: string;
  memory: string;
}

export default defineComponent({
  name: "CalculatorApp",
  data(): CalculatorData {
    return {
      inputNum: "0",
      resultNum: "0",
      fromEnter: false,
      op: undefined,
      view: "0",
      memory: "",
    };
  },
  methods: {
    handleMC() {
      console.log("MC");
    },
    handleMR() {
      console.log("MR");
    },
    handleMpluse() {
      console.log("MC");
    },
    handleMminus() {
      console.log("MC");
    },
    handlePressNum(num: string) {
      if (this.fromEnter === true) {
        // 1+1=2 하고 AC버튼 없이 숫자를 눌렀을 경우
        this.resultNum = "";
        if (num === "." && this.resultNum.includes(".")) {
          console.log("dot duplicated");
        } else if (num != "." && this.resultNum === "0") {
          this.resultNum = `${num}`;
        } else {
          this.resultNum = `${this.resultNum}${num}`;
        }
        this.view = this.resultNum;
        this.fromEnter = false;
      } else {
        if (num === "." && this.inputNum.includes(".")) {
          console.log("dot duplicated");
        } else if (num != "." && this.inputNum === "0") {
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
    handlePressOp(op: Operator) {
      if (this.inputNum != "") {
        //operation만 여러번 눌렀을 때 대비
        if (this.resultNum === "") {
          // 이전 결과값이 없으면
          this.resultNum = this.inputNum;
        } else if (this.fromEnter === true) {
          // 이전값이 넘어온 경로가 pressEnter이면
          console.log("pass");
        } else {
          // 이전값이 넘어온 경로가 handlePressOp이면
          this.resultNum = String(
            calcFuncs[op](Number(this.resultNum), Number(this.inputNum))
          );
        }
        this.view = this.resultNum;
        this.inputNum = "";
      }
      this.op = op;
      this.fromEnter = false;
    },
    handlePressEnter() {
      if (this.inputNum === "") {
        // 3+ = = = 처리
        this.inputNum = this.resultNum;
      }
      if (this.op) {
        this.resultNum = String(
          calcFuncs[this.op](Number(this.resultNum), Number(this.inputNum))
        );
      } else {
        throw "";
      }
      this.fromEnter = true;
      this.view = this.resultNum;
    },
    handlePressNegate() {
      if (this.fromEnter === true) {
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
    handlepressAC() {
      this.resultNum = "";
      this.inputNum = "";
      this.view = "0";
      this.op = undefined;
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
