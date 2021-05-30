import { readable, writable } from 'svelte/store';

export const token = readable(null, function start(set) {
  const hashParams = {};
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  let e;
  while (e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  const access_token = hashParams.access_token;
  set(access_token);

  // Reset URL so the token can't be seen in it.
  window.history.pushState("object or string", "Title", "/");

})

export const timeRange = writable('long_term');

export const tokenExpired = writable(false);