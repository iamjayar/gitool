<script lang="ts">
  import iconPrimogem from "../_lib/primogem.png";
  import { completed, useState } from "../_lib/store";
  import type { Achievement } from "$lib/types";

  export let achievement: Achievement;
</script>

<div
  class="card"
  class:completed={$completed.includes(achievement.id)}
  class:hidden={$completed.includes(achievement.id) && $useState.isHideComplete}
  on:click={() => completed.update(achievement.id)}
>
  <div>
    <h4>{achievement.name}</h4>
    <p>{achievement.description}</p>
  </div>
  <div class="center">
    <img src={iconPrimogem} alt="primogem" />
    <span>{achievement.reward}</span>
  </div>
</div>

<style>
  .card {
    padding: 16px 32px;
    display: grid;
    grid-template-columns: auto 42px;
    cursor: pointer;
    user-select: none;
  }

  .card:hover {
    background-color: hsla(0, 0%, 0%, 0.1);
  }

  .completed {
    opacity: 0.3;
  }

  .hidden {
    display: none;
  }

  h4 {
    margin: 0;
    margin-bottom: 12px;
    color: hsl(17, 100%, 74%);
  }

  p {
    margin: 0;
    font-size: 12px;
  }

  .center {
    flex-direction: column;
  }

  img {
    width: 24px;
    height: 24px;
  }
</style>
