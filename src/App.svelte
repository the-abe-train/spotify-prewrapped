<script>
  import Navbar from "./Navbar.svelte";
  import Header from "./Header.svelte";
  import Login from "./Login.svelte";
  import List from "./List.svelte";
  import Menu from "./Menu.svelte";
  import Footer from "./Footer.svelte";
  import { timeRange, token, tokenExpired } from "./stores.js";

  const uppers = ["uk", "r&b", "nyc"];
  const lowers = ["and"];

  function titleCase(arr) {
    // Max number of genres allowed in string is 5 so it doesn't get crowded
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
        return fixedGenre;
      } else {
        return str + ", " + fixedGenre;
      }
    }, "");
  }

  const artistMap = (item) => {
    return {
      name: item.name,
      art: item.images[2].url,
      info: "Genres: " + titleCase(item.genres),
      link: item.external_urls.spotify,
    };
  };

  const tracksMap = (item) => {
    return {
      name: item.name,
      art: item.album.images[0].url,
      info: `Artist: ${item.artists[0].name}\nAlbum: ${item.album.name}`,
      link: item.external_urls.spotify,
    };
  };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
</svelte:head>

<main>
  <Navbar />
  <!-- <Welcome /> -->
  <Header />
  <Login />
  <!-- <Test /> -->

  <!-- Don't really need to re-render the Menu but Key block has to be
     outside of if block for some reason -->
  {#key $timeRange}
    {#if $token && !$tokenExpired}
      <Menu />
      <List collectionType="artists" collectionMap={artistMap} />
      <List collectionType="tracks" collectionMap={tracksMap} />
    {/if}
  {/key}
</main>
<Footer />

<style>
  main {
    text-align: center;
  }

  /* @media (min-width: 640px) {
    main {
      max-width: none;
    }
  } */
</style>
