<script>
  import { onDestroy } from 'svelte';
  import { fly } from 'svelte/transition'

  const foods = ['🦃','🎂','🍖','🍞']
  let curr = 0
  const int = setInterval(() => {
    curr++
    curr %= 4
  }, 3000)

  onDestroy(()=>clearInterval(int))
</script>

<div class='inline ml-2'>
  {#each foods as food}
    {#if food === foods[curr]}
      <span class="inline-block absolute" in:fly={{y:36}} out:fly={{y:-36}}>{food}</span>
    {/if}
  {/each}
</div>
