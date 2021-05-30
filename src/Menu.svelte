<script>
  import { timeRange } from "./stores.js";
</script>

<form action="">
  <label for="time_frames">Choose a time frame:</label>
  <select id="time_frames" name="time_frames" bind:value={$timeRange}>
    <option value="short_term">Short</option>
    <option value="medium_term">Medium</option>
    <option value="long_term">Long</option>
  </select>
</form>
