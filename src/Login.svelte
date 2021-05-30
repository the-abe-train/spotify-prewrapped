<script>
  import { token, tokenExpired } from "./stores.js";

  const client_id = "332ae898f9d84ac5a949c9dbe750474b"; // Your client id
  const redirect_uri = "https://spotify-prewrapped.vercel.app/"; // Your redirect uri

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
    redirect_uri,
    state,
  });
  $: loginLink = url + params;
  let logoutLink = redirect_uri;
</script>

<div id="login">
  {#if !$token}
    <a href={loginLink}>
      <button>Connect to Spotify</button>
    </a>
    <br />
    <div id="remember-me">
      <span style="padding:0.1rem">Remember me?</span>
      <input style="margin:0;" type="checkbox" bind:checked={rememberMe} /> 
    </div>
  {/if}
</div>

{#if $tokenExpired}
  <section>
    <p>Token expired! Please log out and log back in again.</p>
  </section>
{/if}