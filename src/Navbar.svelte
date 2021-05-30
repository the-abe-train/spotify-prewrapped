<script>
  import { onMount } from "svelte";
  import { token, tokenExpired } from "./stores.js";
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
    if (!isWelcomeBtn && !isWelcomeMenu) {
      expanded = false;
    }
  }
</script>

<svelte:window on:click={collapse} />

{#if user}
  <nav class="nav-area">
    <button class="welcome-btn" on:click={collapseExpand}>
      Welcome, {user.display_name.split(" ")[0]}!
    </button>
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
          href="https://github.com/the-abe-train"
          target="_blank"
          rel="noopener noreferrer"
          transition:slide
          ><i class="fab fa-github" /><span class="welcome-option"
            >Meet the Developer</span
          ></a
        >
        <a href="https://spotify-prewrapped.vercel.app/" transition:slide>
          <i class="fas fa-sign-out-alt" />
          <span class="welcome-option">Logout</span>
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
  }

  .welcome-btn {
    padding: 12px 16px;
    margin: 1rem 1rem 0 1rem;
    border-radius: 1rem;
  }

  .welcome-menu {
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    width: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 0.75rem;
  }

  .welcome-menu a {
    color: black;
    padding: 12px 16px;
    margin: 0.75rem 1rem 0 1rem;
    text-decoration: none;
    text-align: left;
    border-style: solid;
    border-radius: 1rem;
    border-width: 1px;
  }

  .welcome-option {
    margin-left: 0.5rem;
  }
</style>
