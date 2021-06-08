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
    show_dialog: !rememberMe, // Will show up on first sign-on regardless
    client_id,
    scope,
    redirect_uri: $appUrl,
    state,
  });
  $: loginLink = url + params;
  // $: console.log(process.env.NODE_ENV);
</script>

{#if !$token}
  <div id="login">
    <a href={loginLink}>
      <button>Connect to Spotify</button>
    </a>
    <br />
    <div id="checkbox-container">
      <label id="checkbox-text" for="remember-me">Remember me?</label>
      <input
        id="checkbox-box"
        name="remember-me"
        type="checkbox"
        bind:checked={rememberMe}
      />
    </div>
  </div>
{/if}

{#if $tokenExpired}
  <section>
    <p>Token expired! Please log out and log back in again.</p>
    <a href={$appUrl}>
      <button>Logout</button>
    </a>
  </section>
{/if}

<style>
  input {
    padding: 0;
    margin: 0;
  }

  #login {
    margin-top: 2.5rem;
  }

  #checkbox-container {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    align-items: center;
  }

  #checkbox-text {
    margin: 0 0.5rem 0 0;
  }

  #checkbox-box {
    overflow: hidden;
    height: 1em;
    width: 1em;
    margin-top: 0.15rem;
    border: 1px solid var(--light-1);
    outline: none;
    background-color: var(--dark-2);
    color: black;
    cursor: pointer;
    -webkit-appearance: initial;
    appearance: initial;
    position: relative;
  }

  #checkbox-box:checked:after {
    content: "\2714";
    padding: none;
    color: var(--light-1);
    position: absolute;
    left: 50%;
    top: 40%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
</style>
