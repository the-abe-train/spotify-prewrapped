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
    <img
      id="title-img"
      src="images/spotify-logo-png-7053.png"
      alt="Spotify logo"
    />
    {#if iw >= 820}
      <h1 id="title-text">Spotify Prewrapped</h1>
    {:else}
      <h1 id="title-text">Spotify <br /> Prewrapped</h1>
    {/if}
  </div>
  {#if !$token}
    <span id="subtitle">
      Ever wondered what it would be like to know what your top artists and
      tracks are before the end of the year? Log in below and find out!
    </span>
  {/if}
</div>

<style>
  #header {
    margin: 3rem 3.5rem 0rem 3.5rem;
    clear: both;
    position: relative;
  }
  #title {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #title-text {
    color: #1ed760;
    font-size: 3.5em;
    font-weight: 1000;
    margin-bottom: 2rem;
  }
  #title-img {
    width: 100px;
    height: 100px;
    padding-right: 10px;
  }
  #subtitle {
    display: block;
    max-width: 70%;
    margin: auto;
    margin-top: 0.5rem;
    background-color: #282e2b;
    padding: 1rem;
    border-radius: 1rem;
    color: #7bcf99;
  }
</style>
