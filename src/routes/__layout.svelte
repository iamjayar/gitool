<script lang="ts">
  import Navbar from "$lib/components/Navbar.svelte";
  import Sidenav from "$lib/components/Sidenav.svelte";
  import "../app.postcss";
</script>

<Navbar />
<main class="container mx-auto px-4 flex flex-col md:grid grid-cols-layout-1">
  <aside class="hidden md:block">
    <Sidenav />
  </aside>
  <div>
    <slot />
  </div>
</main>
