<script>
  import { onMount } from "svelte";
  import { token, tokenExpired, appUrl } from "./stores.js";
  import { slide } from "svelte/transition";

  let user;

  async function getUserData() {
    const accessToken = $token;
    if (accessToken) {
      const res = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        user = data;
      } else {
        tokenExpired.set(true);
      }
    }
  }

  onMount(getUserData);

  // Collapse/exapnd menu
  let expanded = false;
  function collapseExpand() {
    expanded = !expanded;
  }

  function collapse(e) {
    const classNodes = e.target.classList;
    const classArr = [...classNodes];
    const isWelcomeBtn = classArr.indexOf("welcome-btn") >= 0;
    const isWelcomeMenu = classArr.indexOf("welcome-menu") >= 0;
    const isWelcomeBurger = classArr.indexOf("welcome-burger") >= 0;
    if (!isWelcomeBtn && !isWelcomeMenu && !isWelcomeBurger) {
      expanded = false;
    }
  }
  let iw = window.innerWidth;
  function handleResize() {
    iw = innerWidth;
  }
</script>

<svelte:window on:click={collapse} on:resize={handleResize} />

{#if user}
  <nav class="nav-area">
    {#if iw >= 480}
      <button class="welcome-btn" on:click={collapseExpand}>
        Welcome, {user.display_name.split(" ")[0]}!
      </button>
    {:else}
      <button class="welcome-burger" on:click={collapseExpand}>
        <div class="welcome-bar bar1" />
        <div class="welcome-bar bar2" />
        <div class="welcome-bar bar3" />
      </button>
    {/if}
    {#if expanded}
      <div class="welcome-menu">
        <a
          href="https://open.spotify.com/"
          target="_blank"
          rel="noopener noreferrer"
          transition:slide
          ><i class="fab fa-spotify" /><span class="welcome-option"
            >Visit Spotify</span
          ></a
        >
        <a
          href="https://github.com/the-abe-train/spotify-prewrapped"
          target="_blank"
          rel="noopener noreferrer"
          transition:slide
          ><i class="fab fa-github" /><span class="welcome-option"
            >Check out the code</span
          ></a
        >
        <a href={$appUrl} transition:slide>
          <i class="fas fa-sign-out-alt" />
          <span class="welcome-option">Disconnect</span>
        </a>
      </div>
    {/if}
  </nav>
{/if}

<style>
  .nav-area {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    width: 15rem;
    padding: 1rem;
  }

  .welcome-btn {
    /* padding: 0.35rem 0.8rem 0.35rem 0.8rem; */
    padding: 0;
    /* margin: 1.5rem 1rem .25rem 1rem; */
    width: auto;
    border-radius: 1rem;
    font-size: 1.25rem;
    height: 3rem;
  }

  .welcome-burger {
    display: inline-block;
    cursor: pointer;
    align-self: flex-end;
    z-index: 1;
    padding: 0.5rem;
    margin: 0.1rem;
    border: none;
  }

  .welcome-burger:hover {
    background-color: var(--dark-1);
    color: var(--light-1);
  }

  .welcome-bar {
    width: 35px;
    height: 3px;
    background-color: var(--light-1);
    margin: 6px 0;
    transition: 0.4s;
    /* float: right; */
  }

  .welcome-burger > * {
    pointer-events: none;
  }


  .welcome-menu {
    background-color: var(--dark-1);
    /* box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); */
    width: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
  }

  .welcome-menu a {
    color: var(--light-2);
    background-color: var(--dark-2);
    padding: 0.75em;
    margin: 0.25rem .25rem;
    text-decoration: none;
    text-align: left;
    border-style: solid;
    border-radius: 1rem;
    border-width: 0.12em;
  }

  .welcome-option {
    margin-left: 0.5rem;
  }
</style>
