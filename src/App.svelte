<script>
  import Navbar from "./Navbar.svelte";
  import Header from "./Header.svelte";
  import Login from "./Login.svelte";
  import List from "./List.svelte";
  import Menu from "./Menu.svelte";
  import Footer from "./Footer.svelte";
  import { timeRange, token, tokenExpired } from "./stores.js";
    import GenreList from "./GenreList.svelte";

  const uppers = ["uk", "r&b", "nyc", "la", "dfw", "atl"];
  const lowers = ["and"];

  let genreMap = new Map()

  function titleCase(arr) {
    // Max number of genres allowed in string is 5 so it doesn't get crowded
    if (arr.length == 0) {
      return "Unknown";
    } else {
      const shortenedArr = arr.slice(0, 5);
      return shortenedArr.reduce((str, genre) => {
        const arrGenre = genre.split(" ");

        let fixedGenre = arrGenre
          .map((word) => {
            if (uppers.includes(word)) {
              return word.toUpperCase();
            } else if (lowers.includes(word)) {
              return word;
            } else {
              const firstLetter = word[0].toUpperCase();
              const remaining = word.slice(1);
              return firstLetter + remaining;
            }
          })
          .join(" ");
        if (str === "") {
          genreMap.set(fixedGenre, (genreMap.get(fixedGenre)) ? (genreMap.get(fixedGenre) + 1) : 1)
          return fixedGenre;
        } else {
          return str + ", " + fixedGenre;
        }
      }, "");
    }
  }

  const artistMap = (item) => {
    return {
      name: item.name,
      art: item.images[1].url,
      info: "Genres: " + titleCase(item.genres),
      link: item.external_urls.spotify,
    };
  };

  const tracksMap = (item) => {
    return {
      name: item.name,
      art: item.album.images[1].url,
      info: `Artist: ${item.artists[0].name}\nAlbum: ${item.album.name}`,
      link: item.external_urls.spotify,
    };
  };

  const clearGenreMap = () => {
    genreMap.clear()
  }
</script>

<main>
  <Navbar />
  <Header />
  <Login />

  <!-- Don't really need to re-render the Menu but Key block has to be
     outside of if block for some reason -->
  {#key $timeRange}
    {#if $token && !$tokenExpired}
      <Menu />
      <GenreList genreMap={genreMap} />
      <List collectionType="artists" collectionMap={artistMap} on:change={clearGenreMap()} />
      <List collectionType="tracks" collectionMap={tracksMap} />
    {/if}
  {/key}

  <Footer />
</main>

<!-- <Footer /> -->
<style>
  main {
    text-align: center;
  }
</style>
