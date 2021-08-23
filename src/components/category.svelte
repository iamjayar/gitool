<script lang="ts">
  export let category: CategoryTypes;
  export let grid: boolean;
  export let completed: number;
  export let total: number;
</script>

<div class="card" class:grid>
  <a class="btn" href={`/achievements?category=${category.id}`}>{category.name}</a>
  <span>{Math.floor((completed / total) * 100)}%</span>
  <span>[{completed} / {total}]</span>
</div>

<style>
  .card {
    position: relative;
  }

  .card:hover {
    background-color: hsla(0, 0%, 0%, 0.1);
  }

  .card.grid {
    width: min(100%, 140px);
    height: 180px;
    margin: 8px 8px;
    padding: 8px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .card:not(.grid) {
    width: 100%;
    padding: 16px 16px;
    display: flex;
    flex-wrap: wrap;
  }

  .grid a {
    text-align: center;
  }

  .card:not(.grid) a {
    width: 100%;
  }

  .card:not(.grid) > span:first-of-type {
    margin-right: 8px;
  }

  a {
    margin-bottom: 16px;
    color: var(--theme-color);
    cursor: pointer;
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
