<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  export const load: Load = async ({ page }) => ({
    props: { categoryQuery: parseInt(page.query.get("category")) || 0 },
  });
</script>

<script lang="ts">
  import Category from "$lib/components/Category.svelte";
  import Achievement from "$lib/components/Achievements.svelte";

  import categories from "$lib/achievements/0.json";
  import * as achievements from "$lib/achievements";
  import { completed } from "$lib/achievements/store";

  export let categoryQuery: number;

  let filterText = "";
  let filteredList: AchievementTypes[] = [];
  $: filteredList = (<AchievementTypes[]>(achievements[`Category${categoryQuery}`] || [])).filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const getCount = (collection: CollectionNumberTypes) => {
    if (!collection) return 0;
    return Object.values(collection).reduce((prev, val) => prev + val, 0);
  };

  const getTotal = (id: number) => {
    let list = <AchievementTypes[]>(achievements[`Category${id}`] || []);
    return list.reduce((res, val) => (val.variant === null ? res + 1 : res + val.variant.length), 0);
  };
</script>

<svelte:head>
  <title>Achievement</title>
</svelte:head>

<div class={categoryQuery === 0 ? "max-w-4xl mx-auto" : "max-w-5xl mx-auto grid grid-cols-3"}>
  <aside class={categoryQuery === 0 ? "flex flex-wrap justify-evenly" : "max-w-xl mx-auto hidden md:block"}>
    {#each categories as category}
      <Category
        {category}
        active={categoryQuery !== 0}
        completed={getCount($completed[category.id])}
        total={getTotal(category.id)}
      />
    {/each}
  </aside>

  {#if categoryQuery}
    <section class={categoryQuery === 0 ? "" : "col-span-2"}>
      <div class="sticky top-0 mx-3 mb-2 px-5 py-2 bg-white grid grid-cols-2 shadow-lg">
        <h2 class="text-3xl font-bold col-span-2">
          {categories.find((category) => category.id === categoryQuery).name}
        </h2>
        <input class="rounded" bind:value={filterText} type="search" placeholder="Filter achievements" />
        <button on:click={() => completed.reset()}>Reset</button>
      </div>

      {#each filteredList as achievement}
        <Achievement category={categoryQuery} {achievement} />
      {/each}
    </section>
  {/if}
</div>

<!-- <style>
  .container.open aside {
    display: none;
    height: 100vh;
    position: sticky;
    top: 0;
    overflow-y: scroll;
  }

  .container:not(.open) aside {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  @media (min-width: 620px) {
    .container.open {
      display: grid;
      grid-template-columns: min(40%, 360px) auto;
    }

    .container.open aside {
      display: block;
    }
  }

  .banner {
    padding: 16px 32px;
    display: grid;
    grid-template-columns: auto min-content;
    position: sticky;
    top: 0;
    background-color: var(--bg-color);
  }

  h2 {
    color: var(--theme-color);
    font-family: "Merienda", cursive;
    grid-column: 1 / span 2;
  }

  input[type="search"] {
    padding: 8px 12px;
    border: 1px solid transparent;
  }

  input[type="search"]:focus {
    border-bottom-color: var(--theme-color);
  }
</style> -->
