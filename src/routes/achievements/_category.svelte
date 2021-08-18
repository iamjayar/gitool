<script lang="ts">
  import type { Category } from "$lib/types";
  export let category: Category;
  export let count = 0;
  export let total = 0;
</script>

<div class="card">
  <a class="btn" href={`/achievements?category=${category.id}`}>{category.name}</a>
  <div>{Math.floor((count / total) * 100)}% [{count} / {total}]</div>
</div>

<style>
  .card {
    padding: 16px 32px;
    position: relative;
    user-select: none;
  }

  .card:hover {
    background-color: hsla(0, 0%, 0%, 0.2);
  }

  a::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    cursor: pointer;
  }
</style>
