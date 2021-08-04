<script lang="ts">
  import { currentUser, signOut } from "$lib/auth";
</script>

<div class="center">
  <h1>GI TOOL</h1>
  {#if $currentUser}
    <p>{$currentUser.email}</p>
    <button on:click={async () => await signOut()}>Sign out</button>
  {:else}
    <a href="/auth">Sign in</a>
  {/if}
  <div style="margin-top:32px">
    <a href="/achievements">Achievements Tracker</a>
  </div>
</div>

<style>
  .center {
    height: 100vh;
    flex-direction: column;
  }
</style>
