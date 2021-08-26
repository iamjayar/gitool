<script lang="ts">
  import { currentUser, supabase } from "$lib/auth";
  import Login from "$lib/components/Login.svelte";

  let isLoading = false;

  const handleSignOut = async () => {
    if (isLoading) return;

    isLoading = true;
    let { error } = await supabase.auth.signOut();

    isLoading = false;
    if (error) return;

    currentUser.set(null);
  };
</script>

<svelte:head>
  <title>Genshin Impact Tool</title>
</svelte:head>

<div class="max-w-3xl mx-auto p-3">
  {#if $currentUser}
    <div class="mb-6 p-5 bg-white border border-gray-300 rounded-md shadow-md">
      <div class="flex">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clip-rule="evenodd"
          />
        </svg>
        <h2 class="rounded-md align-middle text-3xl">{$currentUser.email}</h2>
      </div>
      <button
        class="px-2 py-1 border border-red-300 rounded-md shadow-sm hover:bg-red-300 hover:border-red-300"
        disabled={isLoading}
        on:click={handleSignOut}
      >
        {#if isLoading}
          <div class="spinner mr-1" />
        {/if}
        Sign out
      </button>
    </div>
  {:else}
    <Login />
  {/if}
</div>
