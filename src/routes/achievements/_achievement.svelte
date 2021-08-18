<script lang="ts">
  import iconPrimogem from "$assets/primogem.png";
  import { completed } from "./_lib/store";
  import type { Achievement } from "$lib/types";

  export let achievement: Achievement;
  export let category: number;

  const getStoredValue = (collection: {}): number => (collection ? collection[achievement.id] || 0 : 0);
  const handleChange = (event: Event, value: number) => {
    let isChecked = (<HTMLInputElement>event.target).checked;
    completed.update(category, achievement.id, isChecked ? value + 1 : value);
  };
</script>

<div class="card">
  <h3>{achievement.name}</h3>
  {#if achievement.variant}
    {#each achievement.variant as variant, index}
      <div class="item">
        <div class="flex-justified">{achievement.description.replace(/%var%/g, variant.toString())}</div>
        <div class="flex-center">
          <img src={iconPrimogem} width="24" height="24" alt="primo" />
          <div>{achievement.reward[index]}</div>
        </div>
        <div class="flex-center">
          <input
            type="checkbox"
            on:change={(event) => handleChange(event, index)}
            checked={getStoredValue($completed[category]) > index}
            disabled={getStoredValue($completed[category]) < index}
          />
        </div>
      </div>
    {/each}
  {:else}
    <div class="item">
      <div class="flex-justified">{achievement.description}</div>
      <div class="flex-center">
        <img src={iconPrimogem} width="24" height="24" alt="primo" />
        <div>{achievement.reward}</div>
      </div>
      <div class="flex-center">
        <input
          type="checkbox"
          on:change={(event) => handleChange(event, 0)}
          checked={getStoredValue($completed[category]) > 0}
        />
      </div>
    </div>
  {/if}
</div>

<style>
  .card {
    margin: 8px 16px;
    padding: 16px 16px;
    background-color: hsla(0, 0%, 0%, 0.2);
  }

  .card:hover {
    background-color: hsla(0, 0%, 0%, 0.1);
  }

  h3 {
    color: hsl(17, 100%, 74%);
    margin: 0;
    padding-bottom: 8px;
    border-bottom: 1px solid hsl(0, 0%, 20%);
  }

  .item {
    padding: 8px 0;
    display: grid;
    grid-template-columns: auto 36px 36px;
  }

  .flex-center {
    flex-direction: column;
  }

  input[type="checkbox"] {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
</style>
