<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";

  export const load: Load = async ({ fetch, page }) => {
    const categories = await fetch(`/achievements/categories.json`);
    const achievements = await fetch(`/achievements/${page.params.id}.json`);

    if (categories.ok && achievements.ok) {
      return {
        props: {
          id: page.params.id,
          categories: await categories.json(),
          achievements: await achievements.json(),
        },
      };
    }
  };
</script>

<script lang="ts">
  import { store } from "./_lib/store";
  import iconPrimogem from "$lib/assets/primogem.png";
  import ProgressBar from "$lib/components/ProgressBar.svelte";

  export let id: string;
  export let categories: CategoryTypes[];
  export let achievements: AchievementTypes[];

  let { data, counter } = store;

  const handleChange = (event: Event, index: number, category: number, id: number) => {
    let isChecked = (<HTMLInputElement>event.target).checked;
    store.update(category, id, isChecked ? index + 1 : index);
  };
</script>

<svelte:head>
  <title>{categories.find((category) => category.id === parseInt(id)).name}</title>
</svelte:head>

<div class="md:grid grid-cols-layout-2">
  <div class="hidden md:block">
    {#each categories as category}
      <div class="relative p-4 hover:bg-gray-100">
        <a class="before:absolute before:inset-0" href={`/achievements/${category.id}`}>{category.name}</a>
        <div class="flex justify-between">
          <p>[{$counter[category.id] || 0} / {category.count}]</p>
          <p>{Math.floor((($counter[category.id] || 0) / category.count) * 100)}%</p>
        </div>
        <ProgressBar value={($counter[category.id] || 0) / category.count} />
      </div>
    {/each}
  </div>

  <div class="flex flex-col p-4">
    {#each achievements as achievement}
      <div class="p-4 flex flex-col border border-gray-300 rounded shadow-sm">
        <h3 class="font-bold">{achievement.name}</h3>
        <div class="grid grid-cols-layout-3">
          {#each achievement.variant || [null] as variant, index}
            <div class="flex items-center">
              {achievement.description.replace(/%var%/g, variant?.toString())}
            </div>
            <div class="flex justify-end items-center">
              <p class="text-xs">
                {typeof achievement.reward === "number" ? achievement.reward : achievement.reward[index]}
              </p>
              <img src={iconPrimogem} width="24" height="24" alt="primo" />
            </div>
            <div class="flex justify-center items-center">
              <input
                class="cursor-pointer"
                type="checkbox"
                checked={($data[id] ? $data[id][achievement.id] || 0 : 0) > index}
                disabled={($data[id] ? $data[id][achievement.id] || 0 : 0) < index}
                on:change={(event) => handleChange(event, index, parseInt(id), achievement.id)}
              />
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
