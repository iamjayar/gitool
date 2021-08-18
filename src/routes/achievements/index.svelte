<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  export const load: Load = async ({ page }) => ({
    props: { categoryQuery: parseInt(page.query.get("category")) || 0 },
  });
</script>

<script lang="ts">
  import { reduce } from "lodash";

  import categories from "./_lib/categories.json";
  import category1 from "./_lib/1.json";
  import category2 from "./_lib/2.json";
  import category3 from "./_lib/3.json";
  import category4 from "./_lib/4.json";
  import category5 from "./_lib/5.json";
  import category6 from "./_lib/6.json";
  import category7 from "./_lib/7.json";
  import category8 from "./_lib/8.json";
  import category9 from "./_lib/9.json";
  import category10 from "./_lib/10.json";
  import category11 from "./_lib/11.json";
  import category12 from "./_lib/12.json";
  import category13 from "./_lib/13.json";
  import category14 from "./_lib/14.json";
  import category15 from "./_lib/15.json";
  import category16 from "./_lib/16.json";
  import category17 from "./_lib/17.json";
  import category18 from "./_lib/18.json";
  import category19 from "./_lib/19.json";

  import CategoryCard from "./_category.svelte";
  import AchievementCard from "./_achievement.svelte";
  import type { Achievement } from "$lib/types";
  import { completed } from "./_lib/store";

  let achievements: { [key: string]: Achievement[] } = {
    category1,
    category2,
    category3,
    category4,
    category5,
    category6,
    category7,
    category8,
    category9,
    category10,
    category11,
    category12,
    category13,
    category14,
    category15,
    category16,
    category17,
    category18,
    category19,
  };

  export let categoryQuery: number;

  let filterText = "";
  let filteredList: Achievement[] = [];
  $: filteredList = (achievements[`category${categoryQuery}`] || []).filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const counterPerCategory = (collection) => {
    return reduce(collection, (res, val) => res + val, 0);
  };

  const totalPerCategory = (id: number) => {
    return (achievements[`category${id}`] || []).reduce((res, val) => {
      return val.variant === null ? res + 1 : res + val.variant.length;
    }, 0);
  };
</script>

<svelte:head>
  <title>Achievement</title>
</svelte:head>

<div class="container" class:open={categoryQuery !== 0}>
  <aside>
    {#each categories as category}
      <CategoryCard
        {category}
        count={counterPerCategory($completed[category.id])}
        total={totalPerCategory(category.id)}
      />
    {/each}
  </aside>

  {#if categoryQuery}
    <section>
      <div class="banner">
        <h2>{categories.find((category) => category.id === categoryQuery).name}</h2>
        <input bind:value={filterText} type="search" placeholder="Filter achievements" />
      </div>

      {#each filteredList as achievement}
        <AchievementCard category={categoryQuery} {achievement} />
      {/each}
    </section>
  {/if}
</div>

<style>
  .container {
    width: min(100%, 960px);
    margin: 0 auto;
  }

  .open {
    display: grid;
    grid-template-columns: min(40%, 320px) auto;
  }

  aside,
  section {
    height: 100vh;
    overflow-y: scroll;
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
    font-family: var(--font-cursive);
    color: var(--theme-color);
    grid-column: 1 / span 2;
  }

  input[type="search"] {
    padding: 8px 12px;
    border: 1px solid transparent;
  }

  input[type="search"]:focus {
    border-bottom-color: var(--theme-color);
  }
</style>
