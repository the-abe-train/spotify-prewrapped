<script>
  import { token, tokenExpired, appUrl } from "./stores.js";

  const client_id = "332ae898f9d84ac5a949c9dbe750474b"; // Your client id

  function generateRandomString(length) {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  const url = new URL("https://accounts.spotify.com/authorize?");
  const scope = "user-read-private user-read-email user-top-read";
  const state = generateRandomString(16);
  let rememberMe = true;
  $: params = new URLSearchParams({
    response_type: "token",
    show_dialog: !rememberMe,
    client_id,
    scope,
    redirect_uri: $appUrl,
    state,
  });
  $: loginLink = url + params;
</script>

<div id="login">
  {#if !$token}
    <a href={loginLink}>
      <button>Connect to Spotify</button>
    </a>
    <br />
    <label class="checkbox">
      <span style="padding:0.1rem">Remember me?</span>
      <input style="margin:0;" type="checkbox" bind:checked={rememberMe} />
    </label>
  {/if}
</div>

{#if $tokenExpired}
  <section>
    <p>Token expired! Please log out and log back in again.</p>
    <a href={$appUrl}>
      <button>Logout</button>
    </a>
  </section>
{/if}

<style>
  .checkbox {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    align-items: center;
  }

  .checkbox > span {
    /* color: #34495e; */
    /* padding: 0.5rem 0.25rem; */
    margin: 0 0.5rem 0 0;
  }

  .checkbox > input {
    height: 1em;
    width: 1em;
    -webkit-appearance: none;
    -moz-appearance: none;
    -o-appearance: none;
    appearance: none;
    border: 1px solid #34495e;
    border-radius: 4px;
    outline: none;
    transition-duration: 0.3s;
    background-color: #41b883;
    cursor: pointer;
  }

  .checkbox > input:checked {
    border: 1px solid #41b883;
    background-color: #34495e;
  }

  .checkbox > span::after + input:checked {
    content: "\2713";
    display: block;
    text-align: center;
    color: #41b883;
    position: absolute;
    left: 0.7rem;
    top: 0.2rem;
  }

  .checkbox > input:active {
    border: 2px solid #34495e;
  }
</style>
