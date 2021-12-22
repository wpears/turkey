<script>
  import { normalizeTime } from './utils.js'
  export let value
  export let label
  export let type='text'
  export let placeholder=''
  const classes = 'block w-full px-3 py-2 border border-gray-300 ' +
  'rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none ' +
  'focus:border-orange-400 focus:ring-1 focus:ring-orange-400 ' +
  'invalid:border-red-700 invalid:text-red-700 group-hover:border-gray-400'

  function formatTime(e){
    value = normalizeTime(e.target.value)
  }
  
</script>
<label class="block group mb-3">
  <span class="block text-sm font-medium text-gray-700">{label}</span>
  {#if type === 'number'}
    <input type="number" placeholder={placeholder} bind:value class={classes}/>
  {:else} 
    <input type="text" on:focusout={formatTime} placeholder={placeholder} bind:value class={classes}/>
  {/if}
</label>
