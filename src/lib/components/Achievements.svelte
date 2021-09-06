<script lang="ts">
  import iconPrimogem from "$lib/assets/primogem.png";
  import { completed } from "$lib/achievements/store";

  export let achievement: AchievementTypes;
  export let category: number;

  const getStoredValue = (store: CollectionNumberTypes) => (store ? store[achievement.id] || 0 : 0);
  const handleChange = (event: Event, value: number) => {
    let isChecked = (<HTMLInputElement>event.target).checked;
    completed.update(category, achievement.id, isChecked ? value + 1 : value);
  };
</script>

<div class="mb-2 p-4 flex flex-col border border-gray-300 rounded shadow">
  <h3 class="font-bold text-lg">{achievement.name}</h3>
  {#if achievement.variant}
    {#each achievement.variant as variant, index}
      <div class="grid grid-cols-item">
        <div class="flex items-center">{achievement.description.replace(/%var%/g, variant.toString())}</div>
        <div class="flex flex-col justify-center items-center">
          <img src={iconPrimogem} width="24" height="24" alt="primo" />
          <p class="text-sm">{achievement.reward[index]}</p>
        </div>
        <div class="flex justify-center items-center">
          <input
            class="w-5 h-5 cursor-pointer"
            type="checkbox"
            checked={getStoredValue($completed[category]) > index}
            disabled={getStoredValue($completed[category]) < index}
            on:change={(event) => handleChange(event, index)}
          />
        </div>
      </div>
    {/each}
  {:else}
    <div class="grid grid-cols-item">
      <div class="flex">{achievement.description}</div>
      <div class="flex flex-col justify-center items-center">
        <img src={iconPrimogem} width="24" height="24" alt="primo" />
        <div class="text-sm">{achievement.reward}</div>
      </div>
      <div class="flex justify-center items-center">
        <input
          class="w-5 h-5 cursor-pointer"
          type="checkbox"
          checked={getStoredValue($completed[category]) > 0}
          on:change={(event) => handleChange(event, 0)}
        />
      </div>
    </div>
  {/if}
</div>
