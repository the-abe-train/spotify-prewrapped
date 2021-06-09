<script>
  import { afterUpdate, onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { sineInOut } from "svelte/easing";
  import { token, timeRange, tokenExpired } from "./stores.js";

  export let collectionType, collectionMap;

  // Fetch collection data (artists and tracks)
  let collection;
  async function getCollection() {
    const accessToken = $token;

    const url = new URL(`https://api.spotify.com/v1/me/top/${collectionType}?`);
    const params = new URLSearchParams({
      time_range: $timeRange,
      limit: 10,
      offset: 0,
    });

    if (accessToken) {
      const res = await fetch(url + params, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      if (res.ok) {
        const data = await res.json();
        collection = data.items.map(collectionMap);
      } else {
        tokenExpired.set(true);
      }
    }
  }

  onMount(getCollection);

  function caps(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Collapsable menu
  let expanded = false;
  function collapse() {
    expanded = !expanded;
    this.classList.toggle("highlight");
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
        return `transform: rotate(${eased * path}deg);`;
      },
    };
  }
</script>

<div class="items-container">
  <button class="expand-btn" on:click={collapse}>
    {caps(collectionType)}
    {#if !expanded}
      <div class="expand-btn-icon" in:rotate={{ duration }} />
    {:else}
      <div class="collapse-btn-icon" in:rotate={{ duration }} />
    {/if}
  </button>

  {#if collection && expanded}
    {#each collection as { name, art, info, link }, i}
      <div class="list-container" transition:slide={{ duration }}>
        <div class="item-container">
          <div class="item-details">
            <h2 class="item-name">{i + 1}. {name}</h2>
            <p class="item-info" style="white-space: pre-line">{info}</p>
          </div>
          <a class="img-link" href={link}>
            <img class="item-img" src={art} alt={name} />
          </a>
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
    padding-left: 4.6rem;
  }

  .expand-btn-icon,
  .collapse-btn-icon {
    float: right;
    padding: 0.8rem;
    font-size: 1.4rem;
    font-weight: 1000;
  }

  .expand-btn-icon::after {
    content: "\2228";
  }

  .collapse-btn-icon::after {
    content: "\2227";
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
