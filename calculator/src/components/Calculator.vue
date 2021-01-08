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
      <div @click="handlePressNum(7)">7</div>
      <div @click="handlePressNum(8)">8</div>
      <div @click="handlePressNum(9)">9</div>
      <div @click="handlePressOp('*')">X</div>
      <div @click="handlepressAC()">C</div>
      <div @click="handlePressNum(4)">4</div>
      <div @click="handlePressNum(5)">5</div>
      <div @click="handlePressNum(6)">6</div>
      <div @click="handlePressOp('-')">-</div>
      <div @click="handlepressAC()">AC</div>
      <div @click="handlePressNum(1)">1</div>
      <div @click="handlePressNum(2)">2</div>
      <div @click="handlePressNum(3)">3</div>
      <div class="plus" @click="handlePressOp('+')">+</div>
      <div @click="handlePressNum(0)">0</div>
      <div @click="handlePressNum('00')">00</div>
      <div @click="handlePressNum('.')">.</div>
      <div @click="handlePressEnter">=</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
type Operator = "+" | "-" | "*" | "/";
interface CalculateFunction {
  (operand1: number, operand2: number): number;
}
type InputType = "." | "00" | number;
const calcFuncs: Record<Operator, CalculateFunction> = {
  "+": (num1, num2) => num1 + num2,
  "-": (num1, num2) => num1 - num2,
  "*": (num1, num2) => num1 * num2,
  "/": (num1, num2) => num1 / num2,
};
interface CalculatorData {
  numDisplay: string;
  numCache: string;
  isFromEnter: boolean;
  op: Operator | undefined;
  view: string;
  positiveMemory: string;
  negativeMemory: string;
}
export default defineComponent({
  name: "CalculatorApp",
  data(): CalculatorData {
    return {
      numDisplay: "",
      numCache: "0",
      isFromEnter: false,
      op: undefined,
      view: "0",
      positiveMemory: "",
      negativeMemory: "",
    };
  },
  methods: {
    handleMC() {
      this.positiveMemory = "";
      this.negativeMemory = "";
      this.numDisplay = "";
    },
    handleMR() {
      this.view = String(
        parseFloat(this.positiveMemory) + parseFloat(this.negativeMemory)
      );
      console.log(this.positiveMemory, this.negativeMemory);
    },
    handleMplus() {
      if (!this.isFromEnter) {
        this.positiveMemory = String(Math.abs(parseFloat(this.numDisplay)));
      } else {
        this.positiveMemory = String(Math.abs(parseFloat(this.numCache)));
      }
      console.log(
        `positive memory is ${this.positiveMemory} enter ${this.isFromEnter}`
      );
      this.numDisplay = "";
      this.numCache = "";
      this.view = this.numDisplay;
      this.isFromEnter = false;
    },
    handleMminus() {
      if (!this.isFromEnter) {
        this.negativeMemory = String(-Math.abs(parseFloat(this.numDisplay)));
      } else {
        this.negativeMemory = String(-Math.abs(parseFloat(this.numCache)));
      }
      console.log(`negative memory is ${this.negativeMemory}`);
      this.numDisplay = "";
      this.numCache = "";
      this.view = this.numDisplay;
      this.isFromEnter = false;
    },
    handlePressNum(input: InputType) {
      const handleUnexpectedInputs: Record<
        InputType,
        (prev: string) => string
      > = {
        ".": (prev) => {
          if (prev.includes(".")) {
            return prev;
          } else {
            return `${prev}.`;
          }
        },
        "00": (prev) => {
          if (prev === "0" || prev === "00") {
            return "0";
          } else {
            return `${prev}00`;
          }
        },
        "0": (prev) => {
          if (prev === "0" || prev === "00") {
            return "0";
          } else {
            return `${prev}0`;
          }
        },
      };
      if (typeof input === "number") {
        this.numDisplay = `${this.numDisplay}${input}`;
      } else {
        console.log(handleUnexpectedInputs[input]("hi"));
        this.numDisplay = handleUnexpectedInputs[input](this.numDisplay);
      }
      this.view = this.numDisplay;
      console.log(
        "op : ",
        this.op,
        "numDisplay : ",
        this.numDisplay,
        "numCache : ",
        this.numCache
      );
    },
    handlePressOp(op: Operator) {
      if (this.numDisplay) {
        //operation만 여러번 눌렀을 때 대비
        if (!this.numCache) {
          // 이전 결과값이 없으면
          this.numCache = this.numDisplay;
        } else if (this.isFromEnter) {
          // 이전값이 넘어온 경로가 pressEnter이면
          console.log("pass");
        } else {
          // 이전값이 넘어온 경로가 handlePressOp이면
          this.numCache = String(
            calcFuncs[op](
              parseFloat(this.numCache),
              parseFloat(this.numDisplay)
            )
          );
        }
        this.view = this.numCache;
        this.numDisplay = "";
      }
      this.op = op;
      this.isFromEnter = false;
    },
    handlePressEnter() {
      if (!this.numDisplay) {
        // 3+ = = = 처리
        this.numDisplay = this.numCache;
      }
      if (this.op) {
        this.numCache = String(
          calcFuncs[this.op](
            parseFloat(this.numCache),
            parseFloat(this.numDisplay)
          )
        );
      } else {
        throw "";
      }
      this.isFromEnter = true;
      this.view = this.numCache;
      console.log(
        "op : ",
        this.op,
        "numDisplay : ",
        this.numDisplay,
        "numCache : ",
        this.numCache
      );
    },
    handlePressNegate() {
      if (this.isFromEnter) {
        // 3+3=6 에서 negate(6) 을 처리할 경우
        this.numCache = String(-parseFloat(this.numCache));
        this.view = this.numCache;
      } else {
        if (this.numDisplay) {
          //negate(3)=-3
          this.numDisplay = String(-parseFloat(this.numDisplay));
        } else {
          // 5 + negate() -> 5+negate(5)=0
          this.numDisplay = String(-parseFloat(this.numCache));
        }
        this.view = this.numDisplay;
      }
      console.log(
        "op : ",
        this.op,
        "numDisplay : ",
        this.numDisplay,
        "numCache : ",
        this.numCache
      );
    },
    handlepressAC() {
      this.numCache = "";
      this.numDisplay = "";
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