<script>
  import { afterUpdate, onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { sineInOut } from "svelte/easing";
  import { token, timeRange, limit, tokenExpired } from "./stores.js";
  

  export let genreMap;

  const genreArr = [...genreMap.entries()].sort((a, b) => b[1] - a[1])

  console.log('genreArr:', genreArr)

  // Collapsable menu
  let expanded = false;
  function collapse() {
    expanded = !expanded;
  }

  // Rotate list expand/collapse icon
  let fullPath = true;
  afterUpdate(() => (fullPath = false));
  const duration = 750;
  function rotate(node, { delay = 0, duration }) {
    return {
      delay,
      duration,
      css: (t, u) => {
        const eased = sineInOut(u);
        const path = fullPath ? 360 : 180;
        return `transform: scale(1.25) rotate(${eased * path}deg);`;
      },
    };
  }
</script>

<div class="items-container" >
  <button
    class={!expanded ? "expand-btn" : "expand-btn highlight"}
    on:click={collapse}
  >
    <div class="placeholder" />
    {'Genres'}
    {#if !expanded}
      <div class="expand-btn-icon" in:rotate={{ duration }} />
    {:else}
      <div class="collapse-btn-icon" in:rotate={{ duration }} />
    {/if}
  </button>

  {#if genreArr && expanded}
    {#each genreArr as genre}
      <div class="list-container" transition:slide={{ duration }}>
        <div class="item-container">
          <div class="item-details">
            <h2 class="item-name">{genre[0]}</h2>
            <p class="item-info" style="white-space: pre-line">{`Occurrences: ${genre[1]}`}</p>
          </div>
        </div>
      </div>
    {/each}
  {/if}
</div>

<style>
  .expand-btn {
    width: clamp(20rem, 70%, 45rem);
    font-size: 2rem;
    font-weight: 500;
    margin: 3rem auto 0.25rem auto;
    border-style: solid;
  }

  .expand-btn-icon,
  .collapse-btn-icon,
  .placeholder {
    float: right;
    padding: 0.25rem;
    margin: auto 0;
    font-size: 1.5rem;
    font-weight: lighter;
    transform: scale(1.25);
  }
  .placeholder {
    float: left;
  }

  .expand-btn-icon::after {
    content: "\2228";
  }

  .collapse-btn-icon::after {
    content: "\2227";
  }

  .placeholder::after {
    content: "\2227";
    color: var(--dark-1);
  }
  button:hover .placeholder::after {
    color: var(--light-1);
  }
  .highlight .placeholder {
    color: var(--light-1);
  }

  .highlight .placeholder::after {
    color: var(--light-1);
  }
  .list-container {
    margin-left: auto;
    margin-right: auto;
    width: clamp(20rem, 70%, 40rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .item-container {
    background: var(--dark-2);
    padding: 1rem;
    margin: 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: clamp(8rem, auto, 10rem);
    border-style: solid;
    border-color: var(--light-2);
    border-radius: 2rem;
    border-width: 0.1rem;
  }

  .item-details {
    color: var(--light-2);
    text-align: left;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    justify-content: space-evenly;
  }

  .item-name {
    margin: 0;
  }

  .item-info {
    font-size: 1.2rem;
    margin: 1.5rem 0;
  }

  .item-img {
    border-radius: 10px;
    width: clamp(1rem, 100%, 10rem);
    float: right;
    margin: 0 1rem;
    position: relative;
  }

  /* Phone media query */
  @media (max-width: 670px) {
    .expand-btn {
      width: clamp(20rem, 70%, 45rem);
      margin: 2rem auto 0.25rem auto;
    }
    .item-container {
      flex-direction: column;
      align-items: center;
    }
    .item-details {
      display: flex;
      width: 100%;
      height: 100%;
      text-align: center;
      margin: auto;
      padding: 0;
    }
    .item-img {
      margin: 0;
      float: none;
    }
    .item-info {
      font-size: 1.2rem;
      margin: 1rem 0 2rem 0;
    }
  }
</style>
