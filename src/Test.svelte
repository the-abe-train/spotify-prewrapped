<script>
  import { slide } from "svelte/transition";

  let expanded = false;
  const items = ["item 1", "item 2", "item 7", "item 2 again"];

  function collapse() {
    expanded = !expanded;
  }
</script>

<br />
<div>
  <button on:click={collapse} class="expand-btn">Collapse/Expand</button>
  {#if expanded}
    <ol class="expand-container" transition:slide>
      {#each items as item}
        <li class="expand-content">{item}</li>
      {/each}
    </ol>
  {/if}
</div>

<style>
  .expand-container {
    background-color: pink;
  }

</style>
