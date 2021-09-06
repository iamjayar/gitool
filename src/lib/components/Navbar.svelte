<script lang="ts">
  import { fly } from "svelte/transition";
  import Sidenav from "./Sidenav.svelte";

  let openNav = false;

  const handleClose = (event: Event) => {
    let target = event.target as Element;
    if (!target.matches("#sidenav")) {
      openNav = false;
    }
  };
</script>

<header class="sticky top-0 bg-white z-10">
  <div class="container h-14 mx-auto p-4 flex flex-row items-center justify-between">
    <a class="font-bold uppercase hover:text-sky-600" href="/">Genshin Impact Tools</a>
    <button
      class="w-8 h-8 flex md:hidden items-center justify-center hover:text-sky-600 hover:scale-125 transition-transform"
      on:click={() => (openNav = true)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
</header>

{#if openNav}
  <nav class="fixed inset-0 bg-gray-800 bg-opacity-60 z-20" role="navigation" on:click={handleClose}>
    <div class="w-full max-w-sm h-screen p-4 bg-white shadow" id="sidenav" transition:fly={{ x: -300, duration: 200 }}>
      <div class="mb-8 flex justify-end">
        <button class="hover:text-sky-600 hover:scale-125 transition-transform" on:click={() => (openNav = false)}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <Sidenav />
    </div>
  </nav>
{/if}
