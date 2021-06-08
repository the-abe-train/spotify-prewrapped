<script>
  import { timeRange } from "./stores.js";
  let iw = window.innerWidth;
  function handleResize() {
    iw = innerWidth;
  }
</script>

<svelte:window on:resize={handleResize} />

<div class="timeframe-menu">
  <form action="">
    <label class="form-label" for="time_frames">Select a time frame:</label>
    {#if iw >= 480}
      <div class="radio-toolbar">
        <input
          id="short_term"
          type="radio"
          name="time_frames"
          value="short_term"
          bind:group={$timeRange}
        />
        <label for="short_term">Short</label>
        <input
          id="medium_term"
          type="radio"
          name="time_frames"
          value="medium_term"
          bind:group={$timeRange}
        />
        <label for="medium_term">Medium</label>
        <input
          id="long_term"
          type="radio"
          name="time_frames"
          value="long_term"
          bind:group={$timeRange}
        />
        <label for="long_term">Long</label>
      </div>
    {:else}
      <select id="time_frames" name="time_frames" bind:value={$timeRange}>
        <option value="short_term">Short</option>
        <option value="medium_term">Medium</option>
        <option value="long_term">Long</option>
      </select>
    {/if}
  </form>

  {#if $timeRange == "short_term"}
    <p class="timeframe-description">
      Most played artists and tracks from approximately the last 4 weeks.
    </p>
  {:else if $timeRange == "medium_term"}
    <p class="timeframe-description">
      Most played artists and tracks from approximately the last 6 months.
    </p>
  {:else if $timeRange == "long_term"}
    <p class="timeframe-description">
      Most played artists and tracks from the last several years.
    </p>
  {/if}
</div>

<style>
  .timeframe-menu {
    background-color: var(--dark-2);
    color: var(--light-2);
    border-radius: 2rem;
    font-size: 1.25rem;
    margin: 1.5rem auto;
    width: clamp(1rem, 85%, 45rem);
    border-style: solid;
    border-color: var(--light-2);
    border-radius: 2rem;
    border-width: 0.1rem;
  }

  .timeframe-description {
    padding: 1.5rem;
    margin: 0;
  }

  option {
    background-color: var(--dark-2);
    color: var(--light-2);
  }

  .form-label {
    padding-top: 1rem;
    padding-bottom: 0.5rem;
    /* font-size: 1.5rem; */
  }

  .radio-toolbar {
    margin: 0.5rem;
  }

  .radio-toolbar input[type="radio"] {
    opacity: 0;
    position: fixed;
    width: 0;
  }

  .radio-toolbar label {
    cursor: pointer;
    display: inline-block;
    background-color: var(--dark-2);
    padding: 1rem 2rem;
    margin: 0.5rem 0.75rem;
    border: 0.15rem solid var(--light-2);
    border-radius: 1rem;
  }

  .radio-toolbar label:hover {
    background-color: var(--light-2);
    color: var(--dark-2);
  }

  .radio-toolbar input[type="radio"]:checked + label {
    background-color: var(--light-2);
    color: var(--dark-2);
  }

  select {
    color: var(--light-2);
    background-color: var(--dark-2);
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 1rem;
    border-color: var(--light-2);
    border-width: 0.15rem;
    font-size: 1.25rem;
  }

  select:focus {
    outline: none;
  }
</style>
