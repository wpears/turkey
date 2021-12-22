<script>
  import Food from './lib/Food.svelte'
  import SectionWrapper from './lib/SectionWrapper.svelte'
  import Input from './lib/Input.svelte'
  import { getElapsedTime, getEndTime } from './lib/utils.js'

  //Formula: T = Ta - Ce^(-kt)

  //Initial conditions
  let ovenTemp = 325
  let targetTemp = 165
  let startTemp = 37
  let startTime = undefined

  //Measurement
  let measuredTemp = undefined
  let measuredTime = undefined

  //Derived constants
  $: C = targetTemp > startTemp && ovenTemp - startTemp
  $: k = C && C > 0 && measuredTemp > startTemp && Math.log((ovenTemp - measuredTemp ) / C) / -getElapsedTime(measuredTime, startTime)
  $: total = k && Math.log((ovenTemp - targetTemp) / C) / -k

  $: endTime = getEndTime(startTime, total)
  $: console.log(C, k, total, endTime)
</script>

<main class="h-screen bg-gradient-to-br from-red-500 to-orange-400">
  <div class="max-w-4xl container mx-auto flex flex-col content-center p-6
    space-y-6 h-screen">
    <h1 class="text-4xl lg:text-6xl text-center">How much time left on my <Food/></h1>
    <form class="max-w-xl px-6 mx-auto w-full">
      <SectionWrapper>
        <h2 class="text-xl mb-3">Initial conditions</h2>
        <Input bind:value={ovenTemp} type="number" placeholder="°F" label="Oven temperature"/>
        <Input bind:value={targetTemp} type="number" placeholder="°F" label="Target temperature"/>
        <Input bind:value={startTemp} type="number" placeholder="°F" label="Starting food temperature"/>
        <Input bind:value={startTime} placeholder="hh:mm" label="Time you put the food in"/>
      </SectionWrapper>
      <SectionWrapper>
        <h2 class="text-xl mb-3">Measurement</h2>
        <Input bind:value={measuredTemp} placeholder="°F" type="number" label="Measured temperature"/>
        <Input bind:value={measuredTime} placeholder="hh:mm" label="Time of measurement"/>
      </SectionWrapper>
      <div class="wrap">
        <div class:rotate-in={endTime} class="relative">
            <section
             class="rotating w-full p-6 mb-8 shadow-md
              bg-gradient-to-br from-orange-100 to-red-100">
              <p class="text-center">Awaiting all input</p>
            </section>
          <section
            class="rotated rotating w-full p-6 mb-8 shadow-md bg-indigo-500
            text-orange-100">
            {#if endTime}
            <p class="text-center">Take your food out at 
            <span class="text-3xl align-sub ml-0.5">{endTime}</span>.</p>
            {/if}
          </section>
        </div>
      </div>
    </form>
  </div>
</main>

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  :root {
    font-family: 'Helvetica';
    font-weight: 200;
  }
  .rotating {
    height:84px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateZ(42px);
    position: absolute;
  }
  .rotated {
    transform: rotateX(-90deg) translateZ(42px) ;
  }
  .wrap {
    perspective: 5000px;
  }
  .wrap > div {
    height: 84px;
    transform-style: preserve-3d;
    transition: transform 0.3s ease-in;
    transform: rotate3d(1, 0, 0, 0deg);
  }
  div.rotate-in {
    transform: rotate3d(1, 0, 0, 90deg);
  }
</style>
