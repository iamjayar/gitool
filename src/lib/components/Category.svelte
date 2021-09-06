<script lang="ts">
  import ProgressBar from "./ProgressBar.svelte";

  export let category: CategoryTypes;
  export let active: boolean;
  export let completed: number;
  export let total: number;
</script>

<div
  class={active
    ? "relative w-full px-4 py-2 bg-white hover:bg-gray-200"
    : "relative w-32 h-44 m-1 px-3 bg-white hover:bg-gray-200 flex flex-col justify-center items-center border border-gray-300 rounded-md shadow-sm"}
>
  <a
    class="font-bold text-center cursor-pointer before:absolute before:inset-0"
    href={`/achievements?category=${category.id}`}
  >
    {category.name}
  </a>
  <div class={active ? "flex flex-row justify-between" : "flex flex-col"}>
    <span class="text-center">[{completed} / {total}]</span>
    <span class="text-center">{Math.floor((completed / total) * 100)}%</span>
  </div>
  <ProgressBar value={completed / total} />
</div>
