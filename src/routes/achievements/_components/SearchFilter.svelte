<script lang="ts">
  import { useState } from "../_lib/store";

  let inputText = "";

  $: useState.setFilterText(inputText);
</script>

<input type="text" bind:value={inputText} placeholder="Search achievement" />

<style>
  input {
    padding: 6px 12px;
    width: 100%;
    font-size: 12px;
  }

  input:focus {
    border-bottom-color: hsl(17, 100%, 74%);
  }
</style>
