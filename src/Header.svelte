<script>
  import { token } from "./stores.js";
  let iw = window.innerWidth;
  function handleResize() {
    iw = innerWidth;
  }
</script>

<svelte:window on:resize={handleResize} />

<div id="header">
  <div id="title">
    <img id="title-img" src="images/spotify-logo.png" alt="Spotify logo" />
    {#if iw >= 768}
      <h1 id="title-text">Spotify Prewrapped</h1>
    {:else}
      <h1 id="title-text">Spotify <br /> Prewrapped</h1>
    {/if}
  </div>
  {#if !$token}
    <span id="subtitle">
      Ever wondered what it would be like to know what your top artists and
      tracks are before the end of the year? Connect to Spotify below and find
      out!
    </span>
  {/if}
</div>

<style>
  #header {
    margin-top: 3rem;
    clear: both;
    position: relative;
  }
  #title {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #title-text {
    color: var(--light-1);
    font-size: 3.5em;
    margin-bottom: 2rem;
  }
  #title-img {
    width: 100px;
    height: 100px;
    padding-right: 10px;
  }
  #subtitle {
    display: block;
    width: clamp(1rem, 85%, 45rem);
    margin: auto;
    margin-top: 1.5rem;
    padding: 1rem;
    font-size: 1.2rem;
    color: var(--light-2);
    background-color: var(--dark-2);
    border-style: solid;
    border-color: var(--light-2);
    border-radius: 2rem;
    border-width: 0.1rem;
  }

  /* Tablet media query */
  @media (max-width: 768px) and (min-width: 481px) {
    #header {
      margin: 4rem auto 0 auto;
    }
    #title-text {
      font-size: 3.5rem;
    }
    #subtitle {
      width: 25rem;
      margin: 1.1rem auto;
    }
  }

  /* Phone media query */
  @media (max-width: 480px) {
    #title {
      margin: 2.5rem auto 0 auto;
    }
    #title-text {
      font-size: 2.5em;
      margin: 1rem;
    }
    #subtitle {
      width: 80%;
      font-size: 1rem;
      margin: 1.1rem auto;
    }
    #title-img {
      padding: 0;
    }
  }
</style>
