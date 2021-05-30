<script>
  import Navbar from "./Navbar.svelte";
  import Header from "./Header.svelte";
  import Login from "./Login.svelte";
  import Welcome from "./Welcome.svelte";
  import List from "./List.svelte";
  import Menu from "./Menu.svelte";
  import Test from "./Test.svelte";
  import { timeRange, token, tokenExpired } from "./stores.js";

  function titleCase(arr) {
    return arr.reduce((str, genre) => {
      const arrGenre = genre.split(" ");

      let fixedGenre = arrGenre
        .map((word) => {
          if (word === "uk") {
            return "UK";
          } else if (word === "and") {
            return "and";
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
      info: titleCase(item.genres),
      link: item.external_urls.spotify,
    };
  };

  const tracksMap = (item) => {
    return {
      name: item.name,
      art: item.album.images[2].url,
      info: item.artists[0].name,
      link: item.external_urls.spotify,
    };
  };
</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<Navbar />
<main>
  
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

<div id="filler" />

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  #filler {
    height: 100vh;
  }
</style>
