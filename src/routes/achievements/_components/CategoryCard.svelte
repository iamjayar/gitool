<script lang="ts">
  import type { Category } from "$lib/types";

  export let category: Category;
</script>

<div class="card">
  <a href={`/achievements?category=${category.id}`}>{category.name}</a>
</div>

<style>
  .card {
    margin: 8px 0;
    padding: 16px 32px;
    position: relative;
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
  }
</style>
