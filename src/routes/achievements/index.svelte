<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  export const load: Load = async ({ page }) => {
    return {
      props: {
        queryCategory: parseInt(page.query.get("category")) || 0,
      },
    };
  };
</script>

<script lang="ts">
  import CategoryList from "./_lib/category.json";
  import AchievementList from "./_lib/achievement.json";

  import CategoryCard from "./_components/CategoryCard.svelte";
  import AchievementCard from "./_components/AchievementCard.svelte";
  import Banner from "./_components/Banner.svelte";

  import type { Achievement } from "$lib/types";
  import { useState } from "./_lib/store";

  const AchievementGroupList: { [id: string]: Achievement[] } = ((list) => {
    return list.reduce((group, achievement) => {
      let { category } = achievement;

      if (!group[category]) group[category] = [];

      group[category].push(achievement);
      return group;
    }, {});
  })(AchievementList);

  const handleFilter = (list: Achievement[], text: string) => {
    return list.filter((achievement) => achievement.name.toLowerCase().includes(text.toLowerCase()));
  };

  export let queryCategory: number;
</script>

<svelte:head>
  <title>Achievement Tracker</title>
</svelte:head>

<nav>
  <div class="container navbar">
    <span>Achievement Tracker</span>
    <span>{AchievementList.length}</span>
  </div>
</nav>
<div class="container panel" class:unfold={queryCategory !== 0}>
  <aside>
    {#each CategoryList as category}
      <CategoryCard {category} />
    {/each}
  </aside>

  {#if queryCategory !== 0}
    <section>
      <Banner name={CategoryList.find((arr) => arr.id === queryCategory).name} />

      {#each handleFilter(AchievementGroupList[queryCategory], $useState.filterText) as achievement}
        <AchievementCard {achievement} />
      {/each}
    </section>
  {/if}
</div>

<style>
  .navbar {
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .panel {
    height: calc(100vh - 48px);
  }

  .unfold aside {
    display: none;
  }

  .panel:not(.unfold) section {
    display: none;
  }

  @media (min-width: 768px) {
    .unfold {
      display: grid;
      grid-template-columns: 300px auto;
    }

    .unfold aside {
      display: block;
    }

    .panel:not(.unfold) aside {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 992px) {
    .unfold {
      grid-template-columns: 360px auto;
    }

    .panel:not(.unfold) aside {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1200px) {
    .unfold {
      grid-template-columns: 420px auto;
    }
  }

  aside,
  section {
    height: 100%;
    overflow-y: scroll;
  }
</style>
