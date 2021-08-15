<script lang="ts">
  import { currentUser, supabase } from "$lib/auth";

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

<div class="container">
  <p>{$currentUser?.email}</p>
  <button on:click={handleSignOut} disabled={isLoading}>
    {#if isLoading}
      <div class="spinner" />
    {/if}
    Sign out</button
  >
</div>

<style>
  .container {
    width: min(100%, 960px);
    margin: 0 auto;
    padding-top: 32px;
  }
</style>
