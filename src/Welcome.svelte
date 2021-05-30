<script>
  import { onMount } from "svelte";
  import { token, tokenExpired } from "./stores.js";

  let user;

  async function getUserData() {
    const accessToken = $token;
    // const stateKey = "spotify_auth_state";
    // localStorage.removeItem(stateKey);
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
</script>

<div>
  {#if user}
    <p>Welcome, {user.display_name}!</p>
    <img src={user.images[0].url} alt="" />
  {/if}
</div>

<style>
  img {
    width: 30%;
    border-radius: 20px;
  }
</style>
