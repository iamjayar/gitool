<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import "../app.postcss";
</script>

<main class="h-screen bg-gray-100 text-gray-700 flex flex-col">
  <Navbar />
  <div class="h-auto overflow-y-scroll">
    <slot />
  </div>
</main>
