<script>
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
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
    <div class="list-container" transition:slide>
      {#each collection as { name, art, info, link }, i}
        <div class="item-info">
          <div class="item-text">
            <div class="item-details">
              <h2 id="item-name">{i + 1}. {name}</h2>
              <p style="white-space: pre-line">{info}</p>
            </div>
          </div>
          <a class="img-link" href={link}>
            <img class="item-img" src={art} alt={name} />
          </a>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .expand-btn {
    width: clamp(20rem, 70%, 40rem);
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

  .item-info {
    background: var(--dark-2);
    padding: 1rem;
    margin: 0.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 8rem;
    border-style: solid;
    border-radius: 50px;
  }

  .item-text {
    display: flex;
    text-align: left;
    width: 65%;
    height: 100%;
    margin: auto;
  }

  #item-name {
    margin: 0;
  }

  .item-details {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .img-link {
    width: auto;
    height: 100%;
    float: right;
  }

  .item-img {
    border-radius: 10px;
    width: auto;
    max-width: 80%;
    height: 100%;
    float: right;
    margin-right: 1rem;
    position: relative;
  }

  /* Phone media query */
  @media (max-width: 480px) {
    .item-info {
      flex-direction: column;
      align-items: center;
      /* width: 100%; */
    }
    .item-details {
      display: block;
      text-align: center;
      width: 100%;
      padding: 0;
    }
    .item-text {
      display: flex;
      text-align: left;
      width: 100%;
      height: 100%;
      margin: auto;
    }
    .item-img {
      margin: 0;
      float: none;
    }
  }
</style>
