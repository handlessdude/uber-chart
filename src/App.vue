<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { CONSTANTS, drawLine, toDrawablePoint, type Point } from '@/utils/Drawings';

const myFuncs = [
  (x: number) => x * x,
  (x: number) => Math.sin(x),
]

const n: Ref<number> = ref(1000);
const a: Ref<number> = ref(-1);
const b: Ref<number> = ref(10);

function drawChart(a: number, b: number, n: number, fn: Function) {

  console.log(a, b, n, fn);

  const canv = document.getElementById('canv-chart') as HTMLCanvasElement;
  canv.height = CONSTANTS.WINDOW_SIZE;
  canv.width = CONSTANTS.WINDOW_SIZE;
  const ctx = canv.getContext('2d') as CanvasRenderingContext2D;

  let x: number = a;
  let y: number = fn(a);
  let p_old: Point = { x, y }

  const h: number = Math.abs(b - a) / n;


  const pointsArr: Array<Point> = []
  pointsArr.push(p_old);
  let min = p_old.y;
  let max = p_old.y;

  for (let i = a + h; i <= b; i += h) {

    x = i;
    y = fn(x);

    const p_new: Point = { x, y }
    pointsArr.push(p_new);
    max = Math.max(max, p_new.y);
    min = Math.min(min, p_new.y);

    p_old = p_new;
  }

  const scale_y = CONSTANTS.WINDOW_SIZE / (max - min);
  const scale_x = CONSTANTS.WINDOW_SIZE / (b - a);

  /*axis*/

  //0x
  const p1: Point = { x: 0, y: canv.height + min * scale_y }
  const p2: Point = { x: canv.width, y: canv.height + min * scale_y }
  drawLine(p1, p2, "rgb(74,74,74)", 1, ctx);

  //0y
  const p3: Point = { x: canv.width - b * scale_x, y: 0 }
  const p4: Point = { x: canv.width - b * scale_x, y: canv.height }
  drawLine(p3, p4, "rgb(74,74,74)", 1, ctx);

  /*chart*/
  pointsArr.forEach((p, ind, arr) => {
    if (ind === 0) return;
    const x0_scaled = CONSTANTS.WINDOW_SIZE + (arr[ind - 1].x - b) * scale_x
    const y0_scaled = CONSTANTS.WINDOW_SIZE - (arr[ind - 1].y - min) * scale_y

    const x1_scaled = CONSTANTS.WINDOW_SIZE + (p.x - b) * scale_x
    const y1_scaled = CONSTANTS.WINDOW_SIZE - (p.y - min) * scale_y

    drawLine({ x: x0_scaled, y: y0_scaled }, { x: x1_scaled, y: y1_scaled }, "aqua", 1, ctx);
  });
  console.log(min, max, pointsArr);
  ctx.restore();
}
</script>

<template>
  <div id="page">
    <main>
      <canvas id="canv-chart" class="greyish-block"></canvas>
    </main>

    <header class="greyish-block">
      Enter number of intervals:
      <input class="n-input" id="number-input" type="number" min="10" v-model="n">

      Enter number of intervals:
      <div class="borders-info">
        <div class="letter">a</div>
        <input class="border-input" id="number-input" type="number" v-model="a">
      </div>
      <div class="borders-info">
        <div class="letter">b</div>
        <input class=" border-input" id="number-input" type="number" v-model="b">
      </div>

      Draw the chart:
      <button class="btn" id="sqr-btn" @click="drawChart(a, b, n, myFuncs[0])">x&#178;</button>
      <button class="btn" id="sin-btn" @click="drawChart(a, b, n, myFuncs[1])">sin(x)</button>
    </header>

  </div>


</template>

<style lang="scss" scoped>
#page {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

#canv-chart {
  width: var(--window-size);
  height: var(--window-size);
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: var(--window-size);
}

.greyish-block {
  background-color: var(--color-background-soft);
  border: 3px solid var(--color-background-mute);
  border-radius: 10px;

  .btn,
  .n-input {
    width: 10rem;
  }

  .border-input {
    width: calc(10rem - 20px);
  }
}

.roundish-block {
  font-size: 1rem;
  border-radius: 50px;
  border: none;
  margin-bottom: 15px;
  font-family: "Comfortaa";
  padding: 5px;
}

.borders-info {
  display: flex;
  justify-content: center;
  font-family: "Comfortaa";

  .letter {
    width: 20px;
    display: flex;
    flex-direction: column;
  }
}

.btn {
  @extend .roundish-block;
  background-color: rgb(0, 205, 205);
  color: rgb(33, 33, 33);
}

.btn-active {
  background-color: rgb(0, 255, 255);
  color: rgb(0, 0, 0);
}

.btn:hover {
  @extend .btn-active;
  cursor: pointer;
}

#number-input {
  @extend .roundish-block;
  padding-left: 10px;
}
</style>
