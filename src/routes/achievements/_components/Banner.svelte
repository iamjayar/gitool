<script lang="ts">
  import ButtonHideToggler from "./ButtonHideToggler.svelte";
  import ButtonSettings from "./ButtonSettings.svelte";
  import SearchFilter from "./SearchFilter.svelte";

  export let name: string;
</script>

<div class="banner">
  <h3>{name}</h3>
  <SearchFilter />
  <div class="controls">
    <ButtonHideToggler />
    <ButtonSettings />
  </div>
</div>

<style>
  .banner {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    padding: 8px 32px;
    background-color: hsl(0, 0%, 20%);
    display: grid;
    grid-template-columns: auto min-content;
    z-index: 10;
  }

  h3 {
    grid-column: 1 / span 2;
  }

  .controls {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
