<script lang="ts">
  import { completed } from "$lib/achievements/store";

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
  {#if $currentUser}
    <div class="profile">
      <h2>{$currentUser.email}</h2>
      <button class="btn-primary" disabled={isLoading} on:click={handleSignOut}>
        {#if isLoading}
          <div class="spinner" />
        {/if}
        Sign out
      </button>
    </div>
  {:else}
    <a href="/signin">Sign in</a>
  {/if}

  <div class="card">
    <a href="/achievements">Achievements</a>
    <div>Progress</div>
  </div>
</div>

<style>
  .container {
    width: min(100%, 960px);
    margin: 0 auto;
    padding: 16px 16px;
  }

  .profile {
    padding: 16px 16px;
    background-color: hsl(0, 0%, 12%);
    border: 1px solid hsla(0, 0%, 0%, 0.14);
    border-radius: 4px;
  }
</style>
