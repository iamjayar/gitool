<script lang="ts">
  export let category: CategoryTypes;
  export let grid: boolean;
  export let completed: number;
  export let total: number;
</script>

<div
  class="w-32 h-44 m-2 px-3 bg-white flex justify-center items-center flex-col border border-gray-300 rounded-md shadow-sm"
>
  <a class="text-sm font-bold text-center stretched-link" href={`/achievements?category=${category.id}`}
    >{category.name}</a
  >
  <span>{Math.floor((completed / total) * 100)}%</span>
  <span>[{completed} / {total}]</span>
</div>
