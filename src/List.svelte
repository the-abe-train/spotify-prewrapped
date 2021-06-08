<script>
  import { onMount } from "svelte";
  import { slide, fly } from "svelte/transition";
  import { token, timeRange, tokenExpired } from "./stores.js";

  export let collectionType, collectionMap;

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
        console.log(data);
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

  // transition stuf
  let show = false;
  let showMore = false;

  function toggle() {
    show ? (showMore = false) : (show = true);
  }
</script>

<div class="items-container">
  <button class="expand-btn" on:click={collapse}>
    <span class="expand-btn-name">{caps(collectionType)}</span>
    {#if !expanded}
      <span class="expand-btn-icon">+</span>
    {:else}
      <span class="expand-btn-icon">-</span>
    {/if}
  </button>

  {#if collection && expanded}
    {#each collection as { name, art, info, link }, i}
      <div class="list-container" transition:slide>
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
    margin-top: 1em;
    border-style: solid;
  }

  .expand-btn-icon {
    float: right;
    padding-bottom: 0.2rem;
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
    margin: 0.25rem;
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
    /* height: clamp(8rem, 100%, 10rem); */
    /* height: 100%; */
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    justify-content: space-evenly;
    /* flex: 2; */
  }

  .item-name {
    margin: 0;
    /* flex: 0; */
  }

  .item-info {
    font-size: 1.2rem;
    margin: 1.5rem 0;
    /* flex: 0; */
  }

  /* .img-link {
    flex: 1;
  } */

  .item-img {
    border-radius: 10px;
    width: clamp(1rem, 100%, 10rem);
    float: right;
    margin: 0 1rem;
    position: relative;
    /* flex: 1; */
  }

  /* Phone media query */
  @media (max-width: 670px) {
    .item-container {
      flex-direction: column;
      align-items: center;
      /* width: 100%; */
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
      /* flex: 0; */
    }
  }
</style>
